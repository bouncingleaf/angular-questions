import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionEditPageComponent } from './question-edit/question-edit-page/question-edit-page.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionListPageComponent } from './question-list/question-list-page/question-list-page.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: QuestionListPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'new', component: QuestionEditPageComponent },
  { path: 'edit/:id', component: QuestionEditPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    HeaderComponent,
    QuestionEditComponent,
    QuestionEditPageComponent,
    QuestionListComponent,
    QuestionListPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
