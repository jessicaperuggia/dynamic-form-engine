import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DynamicFormField } from '../features/form-builder/models/form-field.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  getFormConfig(formId: string): Observable<DynamicFormField[]> {
    return this.http.get<DynamicFormField[]>(`/assets/forms/${formId}.json`);
  }
}
