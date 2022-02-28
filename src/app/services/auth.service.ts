import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IUser {
  name?: string;
  secondName?: string;
  email: string;
  password: string;
  news?: {
    id?: number;
    title: string;
    country: string;
    link: string;
  }[]
}

export interface IResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public registration(userData: IUser): Observable<void> {
    return this.http.post<void>(`${environment.url}users`, userData);
  }

  public login(user: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(`${environment.url}auth/login`, user);
  }

  public getUserByEmail(email: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.url}users/${email}`);
  }

}