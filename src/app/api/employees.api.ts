import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { IEmployeeDto } from '../types/dto';

@Injectable({ providedIn: 'root' })
export class EmployeesApi {
  constructor(private readonly http: HttpClient) {}

  get() {
    return this.http.get<IEmployeeDto[]>('employees');
  }
}
