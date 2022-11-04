import { createReducer, on } from "@ngrx/store";
import { Cars } from "../../interfaces/cars";
import { carsFetchAPISuccess, deleteCarAPISuccess, saveNewCarAPISucess, updateCarAPISucess } from "./cars.action";

export const initialState: ReadonlyArray<Cars> = [];

export const carReducer = createReducer(
    initialState,
    // GET ALL
    on(carsFetchAPISuccess, (state, { allCars }) => {
        return allCars;
    }),
    // INSERT
    on(saveNewCarAPISucess, (state, { newCar }) => {
        let newState = [...state];
        newState.unshift(newCar);
        return newState;
    }),
    // UPDATE
    on(updateCarAPISucess, (state, { updateCar }) => {
        let newState = state.filter((_) => _.id != updateCar.id);
        newState.unshift(updateCar);
        return newState;
    }),
    // DELETE
    on(deleteCarAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _.id != id);
        return newState;
    })
);