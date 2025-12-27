import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly window: Window = inject(Window);

  setItem(key: string, value: string): void {
    try {
      this.window.localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  getItem(key: string): string | null {
    try {
      return this.window.localStorage.getItem(key);
    } catch (error) {
      console.error('Error getting from localStorage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      this.window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }

  clear(): void {
    try {
      this.window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
