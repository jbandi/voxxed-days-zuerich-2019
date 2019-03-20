import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: 'contacts', component: ContactListComponent},
  {path: 'contacts/new', component: ContactNewComponent},
  {path: 'contacts/:id', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
