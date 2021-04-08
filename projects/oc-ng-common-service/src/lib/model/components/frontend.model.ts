import {MetaDefinition} from '@angular/platform-browser';

export interface SortValue extends SelectModel{
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

export interface FilterValue extends SelectModel {
    id: string;
    label: string;
    sort: string;
    query: string;
    description: string;
}

export interface Filter {
    id: string;
    name: string;
    description: string;
    values: FilterValue[];
}

export interface SelectModel {
    label: string;
    checked: boolean;
}

export class DropdownModel<T> {
    label: string;
    value: T;

    constructor(label: string, value: T) {
        this.label = label;
        this.value = value;
    }
}

export interface SidebarValue extends FilterValue {
    values: SidebarValue [];
    expanded?: boolean;
}

export interface SiteConfig {
    title: string;
    tagline?: string;
    metaTags?: MetaDefinition [];
    favicon?: {
        href: string;
        type?: string;
    };
}
