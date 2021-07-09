import { CurrencyMaskConfig } from 'ngx-currency'

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: "",
    thousands: ".",
    nullable: true
}