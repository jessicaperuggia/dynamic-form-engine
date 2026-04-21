import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { DynamicFormField } from '../../models/form-field.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() fields: DynamicFormField[] = [];
  @Output() submitForm = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  private visibilitySubscriptions: Subscription[] = [];

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] && this.fields.length) {
      this.buildForm();
    }
  }

  isVisible(field: DynamicFormField): boolean {
    return this.evaluateVisibility(field);
  }

  getControl(name: string): FormControl | null {
    return this.form.get(name) as FormControl | null;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.visibilitySubscriptions.forEach(sub => sub.unsubscribe());
  }
  
  private buildForm() {
    // 🔥 limpa antes
    this.visibilitySubscriptions.forEach(sub => sub.unsubscribe());
    this.visibilitySubscriptions = [];

    const group: Record<string, FormControl> = {};

    this.fields.forEach(field => {
      group[field.name] = new FormControl(
        field.value || '',
        this.buildValidators(field)
      );
    });

    this.form = new FormGroup(group);

    this.initializeFieldVisibility();
  }

  private buildValidators(field: DynamicFormField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (!field.validators) return validators;

    if (field.validators.required) validators.push(Validators.required);
    if (field.validators.minLength) validators.push(Validators.minLength(field.validators.minLength));
    if (field.validators.maxLength) validators.push(Validators.maxLength(field.validators.maxLength));
    if (field.validators.pattern) validators.push(Validators.pattern(field.validators.pattern));

    return validators;
  }

  private initializeFieldVisibility() {
    this.fields.forEach(field => {
      if (!field.visibleWhen) return;

      const dependency = this.form.get(field.visibleWhen.field);
      if (!dependency) return;

      const sub = dependency.valueChanges.subscribe(() => this.applyVisibilityState(field));
      this.visibilitySubscriptions.push(sub);

      this.applyVisibilityState(field);
    });
  }

  private applyVisibilityState(field: DynamicFormField) {
    const control = this.form.get(field.name);
    if (!control) return;

    const shouldBeVisible = this.evaluateVisibility(field);

    if (shouldBeVisible) {
      if (control.disabled) {
        control.setValidators(this.buildValidators(field));
        control.enable({ emitEvent: false });
      }
    } else {
      if (control.enabled) {
        control.disable({ emitEvent: false });
        control.setValue(null, { emitEvent: false }); // opcional mas recomendado
      }
    }

    control.updateValueAndValidity({ emitEvent: false });
  }

  private evaluateVisibility(field: DynamicFormField): boolean {
    if (!field.visibleWhen) return true;

    const dependentControl = this.form.get(field.visibleWhen.field);
    return dependentControl?.value === field.visibleWhen.value;
  }
}
