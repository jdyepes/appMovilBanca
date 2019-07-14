import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMovilMenuPage } from './pago-movil-menu.page';

describe('PagoMovilMenuPage', () => {
  let component: PagoMovilMenuPage;
  let fixture: ComponentFixture<PagoMovilMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMovilMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMovilMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
