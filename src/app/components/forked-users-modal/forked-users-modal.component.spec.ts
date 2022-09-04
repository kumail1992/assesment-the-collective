import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkedUsersModalComponent } from './forked-users-modal.component';

describe('ForkedUsersModalComponent', () => {
  let component: ForkedUsersModalComponent;
  let fixture: ComponentFixture<ForkedUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForkedUsersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkedUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
