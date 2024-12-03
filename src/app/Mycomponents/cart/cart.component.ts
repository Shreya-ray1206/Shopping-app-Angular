import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
   cartItems : any = [];
   cart : any={};

   ngOnInit(): void{

    let storedItem = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cart = storedItem;

    console.log('Cart items in localStorage:', JSON.stringify(storedItem));
    this.cartItems = Object.values(this.cart);
    console.log('Cart Items:', JSON.stringify(this.cartItems)); 

    this.calculateTheSubtotal()
   }

   calculateTheSubtotal() {
    let total = this.cartItems.reduce((acc:number, item:any) => acc + (item.price * item.quantity), 0);
    console.log('Calculated subtotal:', total);
    return total;
   }

   calculateTheSavings() : number {
    let savings = this.cartItems.reduce((acc:number, item:any) => acc + (item.price * item.quantity * (item.discountPercentage/100)), 0);
    console.log(`Discount - ${savings}`)
    return savings
   }

   updateCart() :void{
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartItems = Object.values(this.cart);
   }

   incrementQuantity(item:any){
    item.quantity += 1;
    this.updateCart();
   }

   decrementQuantity(item:any){
    if(item.quantity > 1){
      item.quantity -= 1;
    } else{
      delete this.cart[item.id];
    }
    this.updateCart();
   }

   deleteItem(item: any): void {
    delete this.cart[item.id];
    this.updateCart();
   }

   getCartCount(){
    return Object.keys(this.cart).length;
   }

   saveForLater(item:any) :void{
    ///For now just deleted the item 
    console.log('Item saved for later:', item);
    this.deleteItem(item);
   }
}
