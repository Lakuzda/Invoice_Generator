import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoAndSummaryComponent } from './info-and-summary.component';
import { CompanyService } from 'src/app/services/company.service';
import { InvoiceService } from 'src/app/services/invoice-service.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

describe('InfoAndSummaryComponent', () => {
  let component: InfoAndSummaryComponent;
  let fixture: ComponentFixture<InfoAndSummaryComponent>;
  let mockInvoiceService: any;
  let mockCompanyService: any;

  beforeEach(async () => {
    mockInvoiceService = {
      getItems: jasmine.createSpy('getItems').and.returnValue([
        { name: 'Item 1', count: 2, price: 10 },
        { name: 'Item 2', count: 1, price: 15 },
      ]),
    };

    mockCompanyService = {
      getCompanyInfo: jasmine.createSpy('getCompanyInfo').and.returnValue(
        of({
          name: 'KLG test task',
          address: 'Poland',
          phones: ['123 456 789', '789-456-123'],
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [InfoAndSummaryComponent],
      providers: [
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: CompanyService, useValue: mockCompanyService },
      ],
      imports: [HttpClientTestingModule, MatCardModule, MatListModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAndSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items from InvoiceService', () => {
    expect(component.items.length).toBe(2);
    expect(component.items[0].name).toBe('Item 1');
    expect(component.items[1].name).toBe('Item 2');
  });

  it('should load company info from CompanyService', () => {
    expect(mockCompanyService.getCompanyInfo).toHaveBeenCalled();
    expect(component.companyInfo.name).toBe('KLG test task');
    expect(component.companyInfo.address).toBe('Poland');
    expect(component.companyInfo.phones).toEqual([
      '123 456 789',
      '789-456-123',
    ]);
  });

  it('should calculate total price correctly', () => {
    component.calculateTotal();
    expect(component.total).toBe(35); // (2 * 10) + (1 * 15) = 35
  });

  it('should calculate total during ngOnInit', () => {
    expect(component.total).toBe(35);
  });

  it('should display company info when available', () => {
    const companyCard = fixture.debugElement.query(
      By.css('.company-info-card')
    );
    expect(companyCard).toBeTruthy();

    const nameElement = companyCard.query(
      By.css('mat-card-title')
    ).nativeElement;
    const addressElement = companyCard.query(By.css('p')).nativeElement;

    expect(nameElement.textContent).toContain('KLG test task');
    expect(addressElement.textContent).toContain('Poland');
  });

  it('should display a list of items when available', () => {
    const itemsList = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(itemsList.length).toBe(2);

    expect(itemsList[0].nativeElement.textContent).toContain('Item 1');
    expect(itemsList[1].nativeElement.textContent).toContain('Item 2');
  });

  it('should display "No items" when there are no items', () => {
    component.items = [];
    fixture.detectChanges();

    const noItemsMessage = fixture.debugElement.query(
      By.css('#no-items')
    ).nativeElement;
    expect(noItemsMessage.textContent).toContain('No items');
  });

  it('should display total correctly', () => {
    const totalElement = fixture.debugElement.query(
      By.css('#total')
    ).nativeElement;
    expect(totalElement.textContent).toContain('Total: 35'); // Suma to (2 * 10) + (1 * 15) = 35
  });
});
