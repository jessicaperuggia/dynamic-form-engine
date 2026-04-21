import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormField } from './models/form-field.model';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements OnInit {
  formConfig: DynamicFormField[] = [];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const formId = this.route.snapshot.paramMap.get('id')!;

    this.formService.getFormConfig(formId).subscribe((config) => {
      this.formConfig = config;
    });
  }

  onSubmit(data: any) {
    console.log('Form data:', data);
  }
}
