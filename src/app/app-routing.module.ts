import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {ChatbotComponent} from './chatbot/chatbot.component';
import {EditImageComponent} from "./edit-image/edit-image.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'chatbot', component: ChatbotComponent},
  {path: 'edit-image', component: EditImageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

export const routedComponents = [HeaderComponent, HomeComponent];
