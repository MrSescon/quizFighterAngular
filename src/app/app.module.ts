import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatSlideToggleModule
 } from '@angular/material';



import { 
        LoginComponent, 
        PreJogoComponent, 
        AdminComponent, 
        PerguntaFormDialogComponent,
        ConfirmarRemoverDialogComponent,
        ConfirmarRestauracaoDialogComponent
      } from './components';
import { AppRoutingModule } from './app-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PreJogoComponent,
    AdminComponent,
    PerguntaFormDialogComponent,
    ConfirmarRemoverDialogComponent,
    ConfirmarRestauracaoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [
    PerguntaFormDialogComponent,
    ConfirmarRemoverDialogComponent,
    ConfirmarRestauracaoDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
