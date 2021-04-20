import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  count = 0;
  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // getting the app_id and app_key through environment
    const app_id = environment.app_id;
    const app_key = environment.app_key;

    // show loader
    this.spinner.show();
    this.count++;
    request = request.clone({
      url: (request.url.includes('?') ? request.url : request.url + '?') + 'app_id=' + app_id + '&app_key=' + app_key
    });
    return next.handle(request)
      .pipe(tap(
        event => console.log(event),
        error => console.log(error)
      ), finalize(() => {
        this.count--;
        //hide loader after request completed 
        if (this.count == 0) this.spinner.hide();
      })
    );
  }
}
