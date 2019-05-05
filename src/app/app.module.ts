import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuestionComponent } from './question-list/question-list.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionService } from './services/question.service';
import { QuestionEffects } from './store/effects/question.effects';
import { appReducers } from './store/reducers/app.reducers';

const routes: Routes = [
  { path: '', component: QuestionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'new', component: QuestionEditComponent },
  { path: 'edit/:id', component: QuestionEditComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    HeaderComponent,
    QuestionComponent,
    QuestionEditComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([QuestionEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router'})
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
