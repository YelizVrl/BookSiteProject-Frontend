import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookImage } from '../models/book-image';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookImagesService {

  private apiUrl = "https://localhost:44389/";

  constructor(private httpClient: HttpClient) { }

  getImagePath(imagePath: string) {
    let newPath = this.apiUrl + "Uploads/images/"
    return newPath + imagePath
  }

  // getFirstImageByCarId(bookId:number):Observable<SingleResponseModel<BookImage>>  {
  //   return this.httpClient.get<SingleResponseModel<BookImage>>(this.apiUrl + "/getfirstimagebycarid?bookId="+bookId)
  // }

  uploadBookImage(file:File, bookId:number):Observable<ResponseModel> {
    const formData = new FormData()
    formData.append('imageFile', file)
    formData.append('bookId', JSON.stringify(bookId))
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/bookimages/add", formData)
  }

  deleteImage(bookImage: BookImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/bookimages/delete", bookImage);
  }

}
