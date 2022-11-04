import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { CarsService } from '../../services/cars.service';
import { setAPIStatus } from '../app.action';
import { Appstate } from '../appstate';
import { invokeCarsAPI, carsFetchAPISuccess, invokeSaveNewCarAPI, saveNewCarAPISucess, invokeUpdateCarAPI, updateCarAPISucess, deleteCarAPISuccess, invokeDeleteCarAPI } from './cars.action';
import { selectCars } from './cars.selector';
 
@Injectable()
export class CarsEffect {
  constructor(
    private store: Store,
    private actions$: Actions,
    private carsService: CarsService,
    private appStore: Store<Appstate>
  ) {}
 
  loadAllCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeCarsAPI),
      withLatestFrom(this.store.pipe(select(selectCars))),
      mergeMap(([, carformStore]) => {
        if (carformStore.length > 0) {
          return EMPTY;
        }
        return this.carsService
          .getAll()
          .pipe(map((data) => carsFetchAPISuccess({ allCars: data })));
      })
    )
  );

  saveNewCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewCarAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.carsService.insert(action.newCar).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewCarAPISucess({ newCar: data });
          })
        );
      })
    );
  });

  updateCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateCarAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.carsService.update(action.updateCar).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateCarAPISucess({ updateCar: data });
          })
        );
      })
    );
  });

  deleteCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteCarAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.carsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteCarAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
