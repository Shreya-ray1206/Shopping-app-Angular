import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';  // Import PrimeNG ChartModule
import { RatingModule } from 'primeng/rating'; 
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { ActivatedRoute } from '@angular/router';
import { ProductService } from "../../services/product.services"; 
import { CommonModule } from '@angular/common';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface  Dimension {
  width: number;
  height: number;
  depth:number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string[];
  dimensions? :Dimension[];
  brand : string;
  thumbnail: string;
  weight?:number
  shippingInformation?: string;
  warrantyInformation?:string;
  reviews? : Review[];
  quantity: number;
}

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [ButtonModule, RatingModule, ChartModule, CommonModule, HttpClientModule], 
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent {
  productId: number | null = null;  
  product: Product | null = null;   
  cart: { [id: number]: Product } = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!;  
      console.log('Product ID:', this.productId);
      
      this.loadProductDetails(this.productId);
      
    });
  }  

  loadProductDetails(productId : number){
    if(this.productId){
      fetch(`https://dummyjson.com/products/${this.productId}`)
      .then((res) => res.json())
      .then((data) => {
        if(data) {
          this.product = data; // Store the product data in the component
          console.log('Product Details Data:', this.product);
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      })
    }
  };

  addToCartBtn(product : Product){
    console.log('Product to add to cart:', product);
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');

    if(cart[product.id]){
      cart[product.id].quantity += 1;
      console.log(`${product.title} quantity is ${cart[product.id].quantity}`)
    }else {
      product.quantity = 1;
      cart[product.id] = product;
      console.log(`${product.title} has been added !!`)
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;
    console.log("Cart products are - ", this.cart);
  }

  incrementQuantity(product:Product){
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[product.id]) {
      cart[product.id].quantity += 1; 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.cart = cart; 
    }
  }

  decrementQuantity(product:Product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[product.id] && cart[product.id].quantity > 1) {
      cart[product.id].quantity -= 1; 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.cart = cart;
    } else {
      delete cart[product.id];
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.cart = cart;
    }
  }

   ratingDistribution = {
    "5":100,
    "4": 50,
    "3": 20,
    "2": 10,
    "1": 20
   }

   totalRating = Object.values(this.ratingDistribution).reduce((a,b) => a + b ,0)

   chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Ratings Distribution',
        data: [
          this.ratingDistribution['1'],
          this.ratingDistribution['2'],
          this.ratingDistribution['3'],
          this.ratingDistribution['4'],
          this.ratingDistribution['5']
        ],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      }
    ]
   };

   chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
    
   rating =4.3

}
