import { Component } from '@angular/core';
import { DynamicFormField } from './models/form-field.model';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form-builder.component.html'
})
export class FormBuilderComponent {
  formConfig: DynamicFormField[] = [
    {
      type: 'select',
      label: 'User Type',
      name: 'userType',
      options: [
        { label: 'Person', value: 'person' },
        { label: 'Company', value: 'company' }
      ]
    }
  ];
}
