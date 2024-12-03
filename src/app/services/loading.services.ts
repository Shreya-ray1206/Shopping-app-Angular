// src/app/core/services/loading.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',  // This makes the service available throughout the app
})
export class LoadingService {
  // BehaviorSubject to manage loading state (default is false - not loading)
  private loadingSubject = new BehaviorSubject<boolean>(false);  
  
  // Observable that other components can subscribe to
  loading$ = this.loadingSubject.asObservable();

  // Method to set the loading state
  setLoadingState(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }
}
