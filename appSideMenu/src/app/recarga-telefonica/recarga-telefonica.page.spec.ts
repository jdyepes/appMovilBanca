import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargaTelefonicaPage } from './recarga-telefonica.page';

describe('RecargaTelefonicaPage', () => {
  let component: RecargaTelefonicaPage;
  let fixture: ComponentFixture<RecargaTelefonicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecargaTelefonicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargaTelefonicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
