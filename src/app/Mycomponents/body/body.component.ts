import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ShimmeruiComponent } from '../shimmerui/shimmerui.component';

import { SearchService } from '../../services/search.services';

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  quantity: number;
}

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, HttpClientModule, GalleriaModule, ShimmeruiComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  productsList: Product[] = [];
  cart: { [id: number]: Product } = {}; // Initialize an empty object to hold cart items
  
  imageArray: string[] = [
    "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/misc/general/free/original/oVDLoTVdg-GGS-plp.jpg",
    "https://cdn.grabon.in/gograbon/blog/wp-content/uploads/2024/02/Payday-Sale.jpg",
    "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/theme-image-1725873869218.jpeg"
  ];

  loading: boolean = true;
  currentImageIndex: number = 0;
  selectedCategory: string | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadInitialProducts();

    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'];  // Get the selected category from the URL

      if (this.selectedCategory) {
        this.fetchCategoryProducts(this.selectedCategory);  // Fetch products for the selected category
      } else {
        this.loadInitialProducts();  // If no category, load all products
      }
    });

    // Fetch existing cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cart = storedCart;

    this.searchService.searchResults$.subscribe((results) => {
      if (results.length) {
        this.productsList = results; // Update product list with search results
      } else {
        this.productsList =[]
      }
    });

    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageArray.length;
    }, 1500);
   
  }

  fetchCategoryProducts(category: string): void {
    this.http.get<{ products: Product[] }>(`https://dummyjson.com/products/category/${category}`).subscribe(
      (response) => {
        this.productsList = response.products;
        this.searchService.setSearchResults(this.productsList);
      },
      (error) => {
        console.error('Error fetching category products:', error);
      }
    );
  }

  loadInitialProducts() {
    this.http.get<{ products: Product[] }>('https://dummyjson.com/products').subscribe(
      (response) => {
        setTimeout(() => {
          this.productsList = response.products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            thumbnail: product.thumbnail,
            quantity: product.quantity
          }));
          this.loading = false;
        }, 2000);
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading= false
      }
    );
  }

  viewProductDetails(productId: number): void {
    this.router.navigate([`/product/${productId}`]);
    console.log(`Product id is - ${productId}`);
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
   
    if (cart[product.id]) {
      cart[product.id].quantity += 1;
      console.log(`${product.title} has already been added, and the quantity is - ${cart[product.id].quantity}`);
    } else {
      product.quantity = 1;
      cart[product.id] = product;
      console.log(`${product.title} has been added !!`)
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;  //updated the cart variable

  }

  // Incremnt and decrement left IMPO
  
  incrementQuantity(product:Product,  event: Event){
    event.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[product.id]) {
      cart[product.id].quantity += 1; 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.cart = cart; 
    }
  }

  decrementQuantity(product:Product, event: Event) {
    event.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[product.id] && cart[product.id].quantity > 1) {
      cart[product.id].quantity -= 1; 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.cart = cart;
    } else {
      // If quantity is 1, remove product from cart and show "Add to Cart" button again
      delete cart[product.id];
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.cart = cart;
    }
  }
  clearCart(): void {
    localStorage.removeItem('cart');
    this.cart = {}; 
    console.log('Cart has been cleared');
  }
}




//  // Initialize the responsiveOptions array within ngOnInit or class constructor
//  this.responsiveOptions = [
//   {
//     breakpoint: '1024px',
//     numVisible: 3,
//     numScroll: 3
//   },
//   {
//     breakpoint: '768px',
//     numVisible: 2,
//     numScroll: 2
//   },
//   {
//     breakpoint: '560px',
//     numVisible: 1,
//     numScroll: 1
//   }
// ];

// this.images = [
//   {
//     itemImageSrc: 'https://media.istockphoto.com/id/1285336613/vector/christmas-price-tag-banner-xmas-sparkling-lights-garland-with-gifts-box-holidays-background.jpg?s=2048x2048&w=is&k=20&c=QQE75btlbk3iHJjipAgzcrUxpA8QLJCff-5f8SB5X3s=',
//     thumbnailImageSrc: 'https://example.com/discount1_thumb.jpg',
//     alt: 'Discount 1'
//   },
//   {
//     itemImageSrc: 'https://cdn.shopify.com/s/files/1/1246/6441/articles/Shopify_Sales-Promotions_Blog-Header-Image_1_20_1.png?v=1726850265&originalWidth=1848&originalHeight=782&width=1800',
//     thumbnailImageSrc: 'https://example.com/discount2_thumb.jpg',
//     alt: 'Discount 2'
//   },
//   {
//     itemImageSrc: 'https://www.shutterstock.com/shutterstock/photos/2444362127/display_1500/stock-vector-summer-sale-podium-display-pile-of-sand-flowers-coconut-tree-beach-umbrella-beach-chair-and-2444362127.jpg',
//     thumbnailImageSrc: 'https://example.com/discount3_thumb.jpg',
//     alt: 'Discount 3'
//   }
// ];

// setTimeout(() => {
//   this.imageVisible = true;
// }, 1000);  // 1000ms = 1 second
