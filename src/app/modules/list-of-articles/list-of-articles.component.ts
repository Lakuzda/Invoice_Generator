import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice-service.service';
import { integerValidator } from 'src/app/shared/integer-validator';

@Component({
  selector: 'app-list-of-articles',
  templateUrl: './list-of-articles.component.html',
  styleUrls: ['./list-of-articles.component.scss'],
})
export class ListOfArticlesComponent implements OnInit {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar
  ) {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([this.createItem()]),
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      count: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          integerValidator(),
        ],
      ],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000),
          integerValidator(),
        ],
      ],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  submit(): void {
    if (this.items.length === 0) {
      this.snackBar.open('Please add items', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    } else if (this.items.controls.some((item) => item.valid)) {
      const validItems = this.items.controls
        .filter((item) => item.valid)
        .map((item) => item.value);

      this.snackBar.open('Invoice submitted successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });

      this.invoiceService.updateItems(validItems);
      this.router.navigate(['/summary']);
    } else {
      this.snackBar.open('Form has errors, please check fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }
}
