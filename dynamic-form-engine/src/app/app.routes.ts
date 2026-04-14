import { Routes } from '@angular/router';
import { FormBuilderComponent } from './features/form-builder/form-builder.component';

export const routes: Routes = [
	{ path: 'form-builder', component: FormBuilderComponent },
	{ path: '', redirectTo: 'form-builder', pathMatch: 'full' }
];
