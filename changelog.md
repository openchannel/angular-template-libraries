## Release notes - angular-template-libraries - Version 2.21.0 (9/2/2021)<br>
### Bug<br>
AT-1500 - [UI][Create App] Single space is required in between Step #. and Field Group Label for Wizard view.<br>
AT-1498 - [Hotfix] New customers are ending up in the wrong environment (dev1 and stage1) when trying to use Angular templates<br>
AT-1479 - Apps grid on manage apps page should not show horizontal scroll bar when viewing from desktop<br>
### Task<br>
AT-1381 - Deploy compodoc<br>
AT-916 - Remove GET /v2/users/all endpoint from CAP<br>
AT-788 - Need compodoc documentation for Application Form Service<br>
## Release notes - angular-template-libraries - Version 2.20.0 (9/2/2021)<br>
### Bug<br>
AT-1483 - [Market/Portal][Email] Email field is not required yet Email field throws format validation.<br>
AT-1481 - [logs-prod] ERROR o.s.b.a.w.r.e.AbstractErrorWebExceptionHandler 500 Server Error for HTTP POST "/v2/stats/increment/views"<br>
### Task<br>
AT-1456 - Improve checkbox component label and description<br>
### Bug<br>
AT-1445 - Email content spoofing<br>
## Release notes - angular-template-libraries - Version 2.19.0 (8/31/2021)<br>
### Bug<br>
AT-1502 - All rate limiting should be keyed by siteId<br>
AT-1489 - Signup no rate limits<br>
AT-1447 - Request submit no rate limits<br>
AT-1446 - Form submit no rate limits<br>
AT-1443 - Password brute force<br>
AT-1441 - Password reset no rate limits<br>
### Task<br>
AT-1200 - Follow best practices for prerendering<br>
### Bug<br>
AT-1199 - Error messages displayed on market site in prerender view<br>
## Release notes - angular-template-libraries - Version 2.18.1 (8/31/2021)<br>
### Bug<br>
AT-1375 - [HOTFIX][Market] When click on Download/Install/Buy Now/Contact Us button, statistics are not increasing for that App<br>
## Release notes - angular-template-libraries - Version 2.18.0 (8/26/2021)<br>
### Bug<br>
AT-1442 - User enumeration<br>
AT-1440 - Parallel session is valid after password change<br>
## Release notes - angular-template-libraries - Version 2.17.0 (8/26/2021)<br>
### Bug<br>
AT-1452 - [Reviews] Reviews description should be limited to 2000 characters and not 1000 character.<br>
### Story<br>
AT-1345 - Support field groups on Templates<br>
## Release notes - angular-template-libraries - Version 2.16.1 (8/18/2021)<br>
### Bug<br>
AT-1475 - [Market / Portal][Forgot Password] When Reset Password, Getting same 2 API calls and same 2 Reset Password emails. <br>
## Release notes - angular-template-libraries - Version 2.16.0 (8/11/2021)<br>
### Bug<br>
AT-1463 - [Portal][DFA > Videos] When user try to delete 1st item (video), it deletes the last item (video) if the items were not saved.<br>
AT-1459 - Endpoint /auth/external/token returning 500 error using Google as an Auth provider<br>
## Release notes - angular-template-libraries - Version 2.15.0 (8/10/2021)<br>
### Story<br>
AT-1422 - A user is able to be guided when they are forced to reset their account password.<br>
### Bug<br>
AT-1396 - Session is still valid after logout<br>
## Release notes - angular-template-libraries - Version 2.14.0 (8/10/2021)<br>
### Bug<br>
AT-1482 - [Hotfix][Market][App Details] Getting 400 error for /views API call, "BAD_REQUEST", message: "This endpoint can be called once every 24 hours.<br>
AT-1455 - Improve left sidebar filter clickable area<br>
## Release notes - angular-template-libraries - Version 2.13.0 (8/5/2021)<br>
### Bug<br>
AT-1449 - [SelfHosted Sites][Market] Featured section on top of Market Site is not visible.<br>
AT-1348 - [Market][App Details] Vimeo channel link displayed as an invalid link in Portal and Market. Youtube channel not working.<br>
AT-1141 - [UI][Marketsite][Tablet] App details: Video goes out of the border of the page.<br>
## Release notes - angular-template-libraries - Version 2.12.0 (8/4/2021)<br>
### Subtask<br>
AT-1462 - [CAP] Update email validator on the CAP side<br>
### Story<br>
AT-1416 - A user is able to implement any kind of statistic from CAP<br>
### Task<br>
AT-1385 - Allow customization of heading tags<br>
### Bug<br>
AT-1364 - Don't use '**' patterns<br>
AT-605 - [My Profile] [Email] It allows to update the invalid format email address.<br>
## Release notes - angular-template-libraries - Version 2.11.0 (7/29/2021)<br>
### Task<br>
AT-1433 - customize the Filter component<br>
### Bug<br>
AT-1384 - [Portal] Duplicate value showing in DFA fields when same name fields available in that app type<br>
AT-1322 - [DFA] Sequence inside the DFA fields has been changed while adding new item to DFA Field.<br>
AT-1205 - [Portal / Market][Signup][Activation page sign up link] Developer is not able to sign up.<br>
## Release notes - angular-template-libraries - Version 2.10.0 (7/26/2021)<br>
### Bug<br>
AT-1432 - [Market] [UI] [Featured] App Icon and App name Overlap.<br>
### Story<br>
AT-511 - A User should write an app review for approval<br>
### Bug<br>
AT-1426 - [Market/Portal][Forgot Password] Forgot Password button does nothing on the Market and Portal sites.<br>
AT-1401 - Change styles placing in oc-menu-user-grid, because it affects some components(right placement in description)<br>
AT-1393 - Change styles according to attached ones to wrap elements on tablet view in oc-image-gallery<br>
### Task<br>
AT-1388 - If the validation mode is introspection then the attributes from the introspection response should be part of claim mappings<br>
AT-1386 - idToken should not be required when the validation mode is Introspection<br>
### Bug<br>
AT-1372 - Button size should not resize when user clicks on it<br>
### Task<br>
AT-1368 - A user is able to access GET /reviews/{reviewId} from CAP<br>
AT-1367 - In CAP turn off caching for stage1 and dev1 environments<br>
### Bug<br>
AT-1431 - [Market] [UI] App name and Price value overlap.<br>
AT-1364 - Don't use '**' patterns<br>
### Story<br>
AT-1350 - Multi select list field display options<br>
AT-1349 - Dropdown list field display options<br>
### Task<br>
AT-1343 - [Component][File Upload] File Upload area should have cursor: pointer, CSS so user get hand cursor.<br>
AT-1319 - Update chart.js version<br>
AT-1276 - Manage files properties in a centralized file<br>
AT-1275 - Manage CSS properties in a centralized file<br>
### Story<br>
AT-513 - A User should delete an app review<br>
AT-512 - A User should edit an app review<br>
### Task<br>
AT-1365 - Components should respect fields' min and max definitions<br>
## Release notes - angular-template-libraries - Version 2.9.0 (7/15/2021)<br>
### Task<br>
AT-1331 - CMS support on Templates<br>
## Release notes - angular-template-libraries - Version 2.8.2 (7/13/2021)<br>
### Task<br>
AT-1430 - [Hotfix] Change license back to MIT<br>
## Release notes - angular-template-libraries - Version 2.8.1<br>
### Bug<br>
AT-1394 - [Hotfix] Stored Cross-Site Scripting vulnerabilities in Angular components<br>
## Release notes - angular-template-libraries - Version 2.8.0<br>
### Task<br>
AT-1355 - A customer is able to view a change log on Github<br>
AT-1347 - Support video streaming services in the image/video gallery component<br>
