export interface CountriesModel {
    data: CountryModel[];
    error: boolean;
    message: string;
}

export interface StatesModel {
    data: any;
    error: boolean;
    message: string;
}

export interface CountryModel {
    name: string;
    Iso2: string;
}
