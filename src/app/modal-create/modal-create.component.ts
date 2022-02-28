import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateComponent>,
    private newsService: NewsService) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required)
    });
  }
  
  closeModalCreate(): void {
    this.dialogRef.close();
  }

  createNews() {
    const news = {
      title: this.createForm.value.title,
      country: this.createForm.value.country,
      link: this.createForm.value.link
    };

    this.newsService.create(news)
      .subscribe({
        next: () => {
          this.createForm.reset();
          this.closeModalCreate();
        },
        error: () => {
          alert('Что-то пошло не так ;(');
        }
      });
  }

}