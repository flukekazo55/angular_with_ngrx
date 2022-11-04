import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarsTableComponent } from './cars-table/cars-table.component';

// STORE
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { carReducer } from 'src/app/shared/stores/cars/cars.reducer';
import { CarsEffect } from 'src/app/shared/stores/cars/cars.effect';
import { CarAddFormComponent } from './car-add-form/car-add-form.component';
import { CarEditFormComponent } from './car-edit-form/car-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: "", component: CarsTableComponent },
  { path: "add", component: CarAddFormComponent },
  { path: "edit/:id", component: CarEditFormComponent },
];

@NgModule({
  declarations: [
    CarsTableComponent,
    CarAddFormComponent,
    CarEditFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('mycars', carReducer),
    EffectsModule.forFeature([CarsEffect])
  ]
})
export class CarsModule { }
