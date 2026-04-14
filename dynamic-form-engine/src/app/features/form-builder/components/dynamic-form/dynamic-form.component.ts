import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DynamicFormField } from '../../models/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() fields: DynamicFormField[] = [];

  formData: any = {};

  updateValue(name: string, value: any) {
    this.formData[name] = value;
  }

  isVisible(field: DynamicFormField): boolean {
    if (!field.visibleWhen) return true;

    return this.formData[field.visibleWhen.field] === field.visibleWhen.value;
  }
}
