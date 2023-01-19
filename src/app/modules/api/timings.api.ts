import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITimingDto } from '../types/dto';

@Injectable({ providedIn: 'root' })
export class TimingsApi {
  constructor(private readonly http: HttpClient) {}

  get() {
    return this.http.get<ITimingDto[]>('timings');
  }
}
