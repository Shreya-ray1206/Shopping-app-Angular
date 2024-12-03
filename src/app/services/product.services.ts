import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Product interface that matches your API's response
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
  thumbnail: string;
  brand : string;
  // Add other properties as needed...
}

@Injectable({
  providedIn: 'root', 
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products'; 

  constructor(private http: HttpClient) {}

  // Method to fetch a product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
