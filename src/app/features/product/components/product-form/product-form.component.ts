import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductRequest, ProductResponse } from '../../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: ProductResponse | null = null;
  @Output() formSubmit = new EventEmitter<ProductRequest>();
  
  productForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      availableQuantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.isEditMode = true;
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        availableQuantity: this.product.availableQuantity,
        price: this.product.price,
        categoryId: this.product.categoryId
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productRequest: ProductRequest = {
        id: this.product?.id,
        name: formValue.name,
        description: formValue.description,
        availableQuantity: formValue.availableQuantity,
        price: formValue.price,
        categoryId: formValue.categoryId
      };
      this.formSubmit.emit(productRequest);
    }
  }
}