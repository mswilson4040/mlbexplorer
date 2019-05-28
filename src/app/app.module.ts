import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreComponent } from './areas/explore/explore/explore.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatIconModule, MatMenuModule,
  MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import { FunctionDialogComponent } from './dialogs/function-dialog/function-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    FunctionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    FunctionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
