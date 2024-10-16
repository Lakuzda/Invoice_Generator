import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  // BehaviorSubject do przechowywania pozycji towarów
  private itemsSource = new BehaviorSubject<any[]>([]);

  constructor() {}

  // Funkcja do aktualizacji listy pozycji towarów
  updateItems(items: any[]) {
    this.itemsSource.next(items);
  }

  // Funkcja do pobrania bieżącej listy towarów
  getItems() {
    return this.itemsSource.getValue();
  }
}
