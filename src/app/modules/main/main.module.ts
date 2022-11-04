import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: "", component: MainComponent }
];

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
