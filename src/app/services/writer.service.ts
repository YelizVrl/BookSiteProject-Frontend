import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Writer } from '../models/writer';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  apiUrl = "https://localhost:44389/api/";

  constructor(private httpClient: HttpClient) { }

  getWriters():Observable<ListResponseModel<Writer>> {
    return this.httpClient.get<ListResponseModel<Writer>>(this.apiUrl + "writers/getall");
  }

  add(writer:Writer) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"writers/add", writer)
  }

  delete(writer:Writer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "writers/delete", writer)
  }
}
