import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoComponent} from './demo/demo.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {ChatbotComponent} from './chatbot/chatbot.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'demo', component: DemoComponent},
  {path: 'chatbot', component: ChatbotComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

export const routedComponents = [HeaderComponent, HomeComponent, DemoComponent, HeaderComponent];
