import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { RegisterData } from '../interfaces/register.interface';
import { Login, UserLoginResponse } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.interface';
import { CheckTokenResponse } from '../interfaces/check-token.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private baseUrl: string = environments.baseUrl
  private http = inject(HttpClient)

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  private setLocalStorage(user: User, token: string): boolean{
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)
    return true
  }

  login(login: Login): Observable<boolean> {

    return this.http.post<UserLoginResponse>(`${this.baseUrl}/auth/login`, login)
    .pipe(
      map(({user, token}) => this.setLocalStorage(user, token)),
      catchError((error) => {
        return throwError(()=>error)
      })
    )
  }
  register(registerData: RegisterData): Observable<boolean> {
    return of(true)
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token')
    if(!token) {
      this.logout()
      return of(false)
    }

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, {headers: header})
    .pipe(
      map(({user, token}) => this.setLocalStorage(user, token)),
      catchError((error) => {
        this._authStatus.set(AuthStatus.notAuthenticated)
        return of(false)
      })
    )
  }

  logout(){
    this._authStatus.set(AuthStatus.notAuthenticated)
    this._currentUser.set(null)
    localStorage.clear()
  }


}
