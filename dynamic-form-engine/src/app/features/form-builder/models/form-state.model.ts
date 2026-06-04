import { DynamicFormField } from './form-field.model';

export interface FormState {
  config: DynamicFormField[];
  loading: boolean;
  error: string | null;
}