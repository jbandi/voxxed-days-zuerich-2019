import { Component } from '@angular/core';
import { provideWorkbenchActivity } from '@scion/workbench-application.angular';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [provideWorkbenchActivity(ContactListComponent)]
})
export class ContactListComponent {

  constructor() {
  }
}
