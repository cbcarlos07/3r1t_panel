import { CommonModule, registerLocaleData  } from "@angular/common";
import { LOCALE_ID, ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InputComponent } from "./input/input.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCurrencyModule } from "ngx-currency";
import { CustomCurrencyMaskConfig } from './input/CustomCurrencyMaskConfig'
import localePt from '@angular/common/locales/pt'
import { HeaderComponent } from "src/app/common/header/header.component";
import { MenuComponent } from "src/app/common/menu/menu.component";
import { NotificationService } from "./messages/notification.service";
import { SnackbarComponent } from "./messages/snackbar/snackbar.component";
registerLocaleData(localePt, 'pt-BR')
@NgModule({
    declarations: [InputComponent,
        HeaderComponent,
        MenuComponent,
        SnackbarComponent
    ],
    imports: [CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule.forRoot( CustomCurrencyMaskConfig )
    ],
    exports: [InputComponent,
        HeaderComponent,
        MenuComponent,
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        SnackbarComponent
    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [
                NotificationService,
                {provide: LOCALE_ID, useValue: 'pt-BR'}
            ]
        }
    }
}