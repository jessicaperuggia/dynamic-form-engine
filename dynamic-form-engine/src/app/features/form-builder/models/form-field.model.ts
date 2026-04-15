export type FieldType = 'text' | 'select';

export interface FieldValidators {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface DynamicFormField {
  type: FieldType;
  label: string;
  name: string;
  value?: any;
  options?: { label: string; value: any }[];
  validators?: FieldValidators;
  errorMessage?: string;

  visibleWhen?: {
    field: string;
    value: any;
  };
}