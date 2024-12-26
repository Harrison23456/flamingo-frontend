import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserwebService } from '../../../../../services/dashboard/userweb.service';
import { CrearSalaComponent } from '../crear-sala/crear-sala.component';
import { ConfirmtoggleuserwebComponent } from '../../../../admin/views/dashboard/utils/confirmtoggleuserweb/confirmtoggleuserweb.component';
import { ConfirmdialogdeletesalaComponent } from '../../../../admin/views/dashboard/utils/confirmdialogdeletesala/confirmdialogdeletesala.component';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrl: './lista-salas.component.css'
})
export class ListaSalasComponent {
  @Input() hasAccess!: boolean;
  displayedColumns: string[] = ['id', 'name', 'address', 'actions'];
  dataSource = new MatTableDataSource<any>();
  estado: any;
  diasRestantes: number = 0; // Número de días restantes
  remainingDate: any; // Móviles restantes
  diasrestantesdos: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private companyService: UserwebService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCompanies();
    this.calculateRemainingDays();
    this.initializeRemainingMobilesFromToken();
  }

  getCompanies(): void {
    this.companyService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;  // Vincular el paginator con el dataSource
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CrearSalaComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => this.getCompanies());
  }

  calculateRemainingDays(): void {
    this.companyService.getAll().subscribe(data => {
      const fechaFin = new Date(this.diasrestantesdos); // Obtenemos la fechaFin
      const fechaActual = new Date(); // Fecha actual
      const diferenciaTiempo = fechaFin.getTime() - fechaActual.getTime(); // Diferencia en milisegundos
      this.diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertimos a días y redondeamos
    });
  }
  openEditDialog(sala: any): void {
    const dialogRef = this.dialog.open(CrearSalaComponent, {
      width: '400px',
      data: sala,
    });
    dialogRef.afterClosed().subscribe(() => this.getCompanies());
  }

  initializeRemainingMobilesFromToken(): void {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          this.remainingDate = decodedToken.user.company?.licencia || 0;
          this.diasrestantesdos = decodedToken.user.company?.fechaFin;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.remainingDate = 0; // Predeterminado en caso de error
        }
      } else {
        console.warn('No se encontró un token en el almacenamiento local.');
        this.remainingDate = 0; // Predeterminado si no hay token
      }
  }

  openToggleConfirmDialog(sala: any): void {
      const originalStatus = sala.status;  // Guardamos el estado original de la empresa

    const dialogRef = this.dialog.open(ConfirmtoggleuserwebComponent, {
      data: {
        message: sala.status ? '¿Estás seguro de desactivar esta empresa?' : '¿Estás seguro de activar esta empresa?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toggleStatus(sala); // Si el usuario confirma, cambiar el estado
      } else {
        // Si se cancela, no hacer nada
        sala.status = !sala.status; // revertir el estado en la interfaz si se cancela
      }
    });
  }

  // Método para cambiar el estado de la empresa
  toggleStatus(sala: any): void {
    sala.status = !sala.status; // Cambiar el estado local
    this.companyService.update(sala._id, sala).subscribe(
      () => {
        this.getCompanies(); // Recargar las empresas después de la actualización
      },
      (error) => {
        console.error('Error al cambiar el estado de la empresa', error);
        // Si ocurre un error, revertir el cambio de estado
        sala.status = !sala.status;
      }
    );
  }

  deleteSala(id: string): void {
    const dialogRef = this.dialog.open(ConfirmdialogdeletesalaComponent, {
      width: '350px',
      data: { message: '¿Estás seguro de que deseas eliminar esta sala?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el usuario confirma, se elimina la sala
        this.companyService.delete(id).subscribe(() => this.getCompanies());
      }
    });
  }
  onPaginateChange(event: any): void {
    // Aquí puedes manejar eventos adicionales de paginación si es necesario
    console.log(event);
  }

  isDisabled(sala: any): boolean {
    return !sala.status;  // Devuelve true si la empresa está desactivada
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
