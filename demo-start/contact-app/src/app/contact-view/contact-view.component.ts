import { Component } from '@angular/core';
import { provideWorkbenchView } from '@scion/workbench-application.angular';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  providers: [provideWorkbenchView(ContactViewComponent)]
})
export class ContactViewComponent {

  constructor() {
  }
}
