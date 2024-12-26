import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmtoggleComponent } from './confirmtoggle.component';

describe('ConfirmtoggleComponent', () => {
  let component: ConfirmtoggleComponent;
  let fixture: ComponentFixture<ConfirmtoggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmtoggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmtoggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
