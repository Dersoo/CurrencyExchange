import { Component, OnInit } from "@angular/core";
import { CurrencyService } from '../../services/currency.service';
import { IExchangeInfo } from '../../models/exchangeInfo';

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html'
})
export class ExchangeComponent implements OnInit {
    constructor(private currencyService: CurrencyService) {}

    exchangeInfo: IExchangeInfo;
    currencies: readonly string[] = ["UAH", "USD", "EUR"];
    firstSelectedCurrency: string = this.currencies[0];
    secondSelectedCurrency: string = this.currencies[0];
    firstCurrencyValue: number = 0;
    secondCurrencyValue: number = 0;
    usdMeasure: number = 0;
    eurMeasure: number = 0 ;
    
    ngOnInit(): void {
        this.currencyService.getExchangeInfo()
            .subscribe(response => {
                this.exchangeInfo = response;
                this.usdMeasure = 1 / this.exchangeInfo.rates.USD;
                this.eurMeasure = 1 / this.exchangeInfo.rates.EUR;
            });
    }

    changeCurrency(event: any, currencyNumber: Number){
        if(currencyNumber == 1){
            this.firstSelectedCurrency = event.value
            this.convert(1);
        }else if (currencyNumber == 2){
            this.secondSelectedCurrency = event.value
            this.convert(2);
        }
    }

    convert(numberOfChangedInput: number){
        if(numberOfChangedInput == 1)
        {
            this.secondCurrencyValue = this.determineExchangeDirectionAndGetCalculation(this.firstSelectedCurrency, 
                this.secondSelectedCurrency,
                this.firstCurrencyValue);
        }else if(numberOfChangedInput == 2){
            this.firstCurrencyValue = this.determineExchangeDirectionAndGetCalculation(this.secondSelectedCurrency, 
                this.firstSelectedCurrency,
                this.secondCurrencyValue);
        }
    }

    determineExchangeDirectionAndGetCalculation(fromCurrecy: string, toCurrency:string, value: number)
    {
        if(fromCurrecy == "UAH" && toCurrency == "USD")
        {
            return this.uahToUsd(value);
        }else if(fromCurrecy == "UAH" && toCurrency == "EUR")
        {
            return this.uahToEur(value);
        }else if(fromCurrecy == "USD" && toCurrency == "EUR")
        {
            return this.usdToEur(value);
        }else if(fromCurrecy == "USD" && toCurrency == "UAH")
        {
            return this.usdToUah(value);
        }else if(fromCurrecy == "EUR" && toCurrency == "USD")
        {
            return this.eurToUsd(value);
        }else if(fromCurrecy == "EUR" && toCurrency == "UAH")
        {
            return this.eurToUah(value);
        }else{
            return value;
        }
    }

    usdToUah(value: number)
    {
        return (value * this.usdMeasure); 
    }

    uahToUsd(value: number)
    {
        return (value * this.usdMeasure);
    }

    eurToUah(value: number)
    {
        return (value * this.eurMeasure); 
    }

    uahToEur(value: number)
    {
        return (value * this.usdMeasure);
    }

    usdToEur(value: number)
    {
        return value*(this.usdMeasure/this.eurMeasure);
    }

    eurToUsd(value: number)
    {
        return value*(this.eurMeasure/this.usdMeasure);
    }
}