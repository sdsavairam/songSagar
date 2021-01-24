import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistModelComponent } from './create-playlist-model.component';

describe('CreatePlaylistModelComponent', () => {
  let component: CreatePlaylistModelComponent;
  let fixture: ComponentFixture<CreatePlaylistModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlaylistModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
