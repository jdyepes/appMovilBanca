import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMovilPage } from './pago-movil.page';

describe('PagoMovilPage', () => {
  let component: PagoMovilPage;
  let fixture: ComponentFixture<PagoMovilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMovilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
