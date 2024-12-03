import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.services';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Fixed property name
})
export class HeaderComponent {
  searchQuery: string = '';
  productList: any[] = [];
  categories: any[] = [];
  suggestions: string[] = [];
  originalProductList: any[] = [];
  selectedCategory : string | null = null;

  constructor(
    private http: HttpClient,
    private searchService: SearchService,
    private router: Router,
  ) {
    this.fetchCategories();
    this.fetchInitialProducts();
  }

  fetchInitialProducts() {

    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        this.productList = data.products;
        this.originalProductList = [...this.productList]; 
        console.log('Fetched products:', this.productList);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }


  searchProducts() {
    if (!this.searchQuery.trim()) {
      this.productList = [...this.originalProductList];  
      this.searchService.setSearchResults(this.productList); 
      return;
    }

  
    fetch(`https://dummyjson.com/products/search?q=${this.searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        this.searchService.setSearchResults(data.products);
        console.log('Searched products are:', data.products);
      })
      .catch((error) => {
        console.error('Error fetching search results', error);
      });
  }
  
  onSearchQueryChange() {
    if (!this.searchQuery.trim()) {
      this.productList = [...this.originalProductList]; 
      this.searchService.setSearchResults(this.productList);
    } else {
      this.searchProducts(); 
    }
  }

  fetchCategories() {
    fetch('https://dummyjson.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        console.log('Fetched categories:', this.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories', error);
      });
  }

  onSelectCategory(category: string) {
    this.selectedCategory = category
    console.log(`The category selected is - ${this.selectedCategory}`);


    // Redirect to home page and pass selected category as a query parameter
  this.router.navigate(['/'], { queryParams: { category: category } });
  

    this.productList = [];  
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          this.productList = data.products; // Update the products list
          this.searchService.setSearchResults(this.productList);
        } else {
          this.productList = []; // No products for this category
          this.searchService.setSearchResults(this.productList);
        }
     })
      .catch((error) => {
        console.error('Error fetching category products', error);
      });
  }

  redirectToCart(){
    this.router.navigate(['/cart']);
  }
}

