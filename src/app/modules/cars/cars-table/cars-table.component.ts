import { Component, OnInit } from '@angular/core';

// STORE
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/stores/app.action';
import { selectAppState } from 'src/app/shared/stores/app.selector';
import { Appstate } from 'src/app/shared/stores/appstate';
import { invokeCarsAPI, invokeDeleteCarAPI } from 'src/app/shared/stores/cars/cars.action';
import { selectCars } from 'src/app/shared/stores/cars/cars.selector';

declare var window: any;

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent implements OnInit {
  deleteModal: any;
  deleteId: number = null;

  constructor(private store: Store, private appStore: Store<Appstate>) { }

  carList = this.store.pipe(select(selectCars));

  ngOnInit(): void {
    this.store.dispatch(invokeCarsAPI());
    // DELETE MODAL
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
  }

  deleteDialog(id) {
    this.deleteId = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteCarAPI({
        id: this.deleteId,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();

        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
