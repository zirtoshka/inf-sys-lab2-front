import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditkaComponent } from './editka.component';

describe('EditkaComponent', () => {
  let component: EditkaComponent;
  let fixture: ComponentFixture<EditkaComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditkaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
