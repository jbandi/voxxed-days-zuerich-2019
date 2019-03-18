import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, mergeMapTo, take, tap } from 'rxjs/operators';
import { EMPTY, MonoTypeOperatorFunction, Observable, OperatorFunction, Subject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Contact } from './contact.model';
import { WorkbenchRouter } from '@scion/workbench-application.angular';

const PERSONS_STORAGE_KEY = 'contact.data';

@Injectable()
export class ContactService implements OnDestroy {

  private _destroy$ = new Subject<void>();
  private _contactDictionary$: Observable<ContactDictionary>;
  public contacts$: Observable<Contact[]>;

  constructor(httpClient: HttpClient, private _storage: SessionStorageService, private _router: WorkbenchRouter) {
    this._contactDictionary$ = this._storage.observe$(PERSONS_STORAGE_KEY, () => {
      return httpClient.get<Contact[]>('assets/contact.data.json').pipe(mapToContactDictionary());
    });
    this.contacts$ = this._contactDictionary$.pipe(mapToFilteredContactArray(null))
  }

  public contact$(id: string, options?: { once: boolean }): Observable<Contact> {
    return this._contactDictionary$
      .pipe(
        options && options.once ? take(1) : tap(),
        map(dictionary => dictionary[id]),
        filter(Boolean)
      );
  }

  public create$(contact: Contact): Observable<never> {
    return this._contactDictionary$
      .pipe(
        once(),
        putContact(this._storage, contact),
        mergeMapTo(EMPTY),
      );
  }

  public update$(contact: Contact): Observable<never> {
    return this._contactDictionary$
      .pipe(
        once(),
        putContact(this._storage, contact),
        mergeMapTo(EMPTY),
      );
  }

  public delete$(id: string): Observable<never> {
    return this._contactDictionary$
      .pipe(
        once(),
        deleteContact(this._storage, id),
        tap(() => this._router.navigate({entity: 'contact', id}, {closeIfPresent: true})),
        mergeMapTo(EMPTY),
      );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}

interface ContactDictionary {
  [key: string]: any;
}

function mapToContactDictionary(): OperatorFunction<Contact[], ContactDictionary> {
  return map((contacts: Contact[]): ContactDictionary => {
    return contacts.reduce((acc, contact) => ({...acc, ...{[contact.id]: contact}}), {});
  });
}

function mapToFilteredContactArray(ids: string[]): OperatorFunction<ContactDictionary, Contact[]> {
  return map((dictionary: ContactDictionary): Contact[] => {
    return (ids || Object.keys(dictionary))
      .map(id => dictionary[id])
      .filter(Boolean)
      .reduce((acc, contact) => [...acc, contact], [] as Contact[])
      .sort((p1, p2) => p1.firstname.localeCompare(p2.firstname));
  });
}

function putContact(storage: SessionStorageService, contact: Contact): MonoTypeOperatorFunction<ContactDictionary> {
  return tap((dictionary: ContactDictionary): void => {
    dictionary[contact.id] = contact;
    storage.put(PERSONS_STORAGE_KEY, dictionary);
  });
}

function deleteContact(storage: SessionStorageService, id: string): MonoTypeOperatorFunction<ContactDictionary> {
  return tap((dictionary: ContactDictionary): void => {
    delete dictionary[id];
    storage.put(PERSONS_STORAGE_KEY, dictionary);
  });
}

function once<T>(): MonoTypeOperatorFunction<T> {
  return take(1);
}
