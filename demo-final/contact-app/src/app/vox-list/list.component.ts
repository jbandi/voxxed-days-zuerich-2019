import { AfterViewInit, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, QueryList, TrackByFunction, ViewChild, ViewChildren } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { VoxListItemDirective } from './list-item.directive';
import { VoxListItemComponent } from './list-item/list-item.component';
import { VoxFilterFieldComponent } from '../vox-filter-field/filter-field.component';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vox-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class VoxListComponent implements AfterViewInit, OnDestroy {

  private _focusKeyManager: FocusKeyManager<VoxListItemComponent>;
  private _destroy$ = new Subject<void>();

  /**
   * Specifies where to position the filter field.
   */
  @Input()
  public filterPosition: 'top' | 'bottom' = 'top';

  /**
   * Sets focus order in sequential keyboard navigation.
   * If not specified, the focus order is according to the position in the document (tabindex=0).
   */
  @Input()
  public tabindex = 0;

  /**
   * Emits filter text on filter change.
   */
  @Output()
  public filter = new EventEmitter<string>();

  /**
   * Emits selected item key on selection change.
   */
  @Output()
  public selection = new EventEmitter<string>();

  @ContentChildren(VoxListItemDirective)
  public listItems: QueryList<VoxListItemDirective>;

  @ViewChildren(VoxListItemComponent)
  private _listItemComponents: QueryList<VoxListItemComponent>;

  @ViewChild(VoxFilterFieldComponent)
  private _filterField: VoxFilterFieldComponent;

  @HostBinding('attr.tabindex')
  public componentTabindex = -1; // component itself is not focusable in sequential keyboard navigation, but tabindex (if any) set to filter field

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    this._focusKeyManager.onKeydown(event);
  }

  @HostListener('focus')
  public focus(): void {
    this._filterField.focus();
  }

  public ngAfterViewInit(): void {
    this._focusKeyManager = new FocusKeyManager(this._listItemComponents);
    this._focusKeyManager.change
      .pipe(
        map(index => this.listItems.toArray()[index]),
        filter(Boolean),
        takeUntil(this._destroy$)
      )
      .subscribe((listItem: VoxListItemDirective) => {
        this.selection.emit(listItem.key);
      });
  }

  public onItemClick(item: VoxListItemComponent): void {
    this._focusKeyManager.setActiveItem(item);
  }

  public onFilter(filterText: string): void {
    this._focusKeyManager.setActiveItem(-1);
    this.filter.emit(filterText);
  }

  public onAnyKey(event: KeyboardEvent): void {
    this._filterField.onKeydown(event);
  }

  public get activeItem(): VoxListItemComponent {
    return this._focusKeyManager && this._focusKeyManager.activeItem;
  }

  public trackByFn: TrackByFunction<VoxListItemDirective> = (index: number, item: VoxListItemDirective): any => {
    return item.key || item;
  };

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
