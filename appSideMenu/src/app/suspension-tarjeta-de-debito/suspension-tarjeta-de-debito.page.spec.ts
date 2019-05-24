import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionTarjetaDeDebitoPage } from './suspension-tarjeta-de-debito.page';

describe('SuspensionTarjetaDeDebitoPage', () => {
  let component: SuspensionTarjetaDeDebitoPage;
  let fixture: ComponentFixture<SuspensionTarjetaDeDebitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspensionTarjetaDeDebitoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensionTarjetaDeDebitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
