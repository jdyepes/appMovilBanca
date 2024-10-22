import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroDestinoPage } from './numero-destino.page';

describe('NumeroDestinoPage', () => {
  let component: NumeroDestinoPage;
  let fixture: ComponentFixture<NumeroDestinoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumeroDestinoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroDestinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
