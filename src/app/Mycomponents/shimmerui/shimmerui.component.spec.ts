import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmeruiComponent } from './shimmerui.component';

describe('ShimmeruiComponent', () => {
  let component: ShimmeruiComponent;
  let fixture: ComponentFixture<ShimmeruiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShimmeruiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShimmeruiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
