import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class SearchService {
    private searchResultsSubject = new BehaviorSubject<any[]>([]);  // Private BehaviorSubject to hold search results
    searchResults$ = this.searchResultsSubject.asObservable();  // Public observable for components to subscribe to
  
    // Method to update the search results
    setSearchResults(results: any[]) {
      this.searchResultsSubject.next(results);  // Push new results into the BehaviorSubject
    }

    clearSearchResults() {
        this.searchResultsSubject.next([]);
      }
}
