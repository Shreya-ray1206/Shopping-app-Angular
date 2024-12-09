import { Component,  ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderVisibilityService } from '../../services/header-visibility.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CheckoutFormComponent {

  selectMethod: string = '';
  isAddressChangeActive = false;
  visible : boolean = false;
  newAddress: string = '';
  selectedAddress = 'Prestige Tranquality Tower 16 Flatno-16052, Budigere cross, BENGALURU, KARNATAKA, 560049, India';

  cart: any = {};
  subtotal: number = 0;
  deliveryFee: number = 1;
  arrivingItems: any = []
 constructor(
  private router: Router,
  private headerVisibilityService: HeaderVisibilityService
 ){
  let storedItem = JSON.parse(localStorage.getItem('cart') || '[]');  // Default to an empty array if cart is null or invalid
  this.cart = Array.isArray(storedItem) ? storedItem : Object.values(storedItem);  // Ensure it's an array, whether cart was stored as an object or array
  this.arrivingItems = Array.isArray(this.cart) ? this.cart : Object.values(this.cart);
 }

//  addresses = [
//   'Prestige Tranquality Tower 16 Flatno-16052, Budigere cross, BENGALURU, KARNATAKA, 560049, India',
//   'Shreya’s Secondary Address, Whitefield, BENGALURU, KARNATAKA, 560066, India',
//   'Shreya’s Office Address, Koramangala, BENGALURU, KARNATAKA, 560095, India'
// ];
  addresses = JSON.parse(localStorage.getItem('addresses') || '[]');

  calculateSubtotal() {
    this.subtotal = this.cart.reduce((total:number, item:any) => total + (item.price * item.quantity), 0);
  }
 redirectToCart() {
  this.headerVisibilityService.resetHeaderVisibility();
  this.router.navigate(['/cart']);
 }

 onSelectPaymentMethod(method:string){
  this.selectMethod = method;
 }
 
 //Address change on click of change 
 toggleAddressChange() {
  this.isAddressChangeActive = !this.isAddressChangeActive;
}

 confirmAddressChange() {
  this.isAddressChangeActive = false;
 }

 showDialog() {
  console.log("Dialog opened !!");
  this.visible = true;
 }

 saveNewAddress() {
  if (this.newAddress.trim() === '') {
    alert('Please enter a valid address');
    return;
  }
  
  this.addresses.push(this.newAddress);
  
  localStorage.setItem('addresses', JSON.stringify(this.addresses));
  
  this.newAddress = '';
  this.visible = false;
  
  this.selectedAddress = this.newAddress;
 }
}
