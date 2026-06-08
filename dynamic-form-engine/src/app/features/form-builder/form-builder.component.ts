import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormField } from './models/form-field.model';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormService } from './services/form.service';
import { Subject, of, Observable } from 'rxjs';
import { switchMap, map, catchError, timeout, shareReplay, startWith } from 'rxjs/operators';
import { FormState } from './models/form-state.model';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  submittedData: Record<string, unknown> | null = null;

  private reload$ = new Subject<void>();

  readonly formState$: Observable<FormState>;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
  ) {
    this.formState$ = this.route.paramMap.pipe(
      map((pm: ParamMap) => pm.get('id')),

      switchMap((id) => {
        if (!id) {
          return of<FormState>({
            config: [],
            loading: false,
            error: 'Form not specified.',
          });
        }

        return this.reload$.pipe(
          startWith(void 0),

          switchMap(() =>
            this.formService.getFormConfig(id).pipe(
              timeout(8000),

              map((config) => ({
                config,
                loading: false,
                error: null,
              })),

              startWith({
                config: [] as DynamicFormField[],
                loading: true,
                error: null,
              }),

              catchError(() =>
                of<FormState>({
                  config: [],
                  loading: false,
                  error: 'Failed to load the form.',
                }),
              ),
            ),
          ),
        );
      }),

      shareReplay(1),
    );
  }

  onSubmit(data: Record<string, unknown>) {
    this.submittedData = data;
  }

  retry() {
    this.reload$.next();
  }
}
