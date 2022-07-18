import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { PageType } from '../models/pageType';

@Injectable({
  providedIn: 'root'
})
export class PageTypeService {

  apiUrl = 'https://localhost:44389/api/pagetypes/getall';

  constructor(private httpClient:HttpClient) { }

  getPageTypes():Observable<ListResponseModel<PageType>> {
    return this.httpClient.get<ListResponseModel<PageType>>(this.apiUrl);
  }

}
