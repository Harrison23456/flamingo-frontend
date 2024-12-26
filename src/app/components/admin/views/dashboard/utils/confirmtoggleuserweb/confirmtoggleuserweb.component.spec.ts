import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmtoggleuserwebComponent } from './confirmtoggleuserweb.component';

describe('ConfirmtoggleuserwebComponent', () => {
  let component: ConfirmtoggleuserwebComponent;
  let fixture: ComponentFixture<ConfirmtoggleuserwebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmtoggleuserwebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmtoggleuserwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
