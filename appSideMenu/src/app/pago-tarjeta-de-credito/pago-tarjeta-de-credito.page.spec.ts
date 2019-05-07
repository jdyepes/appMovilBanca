import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoTarjetaDeCreditoPage } from './pago-tarjeta-de-credito.page';

describe('PagoTarjetaDeCreditoPage', () => {
  let component: PagoTarjetaDeCreditoPage;
  let fixture: ComponentFixture<PagoTarjetaDeCreditoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoTarjetaDeCreditoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoTarjetaDeCreditoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
