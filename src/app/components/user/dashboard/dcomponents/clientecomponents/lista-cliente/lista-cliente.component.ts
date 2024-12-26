import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../../../../../services/dashboard/cliente.service';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css'
})
export class ListaClienteComponent implements OnInit {
  displayedColumns: string[] = ['id', 'imei', 'sala', 'licencia', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalMobiles: number = 0; // Total de móviles desde el backend
  totalMobilesFinal: number = 0;
  remainingMobiles: number = 0; // Móviles restantes
  clientes: any[] = []; // Lista de clientes
  nuevo: any[] = [];
  
  constructor(private userService: ClienteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getClientes();
  
    this.userService.getAll().subscribe(data => {
      if (data.length > 0) {
        this.remainingMobiles = data[0].user.company.mobiles; // Inicializa los móviles restantes si hay datos
      } else {
        this.initializeRemainingMobilesFromToken(); // Inicializa desde el token
      }
    }, error => {
      console.error('Error al obtener los datos:', error);
      this.initializeRemainingMobilesFromToken(); // Maneja errores inicializando desde el token
    });
  }
  

  getClientes(): void {
    this.userService.getAll().subscribe(
      data => {
        this.clientes = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
  
        if (data.length > 0) {
          // Si hay clientes, usa los datos del backend
          this.remainingMobiles = data[0].user.company.mobiles;
        } else {
          console.warn('No se encontraron clientes en la base de datos.');
          this.initializeRemainingMobilesFromToken(); // Inicializa desde el token
        }
      },
      error => {
        console.error('Error al obtener los clientes:', error);
        this.initializeRemainingMobilesFromToken(); // Maneja errores inicializando desde el token
      }
    );
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CrearClienteComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => {
      this.getClientes();
    });
  }

  openEditDialog(cliente: any): void {
    const dialogRef = this.dialog.open(CrearClienteComponent, { width: '400px', data: cliente });
    dialogRef.afterClosed().subscribe(() => {
      this.getClientes();
    });
  }

  deleteCliente(id: string): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.userService.delete(id).subscribe(() => {
        this.getClientes(); // Vuelve a cargar la lista de clientes después de eliminar
      });
    }
  }

  initializeRemainingMobilesFromToken(): void {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.remainingMobiles = decodedToken.user.company?.mobiles || 0;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.remainingMobiles = 0; // Predeterminado en caso de error
      }
    } else {
      console.warn('No se encontró un token en el almacenamiento local.');
      this.remainingMobiles = 0; // Predeterminado si no hay token
    }
  }
  
}
