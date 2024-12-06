import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderVisibilityService } from '../../services/header-visibility.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss'
})
export class CheckoutFormComponent {

  selectMethod: string = '';
  isAddressChangeActive = false;
  selectedAddress = 'Prestige Tranquality Tower 16 Flatno-16052, Budigere cross, BENGALURU, KARNATAKA, 560049, India';
 constructor(
  private router: Router,
  private headerVisibilityService: HeaderVisibilityService
 ){}

 addresses = [
  'Prestige Tranquality Tower 16 Flatno-16052, Budigere cross, BENGALURU, KARNATAKA, 560049, India',
  'Shreya’s Secondary Address, Whitefield, BENGALURU, KARNATAKA, 560066, India',
  'Shreya’s Office Address, Koramangala, BENGALURU, KARNATAKA, 560095, India'
];

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

 addNewAddress() {
  console.log("Added new Address")
 }
}
