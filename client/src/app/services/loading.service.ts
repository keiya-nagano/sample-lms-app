import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingList = [];

  start(key: string): void {
    timer().subscribe(() => {
      this.loadingList.push(key);
    });
  }

  end(key: string): void {
    timer().subscribe(() => {
      const keyIndex = this.loadingList.indexOf(key);
      if (keyIndex !== -1) {
        this.loadingList.splice(keyIndex, 1);
      }
    });
  }

  isLoading(): boolean {
    return this.loadingList.length > 0;
  }
}
