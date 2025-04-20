import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductRoutingModule } from './product-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductStatisticsComponent } from './components/product-statistics/product-statistics.component';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductStatisticsComponent,
    ProductsPageComponent,
    

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule
    
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductModule { }