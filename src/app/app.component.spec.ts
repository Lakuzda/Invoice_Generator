import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatToolbarModule,
        MatButtonModule,
      ],
      declarations: [AppComponent, RouterLinkDirectiveStub],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a toolbar with title and links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
    const title = toolbar.query(By.css('span')).nativeElement.textContent;
    expect(title).toContain('Invoice Generator');
    const links = toolbar.queryAll(By.css('a'));
    expect(links.length).toEqual(2);
    expect(links[0].nativeElement.textContent).toContain('Articles');
    expect(links[1].nativeElement.textContent).toContain('Info and Summary');
  });

  it('should have correct router links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const links = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    const routerLinks = links.map((de) =>
      de.injector.get(RouterLinkDirectiveStub)
    );

    expect(routerLinks.length).toBe(2);
    expect(routerLinks[0].linkParams).toBe('/list-of-articles');
    expect(routerLinks[1].linkParams).toBe('/summary');
  });
});

import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
