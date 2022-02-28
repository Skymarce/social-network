import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService, IUser } from '../services/auth.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-favorite-news',
  templateUrl: './favorite-news.component.html',
  styleUrls: ['./favorite-news.component.scss']
})
export class FavoriteNewsComponent implements OnInit {
  
  user: User;
  userNews: IUser;

  constructor(
    private authService: AuthService,
    private newsService: NewsService) { 
    this.user = User.getInstance();
  }

  ngOnInit(): void {
    this.getFavoriteNews();
  }

  public getFavoriteNews(): void {
    this.authService.getUserByEmail(this.user.email)
      .subscribe(response => {
        this.userNews = response;
      });
  }

  public deleteFavotiteNews(newsId: number) {
    this.newsService.deleteNewsFromFavorite(newsId)
      .subscribe({
        next: () => {
          this.getFavoriteNews();
          alert('Ваша новость успешно удалена');
        },
        error: () => {
          alert('Упс, что-то пошло не так');
        }
      });
  }

}