import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TareasService } from 'src/app/services/tareas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tareas',
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css'],
})
export class ListTareasComponent implements OnInit {
  tareas: any[] = [];

  constructor(
    private _tareasService: TareasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTareas();
  }

  getTareas() {
    this._tareasService.getTareas().subscribe((data) => {
      this.tareas = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        console.log(element.payload.doc.data());
        this.tareas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.tareas);
    });
  }

  eliminarTarea(id: string) {
    this._tareasService
      .eliminarTarea(id)
      .then(() => {
        this.toastr.error('Tarea Eliminada', 'Tarea Eliminada con exito', {
          positionClass: 'toast-bottom-right',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
