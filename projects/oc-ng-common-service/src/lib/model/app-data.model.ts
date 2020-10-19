import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface AppModel {
  type: string;
  price: number;
  trial: number;
  license: string;
  modelId: string;
  currency: string;
}

export interface Restrict {
  own: {
    country: string[];
  };
  view: {
    country: string[];
  };
}

export interface AppStatus {
  value: string;
  lastUpdated: number;
  modifiedBy: string;
  reason: string;
}

export interface StatElement {
  '90day': number;
  '30day': number;
  total: number;
}

export interface Statistics {
  views: StatElement;
  downloads: StatElement;
  developerSales: StatElement;
  totalSales: StatElement;
  ownerships: StatElement;
  reviews: StatElement;
}

export interface CustomDataAppConfig {
  icon: string;
  summary: string;
  description: string;
  video: string;
  images: string;
  categories: string;
  author: string;
}

export class FullAppData {
  appId: string;
  customData?: any;
  icon: SafeResourceUrl | string;
  summary: string;
  description: string;
  video: SafeResourceUrl | string;
  images: SafeResourceUrl [] | string[];
  categories: string [];
  author: string;
  lastUpdated: Date;
  version: number;
  name: string;
  safeName: string[];
  developerId: string;
  model: AppModel[];
  access?: string[];
  restrict?: Restrict;
  allow?: Restrict;
  submittedDate: Date;
  created: Date;
  attributes?: any;
  rating: number;
  status: AppStatus;
  statistics: Statistics;
  isLive: boolean;

  /**
   * Create a class for app data with all necessary fields
   * @param appData app data from request
   * @param customDataConfig config for customData fields name information
   */
  constructor(appData,
              customDataConfig: CustomDataAppConfig) {
    this.appId = appData.appId;
    this.lastUpdated = appData.lastUpdated;
    this.version = appData.version;
    this.name = appData.name;
    this.safeName = appData.safeName;
    this.developerId = appData.developerId;
    this.model = appData.model;
    this.access = appData.access || [];
    this.restrict = appData.restrict || {};
    this.allow = appData.allow || {};
    this.submittedDate = appData.submittedDate;
    this.created = appData.created;
    this.attributes = appData.attributes || {};
    this.rating = appData.rating;
    this.status = appData.status;
    this.statistics = appData.statistics;
    this.isLive = appData.isLive;
    // custom data mapping
    this.icon = appData.customData[customDataConfig.icon] || '';
    this.summary = appData.customData[customDataConfig.summary] || '';
    this.description = appData.customData[customDataConfig.description] || '';
    this.video = appData.customData[customDataConfig.video] || '';
    this.images = appData.customData[customDataConfig.images] || [];
    this.categories = appData.customData[customDataConfig.categories] || [];
    this.author = appData.customData[customDataConfig.author] || '';
  }
}
