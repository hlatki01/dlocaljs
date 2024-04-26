interface AccountPayload {
    country?: string;
    account_type?: string;
    bank_code?: string;
    account?: string;
}

import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayinsSignature } from '../misc/Generators';
import { Instance } from '../Instance'; // Import the Instance class

export class AccountValidation {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    async validate(accountPayload: AccountPayload): Promise<any> {
        const data = JSON.stringify(accountPayload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/payouts/validation/external-account`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.dLocal.getConfig().xLogin,
                'X-Trans-Key': this.dLocal.getConfig().transKey,
                'Authorization': authorization,
                'Content-Type': 'application/json',
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data.message;
            } else {
                throw (error as Error).message;
            }
        }
    }

}
