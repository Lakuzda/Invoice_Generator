import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private itemsSource = new BehaviorSubject<any[]>([]);

  constructor() {}

  updateItems(items: any[]) {
    this.itemsSource.next(items);
  }

  getItems() {
    return this.itemsSource.getValue();
  }
}
