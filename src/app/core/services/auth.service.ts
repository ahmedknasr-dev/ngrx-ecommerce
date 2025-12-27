import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly apiUrl: string = environment.apiUrl;
  private readonly TOKEN_KEY: string = 'auth_token';

  isAuthenticated: WritableSignal<boolean> = signal<boolean>(this.hasToken());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        this.isAuthenticated.set(true);
        this.localStorageService.setItem(this.TOKEN_KEY, response.token);
      })
    );
  }

  logout(): void {
    this.localStorageService.removeItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.localStorageService.getItem(this.TOKEN_KEY);
  }
}
