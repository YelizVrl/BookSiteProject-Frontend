import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = 'https://localhost:44389/api/';

  constructor(private httpClient: HttpClient) { }


  getCategories():Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl + "categories/getall");
  }

  add(category:Category) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"categories/add", category)
  }

  delete(category:Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "categories/delete", category)
  }

}
