import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({selector: 'ng-template[voxListItem]'})
export class VoxListItemDirective {

  private _actionTemplates: TemplateRef<void>[] = [];

  /**
   * Optional key to identify this item and is used to emit selection and internally as key for the {TrackBy} function.
   */
  @Input()
  public key: string;

  /**
   * Provide template(s) to be rendered as actions of this list item.
   */
  @Input()
  public set actions(actions: TemplateRef<void> | TemplateRef<void>[]) {
    this._actionTemplates = (Array.isArray(actions) ? actions : actions && [actions] || []);
  }

  constructor(public readonly template: TemplateRef<void>) {
  }

  public get actionTemplates(): TemplateRef<void>[] {
    return this._actionTemplates;
  }
}
