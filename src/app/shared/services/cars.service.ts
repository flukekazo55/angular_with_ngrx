import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cars } from '../interfaces/cars';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Cars[]>("http://localhost:3000/cars");
  }

  getById(id: number) {
    return this.http.get<Cars>(`http://localhost:3000/cars/${id}`);
  }

  insert(car: Cars) {
    return this.http.post<Cars>("http://localhost:3000/cars/", car);
  }

  update(car: Cars) {
    return this.http.put<Cars>(`http://localhost:3000/cars/${car.id}`, car);
  }

  delete(id: number) {
    return this.http.delete<Cars>(`http://localhost:3000/cars/${id}`);
  }
}
