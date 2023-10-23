import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMenuComponent } from './modal-menu.component';

describe('ModalMenuComponent', () => {
  let component: ModalMenuComponent;
  let fixture: ComponentFixture<ModalMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalMenuComponent]
    });
    fixture = TestBed.createComponent(ModalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
