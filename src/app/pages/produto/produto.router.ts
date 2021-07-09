import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ProdutoFormComponent } from "./produto-form/produto-form.component";
import { ProdutoComponent } from "./produto.component";


const ROUTES: Routes = [
    {path: '', component: ProdutoComponent},
    {path: 'cad', component: ProdutoFormComponent},
    {path: 'edit/:id', component: ProdutoFormComponent},
]
@NgModule({
    declarations: [ProdutoComponent, ProdutoFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class ProdutoRoutes{}