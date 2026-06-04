import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilderComponent } from './form-builder.component';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormService } from './services/form.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormBuilderComponent', () => {
  let fixture: ComponentFixture<FormBuilderComponent>;
  let component: FormBuilderComponent;
  let mockFormService: jasmine.SpyObj<FormService>;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getFormConfig']);

    await TestBed.configureTestingModule({
      imports: [FormBuilderComponent],
      providers: [
        { provide: FormService, useValue: mockFormService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 'test' })) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should load config and stop loading on success', () => {
    const fakeConfig = [{ key: 'name', type: 'text' } as any];
    mockFormService.getFormConfig.and.returnValue(of(fakeConfig));

    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.formConfig.length).toBe(1);
    expect(component.error).toBeNull();
  });

  it('should set error and stop loading on service failure', () => {
    mockFormService.getFormConfig.and.returnValue(throwError(() => new Error('boom')));

    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.formConfig.length).toBe(0);
    expect(component.error).toBeTruthy();
  });
});
