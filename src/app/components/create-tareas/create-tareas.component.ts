import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareasService } from 'src/app/services/tareas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css'],
})
export class CreateTareasComponent implements OnInit {
  createTarea: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _tareaService: TareasService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createTarea = this.fb.group({
      fecha: ['', Validators.required],
      horas: ['', Validators.required],
      tarea: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarTarea() {
    this.submitted = true;

    if (this.createTarea.invalid) {
      return;
    }
    const tarea: any = {
      fecha: this.createTarea.value.fecha,
      horas: this.createTarea.value.horas,
      tarea: this.createTarea.value.tarea,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.loading = true;

    this._tareaService
      .agregarTarea(tarea)
      .then(() => {
        this.toastr.success(
          'La tarea se registro con exito',
          'Tarea Registrada',
          { positionClass: 'toast-bottom-right' }
        );
        this.loading = false;
        this.router.navigate(['/list-tareas']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
}
