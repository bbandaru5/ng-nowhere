import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ConfessComponent } from './confess/confess.component'
import { HearComponent } from './hear/hear.component'
const routes: Routes = [
  {path: 'hear', component: HearComponent},
  {path: 'confess', component: ConfessComponent},
  {path:'',component: HearComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
