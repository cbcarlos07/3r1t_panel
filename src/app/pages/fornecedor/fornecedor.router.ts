import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { FornecedorComponent } from "./fornecedor.component";


const ROUTES: Routes = [
    {path: '', component: FornecedorComponent}
]
@NgModule({
    declarations: [FornecedorComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class FornecedorRoutes{}