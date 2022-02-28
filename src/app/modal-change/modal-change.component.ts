import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { INews } from '../models/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-modal-change',
  templateUrl: './modal-change.component.html',
  styleUrls: ['./modal-change.component.scss']
})
export class ModalChangeComponent implements OnInit {

  changeForm: FormGroup;
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    public dialogRef: MatDialogRef<ModalChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INews,
    private newsService: NewsService) { }

  ngOnInit() {
    this.changeForm = new FormGroup({
      title: new FormControl(this.data.title, Validators.required),
      country: new FormControl(this.data.country, Validators.required),
      link: new FormControl(this.data.link, Validators.required)
    });
  }

  closeModalChange(): void {
    this.dialogRef.close();
  }

  public editNews() {
    this.isLoading.next(true);
    this.newsService.update(this.changeForm.value, this.data.id) 
      .subscribe({
        next: () => {
          alert('Новость успешно отредактирована');
          this.closeModalChange();
        },
        error: () => {
          alert('Упс, что-то пошло не так...');
        },
        complete: () => {
          this.isLoading.next(false);
        }
      })
  }

}