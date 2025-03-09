# JazzCash Payment SDK - Node.js

> A comprehensive Node.js package for integrating the JazzCash Payment Gateway. Supports Card, Mobile Account, Voucher, and 3D Secure APIs with support for API versions 1.x and 2.x.

<br/>
<div align="center">

  <h3 align="center">JazzCash Payment SDK - Node.js</h3>

  <p align="center">
    A comprehensive Node.js package for integrating the JazzCash Payment Gateway.
    <br/>
    <br/>
    <a href="https://github.com/itxsaaad/jazzcash-sdk-node"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/itxsaaad/jazzcash-sdk-node/issues">Report Bug</a>
    .
    <a href="https://github.com/itxsaaad/jazzcash-sdk-node/issues">Request Feature</a>
  </p>
</div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![npm version](https://badge.fury.io/js/jazzcash-sdk-node.svg)](https://badge.fury.io/js/jazzcash-sdk-node)
[![Build Status](https://travis-ci.com/itxsaaad/jazzcash-sdk-node.svg?branch=main)](https://travis-ci.com/itxsaaad/jazzcash-sdk-node)

## Table Of Contents

- [JazzCash Payment SDK - Node.js](#jazzcash-payment-sdk---nodejs)
  - [Table Of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
  - [Features](#features)
  - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Example: Card Payment Authorization](#example-card-payment-authorization)
    - [Example: Mobile Account Payment](#example-mobile-account-payment)
    - [Example: Voucher Payment](#example-voucher-payment)
    - [Example: 3D Secure Enrollment \& ACS Processing](#example-3d-secure-enrollment--acs-processing)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)
  - [Support](#support)

## About The Project

A comprehensive Node.js SDK for integrating the JazzCash Payment Gateway. This library supports all major transaction methods, including:

- **Card APIs:** Authorize, Capture, Void, Refund, Transaction Status Inquiry, Direct Pay, 3D Secure Enrollment, and ACS Processing.
- **Mobile Account APIs:** REST-based Mobile Account transactions.
- **Voucher Payment APIs:** REST-based Voucher transactions.

It supports both API versions (e.g., 1.1 and 2.0) via the configurable `JAZZCASH_API_VERSION` environment variable. The SDK is designed to be simple, flexible, and easy to use, with detailed documentation and examples.

## Features

- **Modular Architecture:** Separate modules for Card, Mobile Account, Voucher, and 3D Secure APIs.
- **Secure Hash Generation:** Automatically generates HMAC-SHA256 secure hashes.
- **Promise-based API:** Fully asynchronous functions using async/await.
- **Environment Configuration:** Easily switch between sandbox and live environments.
- **Comprehensive Coverage:** Includes all key endpoints for Card, Mobile Account, Voucher, and 3D Secure transactions.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [NPM](https://www.npmjs.com/) - Node Package Manager
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js
- [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file into `process.env`
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing Framework with a focus on simplicity

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- NPM (v6.x or higher)
- JazzCash Merchant Account (Sandbox or Live)
- JazzCash API Credentials (Merchant ID, Password, Hash Key)
- JazzCash API Documentation (for reference)
- Basic understanding of JavaScript and Node.js

### Installation

1. Install the package via NPM:

```sh
npm install jazzcash-sdk-node
```

2. Create a .env file in your project root with the following variables:

```sh
# JazzCash Credentials and Environment Settings
JAZZCASH_MERCHANT_ID="YourMerchantID"
JAZZCASH_PASSWORD="YourMerchantPassword"
JAZZCASH_HASH_KEY="YourHashKey"

# Set environment to 'sandbox' or 'live'
JAZZCASH_ENVIRONMENT="sandbox"

# Set API version: 1.0, 1.1, or 2.0 (default is 1.1 if not specified)
JAZZCASH_API_VERSION="1.1"

# Base URLs for JazzCash endpoints
JAZZCASH_SANDBOX_URL="https://sandbox.jazzcash.com.pk"
JAZZCASH_LIVE_URL="https://payments.jazzcash.com.pk"

# JazzCash API Endpoints
JAZZCASH_AUTHORIZE_ENDPOINT="/ApplicationAPI/API/authorize/AuthorizePayment"
JAZZCASH_CAPTURE_ENDPOINT="/ApplicationAPI/API/authorize/Capture"
JAZZCASH_VOID_ENDPOINT="/ApplicationAPI/API/authorize/Void"
JAZZCASH_REFUND_ENDPOINT="/ApplicationAPI/API/authorize/Refund"
JAZZCASH_STATUS_ENDPOINT="/ApplicationAPI/API/PaymentInquiry/Inquire"
JAZZCASH_DIRECT_PAY_ENDPOINT="/ApplicationAPI/API/DirectPay"
JAZZCASH_MOBILE_ENDPOINT="/ApplicationAPI/API/Purchase/DoMWalletTransaction"
JAZZCASH_VOUCHER_ENDPOINT="/ApplicationAPI/API/DoPaymentViaAPI"
JAZZCASH_3DS_ENDPOINT="/ApplicationAPI/API/Purchase/Check3DsEnrollment"
JAZZCASH_PROCESS_ACS_ENDPOINT="/ApplicationAPI/API/ProcessACS"
```

## Usage

This package is intended for backend use only. Import the functions you need into your Node.js server (for example, in an Express app).

### Example: Card Payment Authorization

```javascript
const { authorize } = require('jazzcash-sdk-node');

const cardData = {
  pp_InstrumentType: 'CARD',
  pp_TxnRefNo: 'T' + Date.now(),
  pp_Amount: '10000', // Amount as integer (without decimals)
  pp_TxnCurrency: 'PKR',
  pp_CustomerCardNumber: '4557012345678902',
  pp_CustomerCardExpiry: '1020',
  pp_CustomerCardCvv: '101',
  pp_Frequency: 'SINGLE',
};

authorize(cardData)
  .then((response) => {
    console.log('Authorization Response:', response);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
```

### Example: Mobile Account Payment

```javascript
const { mobileAccountPayment } = require('jazzcash-sdk-node');

const mobileData = {
  pp_TxnRefNo: 'T' + Date.now(),
  pp_Amount: '100',
  pp_TxnDateTime: '20170517101549', // Generate dynamically in production
  pp_BillReference: 'billRef',
  pp_Description: 'Mobile Payment Test',
  pp_TxnExpiryDateTime: '20170824101549',
  pp_ReturnURL: 'https://yourmerchant.com/return',
};

mobileAccountPayment(mobileData)
  .then((response) => {
    console.log('Mobile Payment Response:', response);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
```

### Example: Voucher Payment

```javascript
const { voucherPayment } = require('jazzcash-sdk-node');

const voucherData = {
  pp_TxnRefNo: 'T' + Date.now(),
  pp_Amount: '100',
  pp_TxnDateTime: '20170517101549',
  pp_BillReference: 'billRef',
  pp_Description: 'Voucher Payment Test',
  pp_TxnExpiryDateTime: '20170824101549',
  pp_ReturnURL: 'https://yourmerchant.com/return',
};

voucherPayment(voucherData)
  .then((response) => {
    console.log('Voucher Payment Response:', response);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
```

### Example: 3D Secure Enrollment & ACS Processing

```javascript
const { check3DSecureEnrollment, processACS } = require('jazzcash-sdk-node');

const threeDSData = {
  pp_TxnRefNo: 'T' + Date.now(),
  pp_Amount: '20000',
  pp_TxnCurrency: 'PKR',
  pp_TxnDateTime: '20170512101250',
  pp_TxnExpiryDateTime: '20170514101250',
  pp_BillReference: 'billRef',
  pp_Description: '3DS Enrollment Test',
  pp_CustomerCardNumber: '5111111111111118',
  pp_CustomerCardExpiry: '0517',
  pp_CustomerCardCvv: '100',
};

check3DSecureEnrollment(threeDSData)
  .then((response) => {
    console.log('3DS Enrollment Response:', response);
    // After cardholder completes ACS authentication:
    const acsData = {
      pp_TxnRefNo: threeDSData.pp_TxnRefNo,
      pp_3dSecureID: response.c3dSecureID, // Provided in enrollment response
      pp_TxnDateTime: '20170425210900',
      pp_TxnExpiryDateTime: '20170426210900',
      pp_BillReference: 'billRef',
      pp_Description: 'ACS Processing',
      paRes: 'base64EncodedResponse',
    };
    return processACS(acsData);
  })
  .then((acsResponse) => {
    console.log('ACS Process Response:', acsResponse);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
```

## Roadmap

See the [open issues](https://github.com/itxsaaad/jazzcash-sdk-node) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/itxsaaad/jazzcash-sdk-node/issues/new) to discuss it, or directly create a pull request after you edit the _README.md_ file with necessary changes.
- Please make sure you check your spelling and grammar.
- Create individual PR for each suggestion.
- Please also read through the [Code Of Conduct](https://github.com/itxsaaad/jazzcash-sdk-node/blob/master/CODE_OF_CONDUCT.md) before posting your first idea as well.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the repo
2. Clone the project
3. Create your feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit your changes (`git commit -m "Add some AmazingFeature"`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## Authors

- **Muhammad Saad** - Full Stack Developer - [itxsaaad](https://github.com/itxsaaad)

See also the list of [contributors](https://github.com/itxsaaad/jazzcash-sdk-node/graphs/contributors)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Give ⭐️ if you like this project!

<a href="https://www.buymeacoffee.com/itxSaaad"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="200" /></a>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/itxsaaad/jazzcash-sdk-node.svg?style=for-the-badge
[contributors-url]: https://github.com/itxsaaad/jazzcash-sdk-node/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/itxsaaad/jazzcash-sdk-node.svg?style=for-the-badge
[forks-url]: https://github.com/itxsaaad/jazzcash-sdk-node/network/members
[stars-shield]: https://img.shields.io/github/stars/itxsaaad/jazzcash-sdk-node.svg?style=for-the-badge
[stars-url]: https://github.com/itxsaaad/jazzcash-sdk-node/stargazers
[issues-shield]: https://img.shields.io/github/issues/itxsaaad/jazzcash-sdk-node.svg?style=for-the-badge
[issues-url]: https://github.com/itxsaaad/jazzcash-sdk-node/issues
[license-shield]: https://img.shields.io/github/license/itxsaaad/jazzcash-sdk-node.svg?style=for-the-badge
[license-url]: https://github.com/itxsaaad/jazzcash-sdk-node/blob/main/LICENSE.md
