import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ListOfArticlesComponent } from './list-of-articles.component';
import { InvoiceService } from 'src/app/services/invoice-service.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ListOfArticlesComponent', () => {
  let component: ListOfArticlesComponent;
  let fixture: ComponentFixture<ListOfArticlesComponent>;
  let mockInvoiceService: any;
  let router: Router;

  beforeEach(waitForAsync(() => {
    mockInvoiceService = jasmine.createSpyObj('InvoiceService', [
      'updateItems',
    ]);

    TestBed.configureTestingModule({
      declarations: [ListOfArticlesComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: InvoiceService, useValue: mockInvoiceService },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfArticlesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form integration tests', () => {
    it('should add new item when addItem is called', () => {
      component.addItem();
      expect(component.items.length).toEqual(2);
    });

    it('should remove an item when removeItem is called', () => {
      component.addItem();
      component.removeItem(1);
      expect(component.items.length).toEqual(1);
    });

    it('should display form error messages for invalid fields when submitted', () => {
      component.addItem();
      component.items.at(0).setValue({
        name: '',
        count: 0,
        price: 0,
      });

      component.items.at(0).get('name')?.markAsTouched();
      component.items.at(0).get('count')?.markAsTouched();
      component.items.at(0).get('price')?.markAsTouched();

      fixture.detectChanges();
      component.submit();

      fixture.detectChanges();

      const errors = fixture.debugElement.queryAll(
        By.css('.mat-mdc-form-field-error')
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should submit the form if all conditions are met', () => {
      component.addItem();
      component.items.at(0).patchValue({
        name: 'Valid Name',
        count: 10,
        price: 100,
      });

      fixture.detectChanges();
      component.submit();

      expect(mockInvoiceService.updateItems).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/summary']);
    });

    it('should display a success message when the form is submitted successfully', () => {
      spyOn(component['snackBar'], 'open');
      component.addItem();
      component.items.at(0).patchValue({
        name: 'Valid Name',
        count: 10,
        price: 100,
      });

      component.submit();
      expect(component['snackBar'].open).toHaveBeenCalledWith(
        'Invoice submitted successfully',
        'Close',
        jasmine.any(Object)
      );
    });

    it('should display an error message if trying to submit an empty form', () => {
      component.items.clear();
      fixture.detectChanges();

      spyOn(component['snackBar'], 'open');

      component.submit();

      expect(component['snackBar'].open).toHaveBeenCalledWith(
        'Please add items',
        'Close',
        jasmine.any(Object)
      );
    });
  });
});
