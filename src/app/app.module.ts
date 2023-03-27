import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './column/column.component';
import { ModalComponent } from './modal/modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    ModalComponent,
    TaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  entryComponents: [ TaskModalComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
