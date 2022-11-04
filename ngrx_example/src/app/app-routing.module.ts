import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("src/app/modules/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "home",
    pathMatch: "full",
    loadChildren: () => import("src/app/modules/main/main.module").then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
