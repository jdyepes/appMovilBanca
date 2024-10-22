import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTarjetaDeCreditoPage } from './consulta-tarjeta-de-credito.page';

describe('ConsultaTarjetaDeCreditoPage', () => {
  let component: ConsultaTarjetaDeCreditoPage;
  let fixture: ComponentFixture<ConsultaTarjetaDeCreditoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTarjetaDeCreditoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTarjetaDeCreditoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
