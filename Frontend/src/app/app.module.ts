import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/store/todo.effects';
import { todoReducer } from './todo/store/todo.reducers';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./todo/todo.module')).TodoModule,
  },
  { path: '**', redirectTo: '/' },

]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ todos: todoReducer }, {}),
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3 * 1000,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
