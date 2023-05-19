import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExchangeInfo } from '../models/exchangeInfo';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  baseUri = "https://open.er-api.com/v6/latest/";
  
  getExchangeInfo() {
    return this.http.get<IExchangeInfo>(this.baseUri + "UAH");
  }
}
