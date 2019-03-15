import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SciViewportModule } from '@scion/viewport';
import { WorkbenchApplicationModule } from '@scion/workbench-application.angular';
import { ContactActivityComponent } from './contact-activity/contact-activity.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactNewPopupComponent } from './contact-new-popup/contact-new-popup.component';
import { ContactService } from './contact.service';
import { VoxFilterFieldComponent } from './vox-filter-field/filter-field.component';
import { VoxListComponent } from './vox-list/list.component';
import { VoxListItemComponent } from './vox-list/list-item/list-item.component';
import { VoxListItemDirective } from './vox-list/list-item.directive';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    ContactActivityComponent,
    ContactViewComponent,
    ContactNewPopupComponent,
    VoxFilterFieldComponent,
    VoxListComponent,
    VoxListItemComponent,
    VoxListItemDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SciViewportModule,
    ReactiveFormsModule,
    HttpClientModule,
    WorkbenchApplicationModule.forRoot(),
    A11yModule,
    ContactRoutingModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {
}