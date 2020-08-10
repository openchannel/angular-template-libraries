import { SellerAppCustomDataModel } from './seller-app-custom-data-model';

export class SellerAppDetailsModel{
    appId:string;
    name: string;
    customData: SellerAppCustomDataModel=new SellerAppCustomDataModel();
}