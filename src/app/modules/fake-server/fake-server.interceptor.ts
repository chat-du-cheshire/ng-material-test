import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, delay, Observable, of } from 'rxjs';
import { EMPLOYEES, TIMINGS } from './constants';

const API: Record<string, any> = {
  employees: EMPLOYEES,
  timings: TIMINGS,
};

@Injectable({ providedIn: 'root' })
export class FakeServerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(new HttpResponse({ body: API[req.url], status: 200 })).pipe(
          delay(getRandomDelay(300, 500))
        );
      })
    );
  }
}

function getRandomDelay(from: number, to: number) {
  return from + Math.round(Math.random() * (to - from));
}
