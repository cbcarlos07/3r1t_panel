import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { UsuarioFormComponent } from "./usuario-form/usuario-form.component";
import { UsuarioComponent } from "./usuario.component";



const ROUTES: Routes = [
    {path: '', component: UsuarioComponent},
    {path: 'cad', component: UsuarioFormComponent},
    {path: 'edit/:id', component: UsuarioFormComponent}, 
]
@NgModule({
    declarations: [UsuarioComponent, UsuarioFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class UsuarioRoutes{}