import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdialogdeletesalaComponent } from './confirmdialogdeletesala.component';

describe('ConfirmdialogdeletesalaComponent', () => {
  let component: ConfirmdialogdeletesalaComponent;
  let fixture: ComponentFixture<ConfirmdialogdeletesalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmdialogdeletesalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmdialogdeletesalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
