import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceDeEfectivoPage } from './avance-de-efectivo.page';

describe('AvanceDeEfectivoPage', () => {
  let component: AvanceDeEfectivoPage;
  let fixture: ComponentFixture<AvanceDeEfectivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceDeEfectivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceDeEfectivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
