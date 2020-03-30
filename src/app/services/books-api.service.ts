import { Injectable } from '@angular/core';
import { GOOGLE_APIS } from '../constants/app-constants'
import axios from 'axios';
import { Volume } from '../interfaces/volume'
@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  constructor() { }
  async queryBooks(query): Promise<Volume[]> {
    return axios.get('/books/v1/volumes', {
      baseURL: GOOGLE_APIS,
      params: {
        q: query
      }
    }).then(res => {
      let response = res.data.items.map(a => {
        return {
          id: a.id,
          bookInfo: {
            title: a.volumeInfo.title,
            authors: a.volumeInfo.authors,
            publishedDate: a.volumeInfo.publishedDate,
            description: a.volumeInfo.description ? a.volumeInfo.description.slice(0, 250) + "..." : "",
            pageCount: a.volumeInfo.pageCount,
            averageRating: a.volumeInfo.averageRating,
            ratingsCount: a.volumeInfo.ratingsCount,
            image: a.volumeInfo.imageLinks ? a.volumeInfo.imageLinks.thumbnail : ""
          }
        }
      });
      return Promise.resolve(response)
    })
  }
}
