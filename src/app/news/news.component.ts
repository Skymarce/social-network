import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalChangeComponent } from '../modal-change/modal-change.component';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { INews } from '../models/news';
import { User } from '../models/user';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'country', 'link', 'changeNew', 'deleteNew', 'addToFavorites'];
  dataSource = new MatTableDataSource<INews>();
  isLoading = false;
  user: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private newsService: NewsService,
    public dialog: MatDialog,) { 
      this.user = User.getInstance();
    }

  ngOnInit(): void {
    this.loadNews();
  }

  public loadNews() {
    this.newsService.getNews()
      .subscribe(response => {
        response.sort((a, b) => {
          return a.id - b.id;
        });
        this.dataSource = new MatTableDataSource<INews>(response);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });
  }

  public openChangeDialog(news: INews): void {
    const dialogRef = this.dialog.open(ModalChangeComponent, { 
      data: news
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNews();
    });
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(ModalCreateComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.loadNews();
    });
  }

  public deleteNews(news: INews): void {
    this.isLoading = true;
    this.newsService.delete(news.id)
      .subscribe({
        next: () => {
          this.loadNews();
        }
      });
  }

  public addFavoriteNews(id: number): void {
    const userNew = {
      email: this.user.email,
      newsId: id
    };
    
    this.newsService.addNewsToUser(userNew)
      .subscribe({
        next: () => {
          alert('Ваша новость успешно добавлена в избранное');
        },
        error: () => {
          alert('Упс, что-то пошло не так');
        }
      });
  }
  
}