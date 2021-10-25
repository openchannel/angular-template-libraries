export interface SortValue extends SelectModel {
    id: string;
    label: string;
    sort: string;
    customData?: any;
    description: string;
}

export interface Sort {
    id: string;
    name: string;
    description: string;
    values: SortValue[];
}

/**
 * Interface for the item of the [Filter]{@link Filter}. Extends the [Select model]{@link SelectModel}
 * Has new fields:
 *
 * `id: string` - unique id of the item.
 *
 * `label: string` - main text of the item.
 *
 * `sort: string` - sort parameters for sorting the result of an API call.
 *
 * `query: string` - query parameters that used to specify and limit the results returned by the API.
 *
 * `description: string` - description text of the item.
 * @example
 * {
 *     id: "5565322ae4b0a70b13a4563b",
 *     label: "Featured",
 *     sort: "{\"attributes.featured\":-1}",
 *     query: "{\"status.value\":\"approved\",\"attributes.featured\":\"yes\"}"
 *     description: "This is the most featured apps",
 *     checked: false
 * }
 */
export interface FilterValue extends SelectModel {
    id: string;
    label: string;
    sort: string;
    query: string;
    description: string;
}

/**
 * Interface for the filters, by category, for example.
 * Has fields:
 *
 * `id: string` - unique id of the filter.
 *
 * `name: string` - title of the filter.
 *
 * `description: string` - description text of the filter.
 *
 * `values:` {@link FilterValue} - values of the filter.
 * @example
 * {
 *     id: "bgf34jh3498524gjf",
 *     name: "Categories",
 *     description: "Filter for the app categories",
 *     values: [
 *         {
 *             id: "fjh345klf351gb09",
 *             name: "Analytics",
 *             description: "",
 *             values: null,
 *             expanded: false,
 *             checked: false,
 *         },
 *         {
 *             id: "fjh345klf891gb09",
 *             name: "Science",
 *             description: "",
 *         }
 *     ]
 * }
 */
export interface Filter {
    /** unique id of the filter */
    id: string;
    /** title of the filter */
    name: string;
    /** description text of the filter */
    description: string;
    /** values of the filter */
    values: FilterValue[];
}

/**
 * Interface for the selected filter.
 * Has fields:
 *
 * `parentFilterId: string` - unique id of the parent filter.
 *
 * `selectedFilterValue: {@link SidebarValue}` - description text of the selected filter.
 *
 * @example
 * {
 *     parentFilterId: "collections",
 *     selectedFilterValue: {
 *           query: '{"status.value":"approved","attributes.featured":"yes"}',
 *           sort: '{"randomize":1}',
 *           id: 'featured',
 *           label: 'Featured',
 *           description: '',
 *           values: null,
 *           expanded: false,
 *           checked: false,
 *           icon: './assets/icons/analytics-category-icon.png',
 *     },
 * }
 */
export interface SelectedFilter {
    /** unique id of the parent filter */
    parentFilterId: string;
    /** description of the selected filter */
    selectedFilterValue: SidebarValue;
}

/**
 * Interface for the default select.
 * Has fields:
 *
 * `label: string` - label text of the select
 * `checked: boolean` - status that shows selected current item or not
 */
export interface SelectModel {
    /** label text of the select */
    label: string;
    /** status that shows selected current item or not */
    checked: boolean;
}

export class DropdownModel<T> {
    /**
     * Dropdown item label
     */
    label: string;

    /**
     * Dropdown item value with provided in generic type
     */
    value: T;

    constructor(label: string, value: T) {
        this.label = label;
        this.value = value;
    }
}

export interface OcDropdownStatus {
    isCollapsed: boolean;
}

export interface DropdownItemModel {
    label: string;
}
/**
 * Interface for the [Sidebar component]{@link OcSidebarComponent}.
 * Extends the [Filter Value]{@link FilterValue} and [Select model]{@link SelectModel} interfaces.
 * And has new fields:
 *
 * `expanded: boolean` - shows that sidebar filter is expanded or collapsed.
 *
 * `icon: string` - path to the icon near an item of the sidebar.
 * @example
 * {
 *     id: "bgf34jh3498524gjf",
 *     name: "Categories",
 *     description: "Filter for the app categories",
 *     expanded: true,
 *     values: [
 *         {
 *             id: "fjh345klf351gb09",
 *             name: "Analytics",
 *             description: "",
 *             values: null,
 *             expanded: false,
 *             checked: false,
 *             icon: "./assets/icons/analytics-category-icon.png"
 *         },
 *         {
 *             id: "fjh345klf891gb09",
 *             name: "Science",
 *             description: "",
 *             expanded: true,
 *             checked: true,
 *             icon: "https://some-site.com/science.png"
 *             values: [
 *                 {
 *                     id: "fjh345klf891gb09",
 *                     name: "Astronomy ",
 *                     description: "",
 *                     values: null,
 *                     icon: "",
 *                     checked: false
 *                 }
 *             ]
 *         }
 *     ]
 * }
 */
export interface SidebarValue extends FilterValue {
    /** items of the sidebar */
    values: SidebarValue[];
    /** shows that sidebar filter is expanded or collapsed */
    expanded?: boolean;
    /** path to the icon near an item of the sidebar */
    icon?: string;
}

export interface ComponentsPage<T> {
    pages: number;
    count: number;
    pageNumber: number;
    list: T[];
}

export type RadioItemValue = string | number | boolean;

/**
 * Type for the {@link OcButtonType}.
 * Support types:
 * - `primary` - main button
 * - `link` - turns button to the link view
 * - `danger` - applies danger style
 * - `none` - default button
 */
export type OcButtonType = 'primary' | 'secondary' | 'link' | 'danger' | 'none';
