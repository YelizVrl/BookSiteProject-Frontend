import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { PublishingHouse } from '../models/publishing-house';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PublishingHouseService {
  apiUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getPublishingHouses():Observable<ListResponseModel<PublishingHouse>> {
    return this.httpClient.get<ListResponseModel<PublishingHouse>>(this.apiUrl+ "publishinghouses/getall");
  }

  add(publishingHouse:PublishingHouse) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"publishingHouses/add", publishingHouse)
  }

  delete(publishingHouse:PublishingHouse): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "publishingHouses/delete", publishingHouse)
  }
}
