import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POsComponent } from './POs.component';

describe('POsComponent', () => {
  let component: POsComponent;
  let fixture: ComponentFixture<POsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [POsComponent]
    });
    fixture = TestBed.createComponent(POsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
