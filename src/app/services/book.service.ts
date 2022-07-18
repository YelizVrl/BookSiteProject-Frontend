import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { BookDetails } from '../models/book-details';
import { Book } from '../models/book';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'https://localhost:44389/api/';

  constructor(private httpClient: HttpClient) { }

  // getBooks():Observable<ListResponseModel<Book>> {
  //   let newPath = this.apiUrl + "books/getall"
  //   return this.httpClient.get<ListResponseModel<Book>>(newPath);
  // }

  // getBooksByCategory(categoryId:number):Observable<ListResponseModel<Book>> {
  //   let newPath = this.apiUrl + "books/getbooksbycategoryid?id="+categoryId
  //   return this.httpClient.get<ListResponseModel<Book>>(newPath);
  // }

  // getBooksByWriter(writerId:number):Observable<ListResponseModel<Book>> {
  //   let newPath = this.apiUrl + "books/getbooksbywriterid?id="+writerId
  //   return this.httpClient.get<ListResponseModel<Book>>(newPath);
  // }

  // getBooksByPublishingHouse(publishingHouseId:number):Observable<ListResponseModel<Book>> {
  //   let newPath = this.apiUrl + "books/getbooksbypublishinghouseid?id="+publishingHouseId
  //   return this.httpClient.get<ListResponseModel<Book>>(newPath);
  // }

  getBooks():Observable<ListResponseModel<BookDetails>> {
    let newPath = this.apiUrl + "books/getbookdetails"
    return this.httpClient.get<ListResponseModel<BookDetails>>(newPath);
  }

  getBooksDetailsByBookId(bookId:number):Observable<ListResponseModel<BookDetails>>{
    let newPath = this.apiUrl +"books/getbookdetailsbybookid?id="+bookId;
    return this.httpClient.get<ListResponseModel<BookDetails>>(newPath);
  }

  getBooksByCategory(categoryId:number):Observable<ListResponseModel<BookDetails>> {
    let newPath = this.apiUrl + "books/getbooksbycategoryid?id="+categoryId
    return this.httpClient.get<ListResponseModel<BookDetails>>(newPath);
  }

  getBooksByWriter(writerId:number):Observable<ListResponseModel<BookDetails>> {
    let newPath = this.apiUrl + "books/getbooksbywriterid?id="+writerId
    return this.httpClient.get<ListResponseModel<BookDetails>>(newPath);
  }

  getBooksByPublishingHouse(publishingHouseId:number):Observable<ListResponseModel<BookDetails>> {
    let newPath = this.apiUrl + "books/getbooksbypublishinghouseid?id="+publishingHouseId
    return this.httpClient.get<ListResponseModel<BookDetails>>(newPath);
  }

  add(book:Book):Observable<SingleResponseModel<Book>>{
    return this.httpClient.post<SingleResponseModel<Book>>(this.apiUrl+"books/add",book)

  }

  delete(book:BookDetails): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "books/delete", book)
  }

  update(book:Book): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "books/update", book)
  }

}
