import { SellerAppCustomDataModel } from './seller-app-custom-data-model';

export class SellerAppDetailsModel{
    appId:string;
    name: string;
    version: number;
    customData: SellerAppCustomDataModel=new SellerAppCustomDataModel();
}