import { Component, OnInit } from '@angular/core';
import { BooksApiService } from '../services/books-api.service'
import { Volume } from '../interfaces/volume'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private booksApi: BooksApiService) { }
  public books: Volume[];
  ngOnInit(): void {

  }
  async search(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.books = await this.booksApi.queryBooks(event.target.value)
    }

  }
  getProgreeBarWidth(book) {
    return { width: `` }
  }
}
