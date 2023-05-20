import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExchangeInfo } from '../models/exchangeInfo';
import { ICurrency } from '../models/currency';
import { ICurrencyMap } from '../models/currencyMap';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
    this.getExchangeInfo()
    .subscribe(response => {
        this.exchangeInfo = response;
        this.extractCurrencies(this.exchangeInfo.rates);
    });
  }

  baseUri = "https://open.er-api.com/v6/latest/";
  exchangeInfo: IExchangeInfo;
  currencies: ICurrency[] = [];

  getExchangeInfo() {
    return this.http.get<IExchangeInfo>(this.baseUri + "UAH");
  }

  extractCurrencies(rates: ICurrencyMap) {
    for(var i in rates){
      this.currencies.push({code: i, rate: rates[i]} as ICurrency);
    }
  }

  getRequiredCurrencies(recuiredCurrencies: readonly string[])
  {   
    return this.currencies.filter((el) => {
      return recuiredCurrencies.some((f) => {
        return f === el.code;
      })
    });
  }
}
