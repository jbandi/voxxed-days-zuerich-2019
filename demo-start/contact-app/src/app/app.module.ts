import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SciViewportModule } from '@scion/viewport';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactService } from './contact.service';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactComponent,
    ContactNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SciViewportModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    A11yModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
