import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INews } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) { }
  
  public getNews(): Observable<INews[]> {
    return this.http.get<INews[]>(`${environment.url}news`);
  }

  public update(news: INews, id: number): Observable<void> {
    return this.http.put<void>(`${environment.url}news/${id}`, news);
  }

  public create(news: INews): Observable<INews> {
    return this.http.post<INews>(`${environment.url}news`, news);
  }

  public delete(id: number): Observable<INews> {
    return this.http.delete<INews>(`${environment.url}news/${id}`);
  }

  public addNewsToUser(news: {email: string, newsId: number}): Observable<void> {
    return this.http.post<void>(`${environment.url}users/addNewsToUser`, news);
  }

  public deleteNewsFromFavorite(newsId: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}users/deleteMyNew/${newsId}`);
  }
  
}