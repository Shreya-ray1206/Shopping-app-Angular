import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root',  
})
export class SearchService {

    private searchResultsSubject = new BehaviorSubject<any[]>([]);  // Private BehaviorSubject to hold search results
    searchResults$ = this.searchResultsSubject.asObservable();  // Public observable for components to subscribe to
  

    // fetchInitialProducts() {
    //   this.http.get<{ products: any[] }>('https://dummyjson.com/products').subscribe(
    //     (response) => this.searchResultsSubject.next(response.products),
    //     (error) => console.error('Error fetching initial products:', error)
    //   );
    // }

    fetchInitialProducts(): Observable<any> {
      return new Observable((observer: Observer<any>) => {
        fetch('https://dummyjson.com/products')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            observer.next(data);  // Push the data to the observer
            observer.complete();  // Complete the Observable
          })
          .catch(error => {
            observer.error(error);  // Push the error to the observer
          });
      });
    }
    // Method to update the search results
    setSearchResults(results: any[]) {
      console.log('Updating search results:', results);
      this.searchResultsSubject.next(results);  // Push new results into the BehaviorSubject
    }

    clearSearchResults() {
      console.log('Clearing search results');
      this.searchResultsSubject.next([]);
    }
}
