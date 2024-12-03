import { Routes } from '@angular/router';
import { BodyComponent } from './Mycomponents/body/body.component';
import { ProductdetailComponent } from './Mycomponents/productdetail/productdetail.component';
import { CartComponent } from './Mycomponents/cart/cart.component';

export const routes: Routes = [
    { path: '', component: BodyComponent },
    { path: 'product/:id', component: ProductdetailComponent },
    {path:'cart', component: CartComponent}
];
