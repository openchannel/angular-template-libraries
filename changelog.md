## Release notes - angular-template-libraries - Version 2.59.0 (5/27/2022)<br>
### Task<br>
AT-1799 - Implement SP initiated flow for SAML<br>
## Release notes - angular-template-libraries - Version 2.58.0 (5/26/2022)<br>
### Bug<br>
AT-1795 - [portal] DFA Save buttons in out of screen on mobile <br>
AT-1793 - [Market] Checkout buttons in out of screen on mobile<br>
AT-1792 -  [Market] "Sort by" block display error for reviews on mobile<br>
AT-1791 - [Market] Write review block is out of screen on mobile<br>
AT-1790 - [Market] App has two delete buttons on My Apps page<br>
## Release notes - angular-template-libraries - Version 2.57.0 (5/3/2022)<br>
### Bug<br>
AT-1787 - [Market] Change app details page loading strategy<br>
AT-1782 - Image uploader allow to upload unsupported file<br>
## Release notes - angular-template-libraries - Version 2.56.0 (4/5/2022)<br>
### Bug<br>
AT-1769 - [Libs] Fix storybook build<br>
### Task<br>
AT-1763 - Add .nvmrc file to market, portal and libraries repos with node version<br>
AT-1755 - Fix template3-portal bugs, codesmells<br>
AT-1754 - Fix template3-marketsite bugs, codesmells<br>
AT-1753 - Fix angular-template-libraries bugs, codesmells<br>
### Bug<br>
AT-1712 - [Field Group] Portal is not retaining application data once saved as draft.<br>
## Release notes - angular-template-libraries - Version 2.55.3 (3/29/2022)<br>
### Bug<br>
AT-1760 - [Hot-fix] [Prod] Number field does not accept the value grater than 0.<br>
## Release notes - angular-template-libraries - Version 2.55.2 (3/24/2022)<br>
### Task<br>
AT-1698 - Fix angular-template-libraries security issues<br>
AT-1697 - Fix angular-portal-template security issues<br>
AT-1696 - Fix angular-market-template security issues<br>
## Release notes - angular-template-libraries - Version 2.55.1 (3/11/2022)<br>
### Bug<br>
AT-1733 - [Search result page] When selecting the sub-category filter, it's NOT fetching the results. <br>
AT-1732 - [Homepage] Sidebar does not show the subcategories on the homepage of marketsite.<br>
## Release notes - angular-template-libraries - Version 2.54.0 (1/31/2022)<br>
### Story<br>
AT-1665 - A user is able to log in from SSO using SAML 2.0<br>
### Bug<br>
AT-1659 - [Market][Portal] Page is not loading correctly when URL is like `my-profile` (without `profile-details` end part)<br>
AT-1657 - Long word is not truncated in oc-app-card on market<br>
AT-1636 - [Sign Up] Sign up form does not load all the fields of the Dev/User Org type.<br>
## Release notes - angular-template-libraries - Version 2.53.0 (1/27/2022)<br>
### Task<br>
AT-1583 - For CAP, compress responses using gzip<br>
### Bug<br>
AT-1315 - [Market/Portal][Video] Video link should accept both URL formats 1) Embed and 2) Normal watch URLs 3) Copy Video URL.<br>
AT-1159 - [User/Developer][Dashboard] If the Roles are set to empty from Native SSO and after sign up assigned one from Template3 then an extra (duplicate) field created in the Dashboard.<br>
## Release notes - angular-template-libraries - Version 2.52.0 (1/27/2022)<br>
### Bug<br>
AT-1605 - [Components] Custom sign up form should support DFA fields<br>
### Task<br>
AT-1581 - For CAP, Change cache control timing<br>
AT-1579 - For CAP, make /content, /apps/textSearch and /apps/{appId} cachable<br>
### Bug<br>
AT-1510 - [AT-1446] Form Rate limit should show only 1 validation.<br>
AT-1434 - CMS must be enabled for Portal and Market sites.<br>
AT-1346 - [SSO] For External SSO Identity Configuration the Invite Request has the /auth/native/invite in URL.<br>
## Release notes - angular-template-libraries - Version 2.51.1 (1/25/2022)<br>
### Bug<br>
AT-1612 - [Market] My apps page loads with incorrect pageNumber when page loads already scrolled to the bottom<br>
AT-1424 - [Market/Portal][My Profile][Console Error] custom-account-type  is not a valid developer account type<br>
AT-1374 - [Market] When click on Download button Ownership record is not created.<br>
### Story<br>
AT-1291 - A developer is able to view the invite form according to the configured Developer Account Type<br>
AT-1290 - A user is able to view the invite form according to the configured User Account Type<br>
## Release notes - angular-template-libraries - Version 2.50.0 (1/17/2022)<br>
### Bug<br>
AT-1627 - [Angular Components][Portal] Wrong progressbar offset when steps length <= max steps to show<br>
AT-1537 - Insufficient input validation may lead to DoS<br>
AT-1515 - [UI] [Market/Portal] Alert Danger validation does not render correctly on the login page for not activate accounts.<br>
AT-1389 - [Prod][client-api-proxy] o.s.b.a.w.r.e.AbstractErrorWebExceptionHandler 500 Server Error for HTTP POST "/auth/external/token"<br>
AT-1157 - Exposing properties endpoints is considered a security risk<br>
## Release notes - angular-template-libraries - Version 2.49.0 (1/17/2022)<br>
### Task<br>
AT-1620 - Replace AppConfirmationModalComponent by OcConfirmationModalComponent<br>
AT-1596 - Add expand icon on rich text component<br>
### Story<br>
AT-1563 - A user is able to go through a checkout flow when buying an app<br>
### Bug<br>
AT-1467 - [logs-prod] ERROR o.s.b.a.w.r.e.AbstractErrorWebExceptionHandler: 500 Server Error for HTTP POST "/auth/native/send-activate-code"<br>
AT-1370 - [Multi File/Image/private file] Do not allow to upload images/files more than it's Max limit.<br>
## Release notes - angular-template-libraries - Version 2.48.0 (1/6/2022)<br>
### Bug<br>
AT-1641 - [Stage1][Billing] Not able to add credit card information and billing address information for newly signed up user.<br>
### Story<br>
AT-1587 - Clicking on a tag should take to search results <br>
AT-1564 - A user is able to view transactions and download invoices<br>
### Bug<br>
AT-1404 - [Logs-Prod] ERROR o.s.b.a.w.r.e.AbstractErrorWebExceptionHandler: [cdc297a5-389888]  500 Server Error for HTTP PATCH "/v2/developers/this"<br>
AT-1362 - [Logs-Prod][CAP] ERROR o.s.b.a.w.r.e.AbstractErrorWebExceptionHandler: 500 Server Error for HTTP GET "/v2/apps/textSearch<br>
AT-1301 - [Portal/Market][Invite] Sign Up- Success modal with 'Activate Account' button should be displayed for Invitee Sign up process.<br>
## Release notes - angular-template-libraries - Version 2.47.0 (12/16/2021)<br>
### Story<br>
AT-1555 - A developer is able to connect their Stripe account to receive payments for apps<br>
AT-1551 - A developer is able to set pricing information for their app in the partner portal<br>
## Release notes - angular-template-libraries - Version 2.46.1 (12/15/2021)<br>
### Task<br>
AT-1541 - Allow reviews without Ownership records<br>
## Release notes - angular-template-libraries - Version 2.46.0 (12/1/2021)<br>
### Task<br>
AT-1607 - Ensure correct SSO behavior in all possible scenarios<br>
### Story<br>
AT-1565 - A user is able to set their billing address<br>
AT-1559 - A user is able to view, add and remove credit card details<br>
### Bug<br>
AT-1546 - [Market][Review count] Review under Overall rating is getting increased even though Review is not yet approved.<br>
AT-1528 - [UI] Various components fields are having wrong height<br>
AT-1468 - [Reviews] Logged in user's review is not at the top of the Review list.<br>
AT-1210 - [UI][Portal][Manage App / Edit App][Chart] UI issues on Chart component. Current Date is not showing and Count is cut off.<br>
## Release notes - angular-template-libraries - Version 2.45.1 (11/16/2021)<br>
### Bug<br>
AT-1608 - [Market][Form submission - Buy Now] Image crop pop-up is not getting closed after clicking on Confirm button.<br>
AT-1595 - [Hotfix] A developer is not able to edit an app if the app type is not found.<br>
AT-1594 - [Hotfix][Edit App Type] When there are no App Type available then proper message is not showing.<br>
## Release notes - angular-template-libraries - Version 2.45.0 (11/12/2021)<br>
### Bug<br>
AT-1590 - [Component][Custom Signup Form] Remove "Org" prefix from Custom Data<br>
AT-1566 - [stage1][market] [Forms - contact us - Buy now] File / Image upload is not working. uploadtoken gets canceled.<br>
AT-1557 - [logs-prod] ERROR o.s.b.a.w.r.e.AbstractErrorWebExceptionHandler 500 Server Error for HTTP OPTIONS "/auth/csrf"<br>
AT-1532 - [Prod][client-api-proxy] 500 Server Error for HTTP POST "/auth/external/token"<br>
AT-1294 - [Portal][Create / Edit App] [Multi Select Dropdown / Tag] Dropdown list is not opening when clicking on 'arrow' icon.<br>
AT-1060 - [User management][Invite a member] Password field validation displayed twice.<br>
## Release notes - angular-template-libraries - Version 2.44.0 (11/11/2021)<br>
### Bug<br>
AT-1582 - Cap should not be setting expires and pragma headers on cachable responses<br>
AT-1578 - [Market] Video gets squeeze when the Summary is too long on the App details page.<br>
AT-1490 - [Portal][Create Apps] Color field has no default value set, yet Portal user gets default value for Color.  <br>
AT-1460 - UI [Market/Portal] On Invite Sign up screen, Font size of checkbox value should be same as we have for normal sign up.<br>
AT-1425 - [UI] If Features Apps are only 2 or 3 then there should be decent view on dashboard.<br>
AT-1298 - Rating with half star not rendering correctly<br>
AT-1211 - [Market/Portal] Refresh token expired should not appear to the end User.<br>
AT-1207 - [Market] "Search phrase does not found any results" message missing on the Search result page.<br>
## Release notes - angular-template-libraries - Version 2.43.0 (11/9/2021)<br>
### Bug<br>
AT-1592 - Signup by invite doesn't work<br>
AT-1273 - [Market/Portal] Copyright year at the footer of each site should get auto update based on the current year.<br>
AT-1126 - [UI][Portal][Mac -> Safari] My Company and My Profile page issues<br>
AT-1103 - [UI][Portal / Market site] Resend activation code screen does not show success toastr message on resending the code.<br>
AT-1095 - [UI][Marketsite][Android] "See all >"  should be in sentence case <br>
AT-1041 - Clicking the label text for Remember Me should toggle the checkbox<br>
AT-1024 - [App Details][Forms] If the mapped Forms are not available in OC Dashboard, click event on 'Contact' & 'Buy now' buttons should throw a meaningful message.<br>
AT-981 - [User Management] [Invite Member] [UI] 'Terms & Data processing' Checkbox is showing not properly aligned.<br>
## Release notes - angular-template-libraries - Version 2.42.0 (11/8/2021)<br>
### Bug<br>
AT-1586 - Need to update files of the projects with a prettier<br>
AT-1577 - [UI] The Datepicker changing position each time when clicking on any component's elenemt<br>
### Story<br>
AT-1328 - A developer can edit an app even if the app type is not found<br>
### Bug<br>
AT-1116 - [Portal][Homepage] Become a partner  button should redirect user to Portal Sign up page.<br>
AT-1111 - [Portal / Market][User Management][Invite a member] Need to click two times to close the Model.<br>
AT-752 - [Edit App Type] When there are no App Type available then proper message is not showing.<br>
## Release notes - angular-template-libraries - Version 2.41.0 (11/2/2021)<br>
### Story<br>
AT-1405 - A developer is able to query order for their apps from CAP<br>
### Task<br>
AT-1344 - [Component][Rich Text Editor] Need to increase the Expand size by dragging the right bottom corner.<br>
### Story<br>
AT-932 - User should see "no apps" message on manage apps page<br>
AT-931 - User should see "no apps" message on my apps page<br>
AT-930 - User should see "no results" message on search page<br>
## Release notes - angular-template-libraries - Version 2.40.0 (11/2/2021)<br>
### Bug<br>
AT-1048 - Don't show error if developerAccountType or userAccountType doesnt exist<br>
AT-1013 - [Market] [Filter apply] [Login] Getting error message notification after logged in.<br>
### Task<br>
AT-375 - A user should be able to provide a URL without http or https<br>
## Release notes - angular-template-libraries - Version 2.39.0 (11/1/2021)<br>
### Bug<br>
AT-1584 - [Dev1][Apps list] Horizontal scrollbar on the App list page<br>
AT-1102 - [UI][Reset Password] After reset password Toaster notification message is not showing.<br>
AT-1088 - [Portal] [Market] [Signup-Login] [UI] Inconsistence font-size. <br>
AT-1086 - [Market] [My Apps] [UI] "Hand Pointer" cursor should displayed when mouse over on 'Show Alpha' dropdown.<br>
AT-1081 - [Marketsite] if user is not logged in and click on 'Browse' menu from any other page, it fluctuate the header components.<br>
AT-1058 - [Portal] [Create App] [Filed Placeholder] For Color and Tags fields, Placeholder texts is not showing.<br>
AT-1042 - A user logged into the partner portal should be able to navigate to other pages such as the home page<br>
AT-1021 - [My Company] Required field validation are not displayed for Newly created Portal company.<br>
AT-1020 - [Forgot Password] Typo error on Password recovery mail sent message.<br>
## Release notes - angular-template-libraries - Version 2.38.0 (11/1/2021)<br>
### Task<br>
AT-1380 - Clear all on search component<br>
AT-1314 - Perform trim function on all text boxes before validating or saving the data<br>
### Bug<br>
AT-988 - [Market] [Portal] [My Profile - Password] Validation is not showing correctly.<br>
## Release notes - angular-template-libraries - Version 2.37.0 (10/29/2021)<br>
### Bug<br>
AT-1567 - [services] Update NativeLoginService<br>
AT-1542 - [Field Group][App Create] Portal User should be taken to App name Field Group if App Name is already exist.<br>
### Task<br>
AT-1540 - Improve field group<br>
AT-1538 - For CAP, Implement endpoint to update form submissions<br>
AT-1206 - Improve pages URLs<br>
### Bug<br>
AT-1164 - On Sign up, the word "Log In" is 16px instead of 14px<br>
## Release notes - angular-template-libraries - Version 2.36.0 (10/20/2021)<br>
### Bug<br>
AT-1548 - [Apps] [Multiselect list] Multiselect list should restrict additional entry except the predefined from core.<br>
AT-1547 - [Apps][Dropdown list] Developer gets error while publishing a app with Dropdown list (special case)<br>
AT-1545 - Boolean tags isn't rendered properly in DFA<br>
### Task<br>
AT-1535 - For CAP, upgrade to spring boot 2.5.5<br>
### Bug<br>
AT-1188 - [Market/Portal] [DFA] Save button of DFA should throw required field validation for required fields.<br>
AT-1187 - [UI] [Market/Portal][DFA] Edit icon is different than the proposed in Zeplin<br>
## Release notes - angular-template-libraries - Version 2.35.0 (10/20/2021)<br>
### Task<br>
AT-1192 - Improve datatable (list grid) component<br>
### Bug<br>
AT-1185 - [Market/Portal][UI][Tool tip] Tooltip text font size should be smaller then the Field label.<br>
AT-1182 - [Market/Portal] Sorting caret icon does not reflect the current sorting column.<br>
AT-1160 - Top section of pages "bump" when navigating<br>
AT-1136 - [UI][Portal][Design System] Modal's button background color needs to changed as per the mock.<br>
### Task<br>
AT-929 - Improve 404 page<br>
## Release notes - angular-template-libraries - Version 2.34.0 (10/12/2021)<br>
### Bug<br>
AT-1543 - Fix PROD log for CAP UnknownContentTypeException<br>
### Task<br>
AT-1379 - Show more/less button on filters component<br>
### Bug<br>
AT-1165 - Wrong font size for titles on app details page<br>
AT-1026 - [Download][App Details] After force logging in user should be redirected to the App Details page.<br>
AT-632 - Back to the App Store link is not working on app details page<br>
AT-583 - [Edit App] Validation message is not showing for invalid data in fields,<br>
## Release notes - angular-template-libraries - Version 2.33.0 (10/7/2021)<br>
### Task<br>
AT-1221 - Improve image crop component<br>
### Bug<br>
AT-1162 - Mobile search result page should not open filters by default<br>
AT-1100 - [UI][Marketsite][Android] Contact us, Invite a member, Buy now modals are not rendering as per the mock designs.<br>
AT-1099 - [UI][Marketsite][Android] My Profile and My Company pages are not rendering as per Mock design.<br>
### Task<br>
AT-295 - Support larger screens breakpoints (≥1920px)<br>
## Release notes - angular-template-libraries - Version 2.32.0 (10/7/2021)<br>
### Bug<br>
AT-1508 - Drag and drop on multi file and image fields<br>
### Task<br>
AT-1505 - Allow customization of form error messages<br>
### Bug<br>
AT-1184 - [Market/Portal][Tags][Number Tags] User should able Add new Tags from Template and select which are exist in Dashboard.<br>
## Release notes - angular-template-libraries - Version 2.31.0 (10/5/2021)<br>
### Task<br>
AT-1504 - Improve gallery component<br>
AT-779 - Improve tag form field component behaviour<br>
## Release notes - angular-template-libraries - Version 2.30.2 (10/4/2021)<br>
### Bug<br>
AT-1533 - [hotfix] Upgrade to compodoc 1.1.15<br>
## Release notes - angular-template-libraries - Version 2.30.1 (10/4/2021)<br>
### Bug<br>
AT-1527 - [HOTFIX] 500 error occurring when trying to authenticate using Auth0<br>
## Release notes - angular-template-libraries - Version 2.30.0 (10/1/2021)<br>
### Task<br>
AT-1507 - Field group improvements<br>
### Story<br>
AT-1494 - A user or developer is able to log in using OAuth 2.0 SSO<br>
## Release notes - angular-template-libraries - Version 2.29.0 (9/23/2021)<br>
### Bug<br>
AT-1491 - [Portal] Multi-level DFA with Row label value selected from Dashboard, is showing error while adding field in that DFA.<br>
AT-1106 - [UI][Portal] Portal Homepage Mobile devices issues.<br>
AT-1093 - [UI][Marketsite][Homepage] Recently added, Most popular and Apps for analytics sections are not as per Mock design.<br>
AT-1092 - [UI][Market site][Homepage] Sentence case required for all the heading on Home page<br>
## Release notes - angular-template-libraries - Version 2.28.0 (9/17/2021)<br>
### Bug<br>
AT-1174 - Wrong margin on portal homepage<br>
AT-1163 - Wrong width of Login and Sign up buttons<br>
AT-1161 - Dropdown field component has wrong height<br>
AT-1101 - [Portal / Market site] Log in, Sign up, Forgot password pages are not as per mock designs.<br>
AT-1094 - [UI][Marketsite][Homepage] "Get started as an app Developer" button should be center aligned and Home icon should be smaller.<br>
## Release notes - angular-template-libraries - Version 2.27.0 (9/15/2021)<br>
### Bug<br>
AT-1509 - [Reset Password] Getting wrong password validation when entered password does not match expected criteria.<br>
AT-1497 - For components, fix as many moderate and high package security vulnerabilities as is convenient<br>
AT-1496 - For marketplace, fix as many moderate and high package security vulnerabilities as is convenient<br>
AT-1495 - For partner portal, fix as many moderate and high package security vulnerabilities as is convenient<br>
### Story<br>
AT-379 - A search engine can be blocked from crawling the site based on search engine discoverability property<br>
## Release notes - angular-template-libraries - Version 2.26.0 (9/13/2021)<br>
### Bug<br>
AT-1511 - [Portal / Market] [Alias Email] Email field does not accepts the alias emails.<br>
AT-1406 - [Dev1][Portal] Getting error when selecting an App Type.<br>
## Release notes - angular-template-libraries - Version 2.26.0 (9/13/2021)<br>
### Bug<br>
AT-1511 - [Portal / Market] [Alias Email] Email field does not accepts the alias emails.<br>
AT-1406 - [Dev1][Portal] Getting error when selecting an App Type.<br>
## Release notes - angular-template-libraries - Version 2.25.0 (9/8/2021)<br>
### Task<br>
AT-1420 - Make the developerInviteTemplateId and userInviteTemplateId configurable and only allow sending developerInviteTemplateId/userInviteTemplateId, type, roles and email parameters in CAP endpoint<br>
AT-1204 - For each page, use heading tags to properly describe the layout of the pages<br>
## Release notes - angular-template-libraries - Version 2.24.0 (9/8/2021)<br>
### Bug<br>
AT-1493 - Product screenshot not being displayed on new sites<br>
### Task<br>
AT-1461 - Automate versioning and realease notes within Bitbucket pipelines<br>
AT-1203 - Set meta tags that allow social media sites to display a proper image for app details pages when sharing the link<br>
AT-1202 - Set image alt text for images on app cards and logos on app details page<br>
AT-1201 - Set meta description tags on site<br>
## Release notes - angular-template-libraries - Version 2.23.0 (9/3/2021)<br>
### Bug<br>
AT-1493 - Product screenshot not being displayed on new sites<br>
AT-1215 - [User Management] A User/Developer Admin should not be able to delete themselves.<br>
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
