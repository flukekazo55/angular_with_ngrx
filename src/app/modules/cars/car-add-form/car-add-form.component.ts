import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/stores/appstate';
import { invokeSaveNewCarAPI } from 'src/app/shared/stores/cars/cars.action';
import { selectAppState } from 'src/app/shared/stores/app.selector';
import { setAPIStatus } from 'src/app/shared/stores/app.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-add-form',
  templateUrl: './car-add-form.component.html',
  styleUrls: ['./car-add-form.component.scss']
})
export class CarAddFormComponent implements OnInit {
  carForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
  ) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.carForm = this.fb.group({
      id: [0],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      price: [null, Validators.required],
    });
  }

  insert() {
    if (this.carForm.valid) {
      this.store.dispatch(invokeSaveNewCarAPI({ newCar: this.carForm.value }));
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
