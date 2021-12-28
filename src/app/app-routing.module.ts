import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTareasComponent } from './components/list-tareas/list-tareas.component';
import { CreateTareasComponent } from './components/create-tareas/create-tareas.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-tareas', pathMatch: 'full' },
  { path: 'list-tareas', component: ListTareasComponent },
  { path: 'create-tareas', component: CreateTareasComponent },
  { path: '**', redirectTo: 'list-tareas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
