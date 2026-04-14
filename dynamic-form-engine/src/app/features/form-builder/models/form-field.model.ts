export type FieldType = 'text' | 'select';

export interface DynamicFormField {
  type: FieldType;
  label: string;
  name: string;
  value?: any;
  options?: { label: string; value: any }[];

  visibleWhen?: {
    field: string;
    value: any;
  };
}