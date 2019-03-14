import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactActivityComponent } from './contact-activity/contact-activity.component';
import { ContactNewPopupComponent } from './contact-new-popup/contact-new-popup.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

const routes: Routes = [
  {path: 'contacts', component: ContactActivityComponent},
  {path: 'contacts/new', component: ContactNewPopupComponent},
  {path: 'contacts/:id', component: ContactViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
