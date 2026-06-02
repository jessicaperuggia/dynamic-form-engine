import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormField } from './models/form-field.model';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ActivatedRoute } from '@angular/router';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  formConfig: DynamicFormField[] = [];
  submittedData: Record<string, unknown> | null = null;

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

  onSubmit(data: Record<string, unknown>) {
    this.submittedData = data;
  }
}
