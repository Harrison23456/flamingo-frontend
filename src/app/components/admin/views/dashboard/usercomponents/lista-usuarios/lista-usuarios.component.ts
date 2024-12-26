import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from '../../../../../../services/dashboard/empresa.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { UsuariosService } from '../../../../../../services/dashboard/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  @Input() hasAccess!: boolean;

  displayedColumns: string[] = ['name', 'paternalsurname', 'userweb', 'usermobile', 'company', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  empresas: any[] = []; // Lista de empresas

  constructor(
    private userService: UsuariosService,
    private empresaService: EmpresaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getEmpresas();
  }

  // Obtener usuarios
  getUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.dataSource.data = data.map((user) => ({
        ...user,
        company: user.company?.name || 'Sin empresa', // Mostrar nombre de empresa
      }));
      this.dataSource.paginator = this.paginator;
    });
  }

  // Obtener empresas
  getEmpresas(): void {
    this.empresaService.getAll().subscribe((data) => {
      this.empresas = data;
    });
  }

  // Abrir diálogo para crear usuario
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '400px',
      data: { empresas: this.empresas },
    });

    dialogRef.afterClosed().subscribe(() => this.getUsers());
  }

  // Abrir diálogo para editar usuario
  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '400px',
      data: { user, empresas: this.empresas },
    });

    dialogRef.afterClosed().subscribe(() => this.getUsers());
  }

  // Eliminar usuario
  deleteUser(id: string): void {
    this.userService.delete(id).subscribe(() => this.getUsers());
  }

  // Filtro de usuarios
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
