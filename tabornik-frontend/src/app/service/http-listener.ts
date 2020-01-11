import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import {HTTPStatus} from './http-status';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HTTPListener implements HttpInterceptor {
    constructor(private status: HTTPStatus) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(event => {
                this.status.setHttpStatus(true);
                return event;
            }),
            finalize(() => {
                this.status.setHttpStatus(false);
            })
        );
    }
}
