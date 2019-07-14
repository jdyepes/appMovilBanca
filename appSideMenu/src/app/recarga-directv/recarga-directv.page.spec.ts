import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargaDirectvPage } from './recarga-directv.page';

describe('RecargaDirectvPage', () => {
  let component: RecargaDirectvPage;
  let fixture: ComponentFixture<RecargaDirectvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecargaDirectvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargaDirectvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
