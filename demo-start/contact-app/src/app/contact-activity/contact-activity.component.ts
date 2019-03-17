import { Component } from '@angular/core';
import { provideWorkbenchActivity } from '@scion/workbench-application.angular';

@Component({
  selector: 'app-contact-activity',
  templateUrl: './contact-activity.component.html',
  styleUrls: ['./contact-activity.component.scss'],
  providers: [provideWorkbenchActivity(ContactActivityComponent)]
})
export class ContactActivityComponent {

  constructor() {
  }
}
