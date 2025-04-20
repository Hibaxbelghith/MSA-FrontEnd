import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetaiPageComponent } from './product-detail-page.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetaiPageComponent;
  let fixture: ComponentFixture<ProductDetaiPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetaiPageComponent]
    });
    fixture = TestBed.createComponent(ProductDetaiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
