import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from '../../../../../../services/dashboard/empresa.service';
import { CrearEmpresaComponent } from '../crear-empresa/crear-empresa.component';
import { ConfirmtoggleComponent } from '../../utils/confirmtoggle/confirmtoggle.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrl: './lista-empresas.component.css'
})
export class ListaEmpresasComponent implements OnInit {
  @Input() hasAccess!: boolean;
  displayedColumns: string[] = ['id', 'name', 'ruc', 'address', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  estado: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private companyService: EmpresaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getAll().subscribe((data) => {
      // Desactivar automáticamente las empresas cuya fechaFin haya pasado
      const currentDate = new Date();
  
      // Actualizamos cada empresa con la verificación de la fechaFin
      data.forEach((company: any) => {
        const fechaFin = new Date(company.fechaFin);
        
        // Si la fechaFin es pasada, desactivamos la empresa
        if (fechaFin < currentDate) {
          company.status = false;  // Desactivar la empresa
        }
      });
  
      // Asignar los datos a dataSource
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;  // Vincular el paginator con el dataSource
    });
  }
  

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CrearEmpresaComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => this.getCompanies());
  }

  openEditDialog(company: any): void {
    const dialogRef = this.dialog.open(CrearEmpresaComponent, {
      width: '400px',
      data: company,
    });
    dialogRef.afterClosed().subscribe(() => this.getCompanies());
  }

  openToggleConfirmDialog(company: any): void {
      const originalStatus = company.status;  // Guardamos el estado original de la empresa

    const dialogRef = this.dialog.open(ConfirmtoggleComponent, {
      data: {
        message: company.status ? '¿Estás seguro de desactivar esta empresa?' : '¿Estás seguro de activar esta empresa?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toggleStatus(company); // Si el usuario confirma, cambiar el estado
      } else {
        // Si se cancela, no hacer nada
        company.status = !company.status; // revertir el estado en la interfaz si se cancela
      }
    });
  }

  // Método para cambiar el estado de la empresa
  toggleStatus(company: any): void {
    company.status = !company.status; // Cambiar el estado local
    this.companyService.update(company._id, company).subscribe(
      () => {
        this.getCompanies(); // Recargar las empresas después de la actualización
      },
      (error) => {
        console.error('Error al cambiar el estado de la empresa', error);
        // Si ocurre un error, revertir el cambio de estado
        company.status = !company.status;
      }
    );
  }

  deleteCompany(id: string): void {
    this.companyService.delete(id).subscribe(() => this.getCompanies());
  }
  onPaginateChange(event: any): void {
    // Aquí puedes manejar eventos adicionales de paginación si es necesario
    console.log(event);
  }

  isDisabled(company: any): boolean {
    return !company.status;  // Devuelve true si la empresa está desactivada
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}