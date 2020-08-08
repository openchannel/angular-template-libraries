import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcCommonLibModule, OcMenuGridComponent } from 'projects/oc-ng-common-component/src/public-api';
import { SellerAppsWrapper } from 'oc-ng-common-service';

const modules = {
    imports: [OcCommonLibModule]
};

const sellerAppsWrapper = new SellerAppsWrapper();
const app1 = {
    "allow": {
      
    },
    "parent": {
      
    },
    "isLatestVersion": true,
    "access": [
      
    ],
    "created": 1596120465186,
    "customData": {
      "summary": "",
      "website-url": null,
      "product-images": null,
      "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png",
      "category": [
        "category"
      ],
      "video-url": null
    },
    "type": "default",
    "restrict": {
      
    },
    "version": 1,
    "prettyStatus": "In Development",
    "lastUpdated": 1596283616983,
    "isLive": false,
    "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
    "appId": "5f22dd91b5ad376fff8431a7",
    "name": "FirstApp",
    "attributes": {
      
    },
    "model": [
      {
        "license": "single",
        "modelId": "5f22dd91b5ad376fff8431a6",
        "price": 0,
        "currency": "USD",
        "type": "free",
        "trial": 0
      }
    ],
    "safeName": [
      "firstapp"
    ],
    "status": {
      "lastUpdated": 1596120465202,
      "value": "inDevelopment"
    }
  };


  const app3 = {
      "allow": {
        
      },
      "parent": {
        
      },
      "isLatestVersion": true,
      "access": [
        
      ],
      "created": 1596121825148,
      "customData": {
        "summary": "",
        "website-url": null,
        "product-images": null,
        "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255ab1ec4ad046ff9edaa2.png",
        "category": [
          "Cat1"
        ],
        "video-url": null
      },
      "type": "default",
      "restrict": {
        
      },
      "version": 1,
      "prettyStatus": "In Development",
      "lastUpdated": 1596283571928,
      "isLive": false,
      "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
      "appId": "5f22e2e1ec4ad046ff9e5968",
      "name": "SecondApp",
      "attributes": {
        
      },
      "model": [
        {
          "license": "single",
          "modelId": "5f22e2e1ec4ad046ff9e5967",
          "price": 0,
          "currency": "USD",
          "type": "free",
          "trial": 0
        }
      ],
      "safeName": [
        "secondapp"
      ],
      "status": {
        "lastUpdated": 1596121825153,
        "value": "inDevelopment"
      }
    };

    const app2 = {
        "allow": {
          
        },
        "parent": {
          
        },
        "isLatestVersion": true,
        "access": [
          
        ],
        "created": 1596121825148,
        "customData": {
          "summary": "",
          "website-url": null,
          "product-images": null,
          "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255ab1ec4ad046ff9edaa2.png",
          "category": [
            "Cat1"
          ],
          "video-url": null
        },
        "type": "default",
        "restrict": {
          
        },
        "version": 1,
        "prettyStatus": "In Development",
        "lastUpdated": 1596283571928,
        "isLive": false,
        "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
        "appId": "5f22e2e1ec4ad046ff9e5968",
        "name": "SecondApp",
        "attributes": {
          
        },
        "model": [
          {
            "license": "single",
            "modelId": "5f22e2e1ec4ad046ff9e5967",
            "price": 0,
            "currency": "USD",
            "type": "free",
            "trial": 0
          }
        ],
        "safeName": [
          "secondapp"
        ],
        "status": {
          "lastUpdated": 1596121825153,
          "value": "inDevelopment"
        }
      };


    sellerAppsWrapper.list = [];
    sellerAppsWrapper.list = [app1,app2, app3];

storiesOf('App Data Grid', module)
    .addDecorator(withA11y)
    .add('App grid', () => ({
        component: OcMenuGridComponent,
        props: {
            appList: sellerAppsWrapper,
            menuUrl: "http://localhost:4200/assets/img/dots-hr-icon.svg",
            sortIcon: "http://localhost:4200/assets/img/dropdown-icon.svg"
        },
        moduleMetadata: modules
    }));