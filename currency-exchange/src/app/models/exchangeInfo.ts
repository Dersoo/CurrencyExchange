export interface IExchangeInfo {
    result: string
    provider: string
    documentation: string
    terms_of_use: string
    time_last_update_unix: number
    time_last_update_utc: string
    time_next_update_unix: number
    time_next_update_utc: string
    time_eol_unix: number
    base_code: string
    rates: {
        UAH: number
        USD: number
        EUR: number
    }
}