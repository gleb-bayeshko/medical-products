# Medical products #
**E-commerce MERN-application**
![Medical products](title.png)

[![Demo-button](demo-button.png)](https://medical-products-bayeshko.herokuapp.com/)

> **NOTE:** *To enable admin mode sign in with the following details:*
>   - **email**: bayeshko_gleb@mail.ru;
>   - **password**: frontendisfuture;

## Technology stack ##
* **HTML**;
* **CSS/SASS** *(SCSS)*;
* **MERN stack**:
  * React/Redux,
  * NodeJS,
  * ExpressJS,
  * MongoDB/Mongoose;
* **REST API**.

## NPM libraries ##
* **Frontend:**
  * redux-thunk,
  * react-router-dom,
  * axios,
  * node-sass,
  * js-cookie;
* **Backend:**
  * babel,
  * nodemon,
  * body-parser,
  * jsonwebtoken,
  * multer,
  * sharp,
  * bcrypt;
* **For Heroku deploy:**
  * aws-sdk.

## Functionality ##
- **PRODUCTS**:
  - Main page:
    - sort by category, date, rating;
    - each product has an add-to-cart button (if some product has already been added to the cart, the "add" button changes to the "added" button - when it is clicked, user is redirected to the cart page);
    - each product has five-star rating, based on the reviews left; 
    - if product is presented in several colors, it will have a color selection panel (if user clicks on the add-button without choosing a color, a popup with "Choose color" text will appear);
  - Product details page:
    ![Product details page](https://lh3.googleusercontent.com/d0q9IwYAjNHTLTTbSUFpLyKM2rFaei90JhbB4Ts9lxX8mHy6sbp50lldg8odraUKCXy0UyMZyoSeypXhqBxMTapCNwwX3yKtHwIWWgn8cNo8nzimdBpPLCRuXQeV1vsTScqkf8urqnQhffj9Wc_ZJBrLbll7-MFPSFs-iIMClRAdkFWbacMWYhzJJXojkzhW2pulRtueS3xC6H51AYlsBdblUUoJOHTMVamtVISx8vsO8qND77tUU1ARcJVZ2QAG80mLFm_hk4y0n81Ek3AaF52WDaDp8XLbg1CcdLS1SdBRIRSB_c4Sbru4hVesXFSmuv1Ice8HCJUowwzyhm17PP3YoW77995YOlkeLdYnFczco_7G2_8C4DyYdV1rrKFkMSEoGNrVDfeIW6KpQgMRuTq47RHaYC_bKx0kEXuS-a_T3V8_4nO8l3fAEUvFh_rYMvl6wEknm3KjQNAAEOXNrz1t1zimzNmbB-qljxBG1nucrzC6HDghnfurUMIk5MN3xni7e5uiJtCQHvAT3Z4YvzZOviJxwLBimv2q2ZUUMwNpG6ZZw5in7G64p25l5X7b0HpPqAq_-w1FGSv5oC8cFz0ZW8tCQrjtYP-OPYr1qFqRNIgdXIzSsxgvTHDw-BNVMcqzWYyHKMe_b--50GLKxuOykciJniNDQ75FbyPwsRfLGV1LRojlLKo_9q8qbw=w1334-h591-no?authuser=0)
    - rating and color panels, add-to-cart button (same rules as on the main page);
    - qty panel;
    - product description;
    - reviews:
      - if there are no reviews, the corresponding inscription will be displayed,
      - if user is not logged in, the sign-in-button will be displayed,
      - if user is logged in, the reviews form with rating selection and text input fields will be displayed,
      - if user has already left a review and tries to leave new review for the same product, a corresponding error will be displayed,
      - each review has a user avatar, five-star rating, date, time, name, second name (if it exists) and review text;
- **CART**:
  ![CART](https://lh3.googleusercontent.com/4th2hb2oZd9MR1ScHR2ox1u5F111FWi05kjt5KRKKy2n4X534qAwxwqr7Nqko3zo_9CP0vCye2fizaUUGfli5G1h34inj6ylUnzy_PFgGs9I4kIf_iq-ixcSZRxpUhcY5-iXjlgyVr82GOLVl8FoBVodg98WnpfWCPT3ZpEamddFsZ5ad8anDchxLTXwUP5ysVr-sbM01WLh7DToUruUTHgyF-3HbudGxHUL3z0MAokqlT_9l3vQHz87hUM6N8s8i444o75SJ7azkXBks35KO8RednsiXoKH8JGliWxaYJGaRiGruDEClM2ctX_Ei5igRS7k6Lu_GErXp0WbawUTPwT4OTbRxyoSnyLXmNr0wUtIsvO0ITmik-U1OufaJfzpJfaGCsg7eLOVesokMCq0cCx9JOhseCaDH3M4d3oEsO94n6Pwy9f-whGgr6LjQGMwtjPWywJzOeme1JsFUTrjgd26PsvoSER7R7wxkEYWoM2CVUH_XJ5rthxSIbUU08sVt6d6xHqKaOK4juU2duYK2-Ketd6QT-NfsxxEFBjdQIt3V4jmaDRq4WKH7Bd8X3QHcK2zKYOXl1eHAb_exrThpiSa1nXTymmDc3OqjL5gxVSpWfmz-780lC6m_GUomqm9lxpOAw9X8_mnBgenou0RS6Zjs7e-hZRpPLJCMWVv_xTC_ZDerGIHRfmjqGwhNQ=w1323-h623-no?authuser=0)
  - All qty changes in cart (adding, deletion, increasing or decreasing products qty) are displayed on the right-top cart button;
  - If cart is empty, a corresponding text and go-main-page button will be displayed on the cart page;
  - On the cart page user can change each product qty, delete product, go to the corresponding product details page by clicking on the product name;
  - Total products qty and final order price are displayed at the bottom of products list;
  - User account compatibility:
    - each registered person has own personal user cart, which saves all products added by user;
    - if user is not logged in, added products to cart and only then logged in (or registered and logged in), these products will be added to personal user cart (identical products in personal user cart will be replaced with the same new ones, i.e. the qty of such products will be updated);
- **USER ACCOUNT**:
  ![USER ACCOUNT](https://lh3.googleusercontent.com/iVWjDkfglWjMAs5_hhfAtPj4eQlBO-r_Cp4WXd-oUi4BDvdgw_lw0IJ06YLnDPg6AhcLGhSDsqMqYLHdhmnhT1g-QFcjJQ4tHDKIUsI9rptyiZoJ8jG7trkFrs_FDOoVuRXC-W3D5QL-2HP1sjU8G_6Idd1q0CwGVHRDLF7ZhL_umLMZ7IqEHOHNDGsd6JkrEMDSjrlwCF0P-1U18W_vB1e2OsAyNNxKb1WSQ5nJ3IBQNDEuMFYC77nkFTjPbx0eUL7HX31zzSRfj1jyGxc2MTQqCd0gHU7eMBeMY34iPcWbFhuIanmO3dSmu_s6mo1QPOtCpxtOT94VUDHxcbDjbPIcmhALU4DBfLtkvx9cFgkKwjqFBDRzTkAy_G36RK121OkQp4UGAH6D6JQTLaW6Ysxi8JSIKwUj-RrZhTeBPPejDZxsERqbxvuBeW6MD6FoiIv7yKDQ4NJafm0kQOyziRfkIkcDS4RpPykxkmAR4mIeyHALBJAqcmO3O0ybXt97tbhp1K0gQ87PYwwyh30-SQTsz_ujIUULCIMq4ifINgsxskvRo7b6enlpqP6TQjzYIkLMT7mqtziyJgoXo3QPYd43dlbbiYVj9AqDNoxYf71r9pSY-O-YJL1k7m1tfX1OAD1p6K6TyUE8aG4a_Pnp8otu6r4CtBP8FJ0Ar--RGlmCU9Q-ra0q-P9gxzt9Dw=w1334-h584-no?authuser=0)
  - Sign in page:
    - register and sign in ability;
  - Profile page:
    - ability to change name, second name, country, city, sex, password (user must enter current password and new password), avatar (on the server side avatar image will be reduced to 200x200 with cover fitting);
    - go-to-own-cart button;
    - log-out button;
  - Product details page:
    - ability to leave one review for each product (see Products section);
  - Cart:
    - personal user cart (see Cart section);
- **ADMIN MODE**:
  ![ADMIN MODE](https://lh3.googleusercontent.com/H5EYt3_UPDn6MupombnipEOezNOnU7hVEoRba5MVT90OIexOdrOcekWNyz2debIu94fzD-EuxodAUjNtNbmiThUaeS-NH9RPMysR5AD94Gl5NsQR5VO4WcY2dzN0VZwrfthXzQiLsI20l8i8TSFwQkTxtUVXeOOPDC3vrS_AHXuhzvYsE_wIXxUP8fKK5e56ogyrk_F7JauB4fMP9w7fDXZ-OmSLrpdKvU7F2yCQDEHtgln8vbW-BZ2tG_N1ch5ZsuGRAYpXdD_ZnXJhdJQ8IxWA-wlxy9LuJ3ojBWNBJxABOXWlsceiEwmmkOSKPMj89nKwIXRc8TgEr5EA7mpRYFkz2yWPT9lQQqSO5IWaL_tFKlblJ3eB3AImoN2Em4KMJtpdQzFvadI30MbSNLSOmXzloH6Nofd2dGQ8voFfxWXcS9gY5ekW1kwbwqNb9a9D685PN2RautmqotnVeX8DNqanixUprEYlvQr-m5fh1gyhfpslxjJy_1I5o-wVai3kxt_CVyuEDp7i2Gmbt5bb03_dQGoAeDFp5FEENbXIEzJgKOJK3-xwdjrEhxMs5dYcPz8PEqjCOu12fzOKyyAJKC62IUmgSiHxnI2BAXVSrF_RpPnHwP8PChsFIkcCE16fpO5u6g5XKY8pKQOwgY-xOqRBt9iME579yR-jVOEB--byOzpzG1mXfw0wIIwMZA=w1325-h438-no?authuser=0)
  - Profile:
    - the admin-panel button is displayed - when it's clicked, user is redirected to the admin panel page;
  - Admin panel page:
    - the page displays the product list and create-new-product button;
    - each product is represented as a row with id, name, price, category, brand and action columns;
    - there are two types of actions for each product - delete and edit;
    - if create-new-product or edit button is clicked, a modal window appears (in case of edit button all fields of the modal window will be filled with current product information, in case of create-new-product button all fields will be empty);
    - the modal window has name, category, image, color, price, brand and description fields and create/update button at the bottom;
- **GENERAL**:
  - Full responsive;
  - Error handling;
  - Dynamic page titles;

*App is boosted with create-react-app*
