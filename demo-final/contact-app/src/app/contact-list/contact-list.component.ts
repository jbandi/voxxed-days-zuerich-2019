import { Component } from '@angular/core';
import { provideWorkbenchActivity } from '@scion/workbench-application.angular';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [provideWorkbenchActivity(ContactListComponent)]
})
export class ContactListComponent {

  constructor(public contactService: ContactService) {
  }
}
