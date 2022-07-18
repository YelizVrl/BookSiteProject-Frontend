import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoverType } from '../models/coverType';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CoverTypeService {

  apiUrl = 'https://localhost:44389/api/covertypes/getall';

  constructor(private httpClient:HttpClient) { }

  getCoverTypes():Observable<ListResponseModel<CoverType>> {
    return this.httpClient.get<ListResponseModel<CoverType>>(this.apiUrl);
  }

}
