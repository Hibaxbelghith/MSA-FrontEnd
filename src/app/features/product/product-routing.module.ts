import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products/products-page.component';

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductStatisticsComponent } from './components/product-statistics/product-statistics.component';

const routes: Routes = [
  { path: '', component: ProductsPageComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'statistics', component: ProductStatisticsComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }