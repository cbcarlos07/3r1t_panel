import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { PedidoComponent } from "./abertos/pedido.component";
import { AtendimentoComponent } from "./atendimento/atendimento.component";
import { PdfComponent } from "./pdf/pdf.component";
import { PedidoItemComponent } from "./pedido-item/pedido-item.component";


const ROUTES: Routes = [
    {path: '', redirectTo: 'aberto'},
    {path: 'aberto', component: PedidoComponent},
    {path: 'atendimento', component: AtendimentoComponent},
    {path: 'detalhe/:id', component: PedidoItemComponent},
]
@NgModule({
    declarations: [PedidoComponent,PedidoItemComponent,AtendimentoComponent, PdfComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )],
    entryComponents: [PdfComponent]
})
export class PedidoRoutes{}