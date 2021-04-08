import {AppModel} from './app-data-model';

/**
 * representation of the ownership relationship between a user and an app
 */
export interface OwnershipModel {
  ownershipId: string;
  date: Date;
  appId: string;
  userId: string;
  developerId: string;
  ownershipType: string | 'full' | 'subscription' | 'trial';
  ownershipStatus: string | 'pending' | 'active' | 'uninstalled' | 'cancelled';
  uninstallDate?: Date;
  expires?: Date;
  model: AppModel;
  customData?: any;
}


export interface CreateOwnershipModel {
  appId: string;
  modelId: string;
}
