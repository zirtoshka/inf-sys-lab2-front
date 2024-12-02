import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppTableComponent } from './admin-app-table.component';

describe('AdminAppTableComponent', () => {
  let component: AdminAppTableComponent;
  let fixture: ComponentFixture<AdminAppTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
