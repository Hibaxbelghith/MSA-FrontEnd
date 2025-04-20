import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreatePageComponent } from './product-create-page.component';

describe('ProductCreatePageComponent', () => {
  let component: ProductCreatePageComponent;
  let fixture: ComponentFixture<ProductCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCreatePageComponent]
    });
    fixture = TestBed.createComponent(ProductCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
