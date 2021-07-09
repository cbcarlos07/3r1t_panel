import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { CargoComponent } from "./cargo.component";



const ROUTES: Routes = [
    {path: '', component: CargoComponent}
]
@NgModule({
    declarations: [CargoComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class CargoRoutes{}