import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { VoxListItemDirective } from '../list-item.directive';

@Component({
  selector: 'vox-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class VoxListItemComponent implements FocusableOption {

  @Input()
  public listItem: VoxListItemDirective;

  @HostBinding('class.active')
  @Input()
  public active: boolean;

  @HostBinding('attr.disabled')
  public disabled: boolean;

  @HostBinding('attr.tabindex')
  public tabindex = -1;

  constructor(private _host: ElementRef<HTMLElement>) {
  }

  public focus(origin?: FocusOrigin): void {
    this._host.nativeElement.focus();
  }
}
