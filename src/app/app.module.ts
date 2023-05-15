import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {routedComponents, AppRoutingModule} from './app-routing.module';
import {ChatbotComponent} from './chatbot/chatbot.component';

@NgModule({
  declarations: [AppComponent, routedComponents, ChatbotComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
