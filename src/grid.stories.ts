import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppListGridComponent,
  OcCommonLibModule,
  OcMenuGridComponent
} from 'projects/oc-ng-common-component/src/public-api';
import {SellerAppsWrapper} from 'oc-ng-common-service';

const modules = {
  imports: [OcCommonLibModule]
};

let application = new SellerAppsWrapper();
application.list = [{
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596120465186,
  "customData": {
    "summary": "",
    "website-url": null,
    "product-images": null,
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png",
    "category": ["category"],
    "video-url": null
  },
  "type": "default",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596283616983,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f22dd91b5ad376fff8431a7",
  "name": "FirstApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f22dd91b5ad376fff8431a6",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["firstapp"],
  "status": {
    "lastUpdated": 1596120465202,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596121825148,
  "customData": {
    "summary": "",
    "website-url": null,
    "product-images": null,
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255ab1ec4ad046ff9edaa2.png",
    "category": ["Cat1"],
    "video-url": null
  },
  "type": "default",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596283571928,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f22e2e1ec4ad046ff9e5968",
  "name": "SecondApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f22e2e1ec4ad046ff9e5967",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["secondapp"],
  "status": {
    "lastUpdated": 1596121825153,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596122025249,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": null,
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255af8b5ad376fff84b6d2.png",
    "category": ["Cat1"],
    "video-url": "http://www.google.com"
  },
  "type": "default",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596283642040,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f22e3a9ec4ad046ff9e59ec",
  "name": "ThirdApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f22e3a9ec4ad046ff9e59eb",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["thirdapp"],
  "status": {
    "lastUpdated": 1596122025252,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596157320542,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": null,
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255b3cec4ad046ff9edab5.png",
    "category": ["Cat1"],
    "video-url": "http://www.google.com"
  },
  "type": "default",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596283711451,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f236d88b5ad376fff84613b",
  "name": "ForthApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f236d88b5ad376fff84613a",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["forthapp"],
  "status": {
    "lastUpdated": 1596157320545,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {
    "status": {
      "lastUpdated": 1596797675178,
      "reason": "",
      "modifiedBy": "administrator",
      "value": "suspended"
    }
  },
  "isLatestVersion": true,
  "access": [],
  "created": 1596157421014,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": null,
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255992b5ad376fff84b6a6.png",
    "category": ["Cat1"],
    "video-url": "http://www.google.com"
  },
  "type": "default",
  "restrict": {},
  "submittedDate": 1596781554341,
  "version": 1,
  "prettyStatus": "Approved",
  "lastUpdated": 1596283284364,
  "isLive": true,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f236dedec4ad046ff9e855e",
  "name": "FifthApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f236dedec4ad046ff9e855d",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["fifthapp"],
  "status": {
    "lastUpdated": 1596781554361,
    "reason": "",
    "modifiedBy": "administrator",
    "value": "approved"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596157494810,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255a18ec4ad046ff9eda8e.png",
    "category": ["Cat1"],
    "video-url": "http://www.google.com"
  },
  "type": "default",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596283419758,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f236e36b5ad376fff84614c",
  "name": "SixthApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f236e36b5ad376fff84614b",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["sixthapp"],
  "status": {
    "lastUpdated": 1596157494813,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596157547623,
  "customData": {
    "summary": "this isb long text edit <b>bold<b>",
    "website-url": "http://www.google11.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg",
    "category": ["Cat1", "Cat2", "CAT3"],
    "video-url": "http://www.google123.com"
  },
  "type": "informational",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596782716848,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f236e6bec4ad046ff9e8567",
  "name": "SeventhApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f236e6bec4ad046ff9e8566",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["seventhapp"],
  "status": {
    "lastUpdated": 1596157547626,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596159631876,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255b5eec4ad046ff9edabb.png",
    "category": ["Cat1", "Cat2"],
    "video-url": "http://www.google.com"
  },
  "type": "default",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596283744568,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f23768fb5ad376fff8461dc",
  "name": "EigthApp1",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f23768fb5ad376fff8461db",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["eigthapp1"],
  "status": {
    "lastUpdated": 1596159631878,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596175555205,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg"],
    "icon": "http://d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg",
    "category": ["Cat1", "Cat2"],
    "video-url": "http://www.google.com"
  },
  "type": "informational",
  "restrict": {},
  "submittedDate": 1596175557577,
  "version": 1,
  "prettyStatus": "In Review",
  "lastUpdated": 1596284723502,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f23b4c3b5ad376fff8468ab",
  "name": "EigthApp4",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f23b4c3b5ad376fff8468aa",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["eigthapp4"],
  "status": {
    "lastUpdated": 1596175562126,
    "reason": "",
    "modifiedBy": "administrator",
    "value": "inReview"
  }
}, {
  "allow": {},
  "parent": {
    "status": {
      "lastUpdated": 1596172205368,
      "reason": "",
      "modifiedBy": "administrator",
      "value": "approved"
    }
  },
  "isLatestVersion": true,
  "access": [],
  "created": 1596161067050,
  "customData": {
    "summary": "this isb long text <b>bold<b></b></b>",
    "website-url": "http://www.google.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg", "//d3grfap2l5ikgv.cloudfront.net/56f5e021f9608742f3454057/public/5e99a377aab30808d72bab1c.jpg"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255035ec4ad046ff9ed9e4.png",
    "category": ["Cat1", "Cat2"],
    "video-url": "http://www.google.com"
  },
  "type": "default",
  "restrict": {},
  "submittedDate": 1596161069943,
  "version": 2,
  "prettyStatus": "Approved",
  "lastUpdated": 1596280924001,
  "isLive": true,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f237c2bec4ad046ff9e8647",
  "name": "EigthApp3",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f237c2bec4ad046ff9e8646",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["eigthapp3"],
  "status": {
    "lastUpdated": 1596280924034,
    "reason": "",
    "modifiedBy": "administrator",
    "value": "approved"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596374897948,
  "customData": {
    "summary": "<p><strong>This is testing </strong><span style=\"color: rgb(235, 107, 86);\">of how</span> <em>Bold an syled test looks </em>good.</p><p><br></p>",
    "website-url": "https://www.test.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f26bf0ab5ad376fff84d4f5.png", "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f26bf17ec4ad046ff9ef84f.png"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f26bef6ec4ad046ff9ef849.png",
    "category": ["cat3"],
    "video-url": "https://www.test.com/wewer"
  },
  "type": "informational",
  "restrict": {},
  "submittedDate": 1596374898236,
  "version": 1,
  "prettyStatus": "Pending",
  "lastUpdated": 1596374897948,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f26bf71ec4ad046ff9ef859",
  "name": "Load Runner 1",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f26bf71ec4ad046ff9ef858",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["load-runner-1"],
  "status": {
    "lastUpdated": 1596374898236,
    "modifiedBy": "developer",
    "value": "pending"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596375119866,
  "customData": {
    "summary": "<p><span style=\"background-color: rgb(209, 72, 65);\">This is another syle test</span></p><p><span style=\"background-color: rgb(209, 72, 65);\"><a href=\"https://www.test.com\" rel=\"noopener noreferrer\" target=\"_blank\">Test Link</a>&nbsp;</span></p>",
    "website-url": "https://www.test.com",
    "product-images": [],
    "category": ["cat2"],
    "video-url": ""
  },
  "type": "informational",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596375119866,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f26c04fec4ad046ff9ef86e",
  "name": "Load Runner 2",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f26c04fec4ad046ff9ef86d",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["load-runner-2"],
  "status": {
    "lastUpdated": 1596375119869,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596376232191,
  "customData": {
    "summary": "<p><span style=\"color: rgb(184, 49, 47);\">This is test app <strong>Bold <em>italic</em></strong></span></p>",
    "product-images": [],
    "category": ["cat2"]
  },
  "type": "informational",
  "restrict": {},
  "submittedDate": 1596376232459,
  "version": 1,
  "prettyStatus": "Pending",
  "lastUpdated": 1596376232191,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f26c4a8b5ad376fff84d586",
  "name": "Load Runner 3",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f26c4a8b5ad376fff84d585",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["load-runner-3"],
  "status": {
    "lastUpdated": 1596376232459,
    "modifiedBy": "developer",
    "value": "pending"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596538079856,
  "customData": {
    "product-images": [],
    "category": []
  },
  "type": "informational",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596538079856,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f293cdf85f6456e62e8d065",
  "name": "Application Name",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f293cdf85f6456e62e8d064",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["application-name"],
  "status": {
    "lastUpdated": 1596538079859,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596780200953,
  "customData": {
    "summary": "this isb long text <b>bold<b>",
    "website-url": "http://www.google.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f243124b5ad376fff847977.jpg", "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f243124b5ad376fff847977.jpg", "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f243124b5ad376fff847977.jpg"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f243124b5ad376fff847977.jpg",
    "category": ["Cat1", "Cat2"],
    "video-url": "http://www.google.com"
  },
  "type": "informational",
  "restrict": {},
  "version": 1,
  "prettyStatus": "In Development",
  "lastUpdated": 1596780200953,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f2ceea81f8ddb2ee35faa65",
  "name": "TenthApp",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f2ceea81f8ddb2ee35faa64",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["tenthapp"],
  "status": {
    "lastUpdated": 1596780200956,
    "value": "inDevelopment"
  }
}, {
  "allow": {},
  "parent": {},
  "isLatestVersion": true,
  "access": [],
  "created": 1596803902355,
  "customData": {
    "summary": "<p>asdfdas</p>",
    "website-url": "http://www.google.com",
    "product-images": ["//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f2d4b29ea1ef907e0ddccf7.jpg"],
    "icon": "//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f2d4b031f8ddb2ee35fb2ef.png",
    "category": ["Assembly"],
    "video-url": "http://www.google.com"
  },
  "type": "informational",
  "restrict": {},
  "submittedDate": 1596803902734,
  "version": 1,
  "prettyStatus": "Pending",
  "lastUpdated": 1596803902355,
  "isLive": false,
  "developerId": "3dcfdd48ed6b4f9d8b6a3e23deb36249",
  "appId": "5f2d4b3eea1ef907e0ddccfd",
  "name": "Submit Flow",
  "attributes": {},
  "model": [{
    "license": "single",
    "modelId": "5f2d4b3eea1ef907e0ddccfc",
    "price": 0,
    "currency": "USD",
    "type": "free",
    "trial": 0
  }],
  "safeName": ["submit-flow"],
  "status": {
    "lastUpdated": 1596803902734,
    "modifiedBy": "developer",
    "value": "pending"
  }
}];

storiesOf('App Data Grid', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcMenuGridComponent,
  })
  .add('App grid', () => ({
    component: OcMenuGridComponent,
    moduleMetadata: modules,
    props: {
      appList: application,
      editIcon: "http://localhost:4200/assets/img/delete.svg",
      publishIcon: "http://localhost:4200/assets/img/publish.svg",
      sortIcon: "http://localhost:4200/assets/img/dropdown-icon.svg",
      menuUrl: "http://localhost:4200/assets/img/dots-hr-icon.svg"
    }
  }));
