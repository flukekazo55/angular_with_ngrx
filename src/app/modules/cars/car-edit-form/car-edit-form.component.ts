import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { Cars } from 'src/app/shared/interfaces/cars';
import { setAPIStatus } from 'src/app/shared/stores/app.action';
import { selectAppState } from 'src/app/shared/stores/app.selector';
import { Appstate } from 'src/app/shared/stores/appstate';
import { invokeSaveNewCarAPI, invokeUpdateCarAPI } from 'src/app/shared/stores/cars/cars.action';
import { selectCarById } from 'src/app/shared/stores/cars/cars.selector';

@Component({
  selector: 'app-car-edit-form',
  templateUrl: './car-edit-form.component.html',
  styleUrls: ['./car-edit-form.component.scss']
})
export class CarEditFormComponent implements OnInit {
  carForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
  ) { }


  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectCarById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.createForm(data);
      }
      else {
        this.router.navigate(['/']);
      }
    });

  }

  createForm(car: Cars) {
    this.carForm = this.fb.group({
      id: [car.id],
      brand: [car.brand, Validators.required],
      model: [car.model, Validators.required],
      price: [car.price, Validators.required],
    });
  }

  insert() {
    if (this.carForm.valid) {
      this.store.dispatch(
        invokeUpdateCarAPI({ updateCar: { ...this.carForm.value } })
      );
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          );
          this.router.navigate(['/']);
        }
      });
    } else {
      this.carForm.markAllAsTouched();
    }
  }
}
