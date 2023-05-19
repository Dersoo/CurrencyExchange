import { Component, Input, OnInit } from "@angular/core";
import { CurrencyService } from '../../services/currency.service';

@Component({
    selector: 'app-currency-display',
    templateUrl: './currency-display.component.html'
})
export class CurrencyDisplayComponent implements OnInit {
    constructor(private currencyService: CurrencyService) {}

    eur: number = 0;
    usd: number = 0;
    
    ngOnInit(): void {
        this.currencyService.getExchangeInfo()
            .subscribe(response => {
                this.eur = 1 / response.rates.EUR;
                this.usd = 1 / response.rates.USD;
            });
    }
}