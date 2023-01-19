import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FakeServerInterceptor} from './modules/fake-server/fake-server.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: FakeServerInterceptor,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
