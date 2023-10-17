import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateComponent } from './admin-create.component';

describe('CreateComponent', () => {
  let component: AdminCreateComponent;
  let fixture: ComponentFixture<AdminCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateComponent]
    });
    fixture = TestBed.createComponent(AdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should admin-create', () => {
    expect(component).toBeTruthy();
  });
});
