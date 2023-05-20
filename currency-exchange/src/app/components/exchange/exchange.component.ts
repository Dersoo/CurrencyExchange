import { Component, OnInit } from "@angular/core";
import { CurrencyService } from '../../services/currency.service';
import { ICurrency } from '../../models/currency';

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html'
})
export class ExchangeComponent implements OnInit {
    constructor(private currencyService: CurrencyService) { }

    recuiredCurrencies: readonly string[] = ["UAH", "USD", "EUR"]
    currencies: ICurrency[];
    firstSelectedCurrency: ICurrency;
    secondSelectedCurrency: ICurrency;
    firstCurrencyValue: number = 0;
    secondCurrencyValue: number = 0;
    
    ngOnInit(): void {
        this.currencies = this.currencyService.getRequiredCurrencies(this.recuiredCurrencies);
        this.firstSelectedCurrency = this.currencies[0];
        this.secondSelectedCurrency = this.currencies[0];
    }

    changeCurrency(event: any, currencyNumber: number) : void {
        if(currencyNumber == 1){
            this.firstSelectedCurrency = event.value;
            this.changeValue(currencyNumber);
        }else if (currencyNumber == 2){
            this.secondSelectedCurrency = event.value;
            this.changeValue(currencyNumber);
        }
    }

    changeValue(numberOfChangedInput: number) : void {
        if(numberOfChangedInput == 1){
            this.secondCurrencyValue = this.convert(this.firstSelectedCurrency.rate, 
                this.secondSelectedCurrency.rate, 
                this.firstCurrencyValue);
        }else if (numberOfChangedInput == 2){
            this.firstCurrencyValue = this.convert(this.secondSelectedCurrency.rate, 
                this.firstSelectedCurrency.rate, 
                this.secondCurrencyValue);
        }
    }

    convert(from: number, to: number, value: number) : number {
        if(from !== to){
            if(from === 1 || to === 1){
                if(from < to)
                {
                    return (to/from)*value;
                }else{
                    return (from*to)*value;
                }
            }else{
                return (to/from)*value;
            }
        }else{
            return value;   
        }
    }
}