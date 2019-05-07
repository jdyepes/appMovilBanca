import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargasPage } from './recargas.page';

describe('RecargasPage', () => {
  let component: RecargasPage;
  let fixture: ComponentFixture<RecargasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecargasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
