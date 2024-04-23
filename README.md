# dlocaljs

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A Node.js library for interacting with the DLocal API.

## Installation

You can install the library via npm:

```bash
npm install dlocaljs
```

## Usage

```javascript
const { Payins } = require('dlocaljs');

// Create an instance of Payins
const payins = new Payins();

// Use the methods provided by the Payins class
// For example:
payins.createPayment(payload)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
```

## Configuration
Before using the library, make sure to set the following environment variables:

* `DLOCAL_HOST`: The base URL of the DLocal API.
* `DLOCAL_X_LOGIN`: Your dLocal API login.
* `DLOCAL_TRANS_KEY`: Your dLocal API transaction key.
* `DLOCAL_SECRET_KEY`: Your dLocal API secret key.

## Documentation
For detailed documentation, refer to the API documentation.

## Contributing
Contributions are welcome! Please see the contribution guidelines for more information.

## License
This project is licensed under the MIT License.
