import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardViewComponent } from './custom-card-view.component';

describe('CustomCardViewComponent', () => {
  let component: CustomCardViewComponent;
  let fixture: ComponentFixture<CustomCardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardViewComponent]
    });
    fixture = TestBed.createComponent(CustomCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
