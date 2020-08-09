import { FileDetails } from './file-details-model';

export class SellerAppCustomDataModel{
    category:string[]=[];
    website__url: string;
    video__url: string;
    summary: string;
    icon: string;
    icon__file:FileDetails;
    product__images: string[]=[];
    product__image__file:FileDetails[];
}