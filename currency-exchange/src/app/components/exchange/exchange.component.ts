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
    
    ngOnInit(): void {
        this.currencyService.getExchangeInfo()
            .subscribe(response => {
                this.exchangeInfo = response;
            });
    }

    changeCurrency(event: any, currencyNumber: Number){
        if(currencyNumber == 1){
            this.firstSelectedCurrency = event.value
            console.log(this.firstSelectedCurrency)
        }else if (currencyNumber == 2){
            this.secondSelectedCurrency = event.value
            console.log(this.secondSelectedCurrency)
        }
    }
}