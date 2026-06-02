import { Routes } from '@angular/router';
import { FormBuilderComponent } from './features/form-builder/form-builder.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form/:id', component: FormBuilderComponent },
  { path: '**', redirectTo: '' }
];
