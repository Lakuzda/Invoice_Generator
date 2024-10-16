import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { InvoiceService } from 'src/app/services/invoice-service.service';

@Component({
  selector: 'app-info-and-summary',
  templateUrl: './info-and-summary.component.html',
  styleUrls: ['./info-and-summary.component.scss'],
})
export class InfoAndSummaryComponent implements OnInit {
  items: any[] = [];
  companyInfo: any;
  total: number = 0;

  constructor(
    private invoiceService: InvoiceService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.items = this.invoiceService.getItems();
    this.calculateTotal();

    this.companyService.getCompanyInfo().subscribe((data) => {
      this.companyInfo = data;
    });
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (sum, item) => sum + item.count * item.price,
      0
    );
  }
}
