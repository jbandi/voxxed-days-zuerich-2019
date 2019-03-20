import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { provideWorkbenchView, WorkbenchView } from '@scion/workbench-application.angular';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [provideWorkbenchView(ContactComponent)]
})
export class ContactComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  public contact: Contact;

  constructor(route: ActivatedRoute, private contactService: ContactService, view: WorkbenchView) {
    route.params
      .pipe(
        switchMap(params => this.contactService.contact$(params['id'])),
        takeUntil(this.destroy$),
      )
      .subscribe(contact => {
        this.contact = contact;
        view.title = contact.firstname + ' ' + contact.lastname;
      });
  }

  public onSave(): void {
    this.contactService.update$(this.contact).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
