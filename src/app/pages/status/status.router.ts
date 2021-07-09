import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { StatusComponent } from "./status.component";

const ROUTES: Routes = [
    {path: '', component: StatusComponent}
]
@NgModule({
    declarations: [StatusComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class StatusRoutes{}