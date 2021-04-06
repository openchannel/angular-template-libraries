export class SellerMyProfile{
    developer: DeveloperDetailsModel= new DeveloperDetailsModel();
    developerAccount: DeveloperDetailsModel= new DeveloperDetailsModel();
    email: string;
}

export class ChnagePasswordModel{
    email: string;
    password: string;
    newPassword: string;
}

export class DeveloperDetailsModel{
    email: string;
    name: string;
    customData: any;
}