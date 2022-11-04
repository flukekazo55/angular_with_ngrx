import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cars } from '../../interfaces/cars';

export const selectCars = createFeatureSelector<Cars[]>('mycars');

export const selectCarById = (id: number) =>
    createSelector(selectCars, (cars: Cars[]) => {
        var carbyId = cars.filter((_) => _.id == id);
        if (carbyId.length == 0) {
            return null;
        }
        return carbyId[0];
    });