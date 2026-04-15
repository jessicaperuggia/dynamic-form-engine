import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicFormField } from '../../models/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: DynamicFormField[] = [];
  @Output() submitForm = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    const group: Record<string, FormControl> = {};

    this.fields.forEach(field => {
      const validators = [];
      if (field.validators) {
        if (field.validators.required) validators.push(Validators.required);
        if (field.validators.minLength) validators.push(Validators.minLength(field.validators.minLength));
        if (field.validators.maxLength) validators.push(Validators.maxLength(field.validators.maxLength));
        if (field.validators.pattern) validators.push(Validators.pattern(field.validators.pattern));
      }

      group[field.name] = new FormControl(field.value || '', validators);
    });

    this.form = new FormGroup(group);
  }

  isVisible(field: DynamicFormField): boolean {
    if (!field.visibleWhen) return true;

    const value = this.form.get(field.visibleWhen.field)?.value;
    return value === field.visibleWhen.value;
  }

  getControl(name: string) {
    return this.form.get(name);
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}