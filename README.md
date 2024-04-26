# dlocaljs

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A Node.js library for interacting with the DLocal API.

## Installation
You can install the library via npm:

```bash
npm install dlocaljs
```

or if its locally

```bash
npm install {{file-path}}\dlocaljs-{{version}}.tgz
```

## Usage

```javascript
import dLocalInstance from "dlocaljs"; 

// Create an instance of Payins
const dLocal = dLocalInstance.getInstance(process.env.DLOCAL_HOST, process.env.DLOCAL_X_LOGIN, process.env.DLOCAL_TRANS_KEY, process.env.DLOCAL_SECRET_KEY)

// Use the methods provided by the dLocal instace
// For example:
async createInstallmentsPlan(req: Request, res: Response) {
    try {
        const { amount, bin, currency, country } = req.body;
        const installments = await dLocal.getPayins().installments.createInstallmentsPlan({
            amount,
            bin,
            currency,
            country
        })
        res.status(200).json(installments);
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "" + error });
    }
}
```

## Configuration
Before using the library, make sure to set the following environment variables:

* `DLOCAL_HOST`: The base URL of the DLocal API - it can be either https://sandbox.dlocal.com or https://api.dlocal.com.
* `DLOCAL_X_LOGIN`: Your dLocal API login.
* `DLOCAL_TRANS_KEY`: Your dLocal API transaction key.
* `DLOCAL_SECRET_KEY`: Your dLocal API secret key.

## Documentation
For detailed documentation, refer to the API documentation.

## Contributing
Contributions are welcome! Please see the contribution guidelines for more information.

## License
This project is licensed under the MIT License.
