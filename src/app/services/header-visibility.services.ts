import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderVisibilityService {
  private showHeaderSubject = new BehaviorSubject<boolean>(true); // Default: header is visible
  showHeader$ = this.showHeaderSubject.asObservable();

  setHeaderVisibility(isVisible: boolean) {
    this.showHeaderSubject.next(isVisible);
  }

  resetHeaderVisibility(): void {
    this.showHeaderSubject.next(true); // Reset to default visibility
  }
}
