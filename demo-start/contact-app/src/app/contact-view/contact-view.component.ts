import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ContactService } from '../contact.service';
import { provideWorkbenchView, WorkbenchRouter, WorkbenchView } from '@scion/workbench-application.angular';
import { Contact } from '../contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const FIRSTNAME = 'firstname';
const LASTNAME = 'lastname';
const STREET = 'street';
const CITY = 'city';
const EMAIL = 'email';
const PHONE = 'phone';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  providers: [
    provideWorkbenchView(ContactViewComponent)
  ]
})
export class ContactViewComponent implements OnDestroy {

  public readonly FIRSTNAME = FIRSTNAME;
  public readonly LASTNAME = LASTNAME;
  public readonly STREET = STREET;
  public readonly CITY = CITY;
  public readonly EMAIL = EMAIL;
  public readonly PHONE = PHONE;

  private _destroy$ = new Subject<void>();

  public form: FormGroup;
  public contact: Contact;

  constructor(route: ActivatedRoute,
              private _contactService: ContactService,
              private _view: WorkbenchView,
              private _router: WorkbenchRouter,
              formBuilder: FormBuilder) {
    this._view.heading = 'Contact';
    this.form = new FormGroup({
      [FIRSTNAME]: formBuilder.control('', Validators.required),
      [LASTNAME]: formBuilder.control('', Validators.required),
      [STREET]: formBuilder.control('', Validators.required),
      [CITY]: formBuilder.control('', Validators.required),
      [EMAIL]: formBuilder.control('', Validators.email),
      [PHONE]: formBuilder.control(''),
    });

    route.params
      .pipe(
        map(params => params['id']),
        distinctUntilChanged(),
        switchMap(id => this.load$(id)),
        takeUntil(this._destroy$),
      )
      .subscribe();

    this.form.statusChanges
      .pipe(
        filter(() => this.form.valid),
        switchMap(() => this.store$()),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  private load$(contactId: string): Observable<any> {
    return this._contactService.contact$(contactId).pipe(tap((contact: Contact) => {
        this.contact = contact;
        this._view.title = `${this.contact.firstname} ${this.contact.lastname}`;
        this.form.controls[FIRSTNAME].setValue(contact.firstname, {emitEvent: false});
        this.form.controls[LASTNAME].setValue(contact.lastname, {emitEvent: false});
        this.form.controls[STREET].setValue(contact.street, {emitEvent: false});
        this.form.controls[CITY].setValue(contact.city, {emitEvent: false});
        this.form.controls[EMAIL].setValue(contact.email, {emitEvent: false});
        this.form.controls[PHONE].setValue(contact.phone, {emitEvent: false});
      })
    );
  }

  private store$(): Observable<any> {
    return this._contactService.update$({
      id: this.contact.id,
      firstname: this.form.controls[FIRSTNAME].value,
      lastname: this.form.controls[LASTNAME].value,
      street: this.form.controls[STREET].value,
      city: this.form.controls[CITY].value,
      email: this.form.controls[EMAIL].value,
      phone: this.form.controls[PHONE].value,
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
