import { Component, OnDestroy } from '@angular/core';
import { provideWorkbenchPopup, UUID, WorkbenchPopup, WorkbenchRouter } from '@scion/workbench-application.angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { noop, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from '../contact.model';

const FIRSTNAME = 'firstname';
const LASTNAME = 'lastname';
const STREET = 'street';
const CITY = 'city';
const EMAIL = 'email';
const PHONE = 'phone';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss'],
  providers: [
    provideWorkbenchPopup(ContactNewComponent)
  ]
})
export class ContactNewComponent implements OnDestroy {

  public readonly FIRSTNAME = FIRSTNAME;
  public readonly LASTNAME = LASTNAME;
  public readonly STREET = STREET;
  public readonly CITY = CITY;
  public readonly EMAIL = EMAIL;
  public readonly PHONE = PHONE;

  private _destroy$ = new Subject<void>();
  public form: FormGroup;

  constructor(private _popup: WorkbenchPopup,
              private _contactService: ContactService,
              private _router: WorkbenchRouter,
              formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      [FIRSTNAME]: formBuilder.control('', Validators.required),
      [LASTNAME]: formBuilder.control('', Validators.required),
      [STREET]: formBuilder.control('', Validators.required),
      [CITY]: formBuilder.control('', Validators.required),
      [EMAIL]: formBuilder.control('', Validators.email),
      [PHONE]: formBuilder.control(''),
    });
  }

  public onOk(): void {
    const contact: Contact = {
      id: UUID.randomUUID(),
      firstname: this.form.get(FIRSTNAME).value,
      lastname: this.form.get(LASTNAME).value,
      street: this.form.get(STREET).value,
      city: this.form.get(CITY).value,
      email: this.form.get(EMAIL).value,
      phone: this.form.get(PHONE).value,
    };

    this._contactService.create$(contact)
      .pipe(takeUntil(this._destroy$))
      .subscribe(noop, noop, () => {
        this._router.navigate({'entity': 'contact', 'id': contact.id});
        this._popup.close();
      });
  }

  public onClose(): void {
    this._popup.close();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
