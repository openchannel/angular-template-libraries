import { SortField } from '../oc-menu-user-grid/oc-menu-user-grid.component';
/**
 * Config for setting current sort icon direction (up or down). Used in {@link OcMenuUserGridComponent#sortOptions}.
 *
 * Values:<br>
 *   -1 => sort icon to down.<br>
 *   null => sort icon to down.<br>
 *   1 => sort icon to up.<br>
 */
export type UserGridSortOrder = {
  [name in SortField]: 1 | -1 | null;
}

/** New sort config, after click by sort icon. Used in {@link OcMenuUserGridComponent#sortOptionsChosen}*/
export type UserSortChosen = {
  /** New sort config. */
  sortOptions: UserGridSortOrder,
  /** Updated column ID. */
  changedSortOption: SortField
}
