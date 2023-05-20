import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ICurrency } from '../../../models/currency';

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html'
})
export class SelectListComponent implements OnInit {
    constructor() {}

    @Input() currencies: ICurrency[];
    @Input() selectedCurrency: ICurrency;
    @Output() newSelectedCurrency = new EventEmitter<ICurrency>();

    ngOnInit(): void {
    }

    changeCurrency(currency: ICurrency) {
        this.newSelectedCurrency.emit(currency);
    }
}