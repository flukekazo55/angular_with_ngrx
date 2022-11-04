import { createAction, props } from '@ngrx/store';
import { Cars } from '../../interfaces/cars';

// START GET ALL
export const invokeCarsAPI = createAction(
  '[Cars API] Invoke Cars Fetch API'
);

export const carsFetchAPISuccess = createAction(
  '[Cars API] Fetch API Success',
  props<{ allCars: Cars[] }>()
);
// END GET ALL

// START INSERT
export const invokeSaveNewCarAPI = createAction(
  '[Cars API] Inovke save new car api',
  props<{ newCar: Cars }>()
);

export const saveNewCarAPISucess = createAction(
  '[Cars API] save new car api success',
  props<{ newCar: Cars }>()
);
// END INSERT

// START UPDATE
export const invokeUpdateCarAPI = createAction(
  '[Cars API] Inovke update car api',
  props<{ updateCar: Cars }>()
);

export const updateCarAPISucess = createAction(
  '[Cars API] update car api success',
  props<{ updateCar: Cars }>()
);
// END UPDATE

// START DELETE
export const invokeDeleteCarAPI = createAction(
  '[Cars API] Inovke delete car api',
  props<{ id: number }>()
);

export const deleteCarAPISuccess = createAction(
  '[Cars API] deleted car api success',
  props<{ id: number }>()
);
// END DELETE