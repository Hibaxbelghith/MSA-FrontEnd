import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatisticsPageComponent } from './product-statistics-page.component';

describe('ProductStatisticsComponent', () => {
  let component: ProductStatisticsPageComponent;
  let fixture: ComponentFixture<ProductStatisticsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductStatisticsPageComponent]
    });
    fixture = TestBed.createComponent(ProductStatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
