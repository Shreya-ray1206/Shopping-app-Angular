import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.services';
import { HeaderVisibilityService } from '../../services/header-visibility.services';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
    private headerVisibilityService: HeaderVisibilityService
  ) {
    this.fetchCategories();
    this.fetchInitialProducts();
  }
  
  showHeader :boolean = true;
  
  ngOnInit(){
    this.headerVisibilityService.showHeader$.subscribe((visibility) => {
      this.showHeader = visibility;
      });
  }

  fetchInitialProducts(): void {
    this.searchService.fetchInitialProducts().subscribe({
      next: (data) => {
        this.productList = data.products;  // Assuming 'products' is the key in response
        this.originalProductList = [...this.productList];
        console.log('Fetched products:', this.productList);
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
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
    this.selectedCategory = category;
  console.log(`Selected category: ${category}`);
  
  this.searchService.clearSearchResults();
  // Redirect to home with category as a query parameter
  this.router.navigate(['/'], { queryParams: { category } });

  // Update service with loading state (optional)
  }

  fetchCategoryProducts(category: string): void {
    // Fetch products based on the selected category (this could also be handled in BodyComponent)
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        this.searchService.setSearchResults(data.products);
        console.log('Fetched products for category:', data.products);
      })
      .catch((error) => {
        console.error('Error fetching category products', error);
      });
  }

  redirectToCart(){
    this.router.navigate(['/cart']);
  }
}

