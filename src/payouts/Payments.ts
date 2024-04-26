
import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayoutsSignature } from '../misc/Generators';
import { Instance } from '../Instance'; // Import the Instance class

export class Payments {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    async submitPayout(payoutPayload: any): Promise<any> {
        if (payoutPayload && payoutPayload.login && payoutPayload.pass) {
            throw 'The parameters: login and pass shouldnt be send in the payload.';
        }

        payoutPayload.login = this.dLocal.getConfig().xLogin
        payoutPayload.pass = this.dLocal.getConfig().transKey

        const authorization = calculatePayoutsSignature(this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, this.dLocal.getConfig().transKey, payoutPayload)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/api_curl/cashout_api/request_cashout`,
            headers: {
                'Payload-Signature': `${authorization}`,
                'Content-Type': 'application/json'
            },
            data: payoutPayload
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

    async getPayout(payoutId?: string, externalId?: string): Promise<any> {
        if (!payoutId && !externalId) {
            throw 'You need to send either the payout_id or external_id';
        }

        const timestamp = new Date().toJSON();
        const authorization = calculatePayoutsSignature(this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, this.dLocal.getConfig().transKey)

        const params = {
            payoutId,
            externalId,
        };

        const queryString = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
            .join('&');

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/payouts${queryString ? '?' + queryString : ''}`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.dLocal.getConfig().xLogin,
                'X-Trans-Key': this.dLocal.getConfig().transKey,
                'Authorization': authorization,
                'Content-Type': 'application/json',
            }
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

    async getPayoutReceipt(payoutId?: string, externalId?: string, includeLogo?: boolean): Promise<any> {
        if (!payoutId && !externalId) {
            throw 'You need to send either the payout_id or external_id';
        }
        const timestamp = new Date().toJSON();
        const authorization = calculatePayoutsSignature(this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, this.dLocal.getConfig().transKey)

        const params = {
            payoutId,
            externalId,
        };

        const queryString = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
            .join('&');

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/payouts/receipt${queryString ? '?' + queryString : ''}`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.dLocal.getConfig().xLogin,
                'X-Trans-Key': this.dLocal.getConfig().transKey,
                'Authorization': authorization,
                'Content-Type': 'application/json',
            }
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

    async cancelPayout(externalId: string, cashoutId: string): Promise<any> {
        if (!cashoutId && !externalId) {
            throw 'You need to send either the cashout_id or external_id';
        }

        const data = { login: this.dLocal.getConfig().xLogin, pass: this.dLocal.getConfig().transKey, external_id: externalId, cashout_id: cashoutId }

        const authorization = calculatePayoutsSignature(this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, this.dLocal.getConfig().transKey, data)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/api_curl/cashout_api/cancel_cashout`,
            headers: {
                'payload-signature': authorization,
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

    async releasePayout(externalId: string, cashoutId: string): Promise<any> {

        const data = { login: this.dLocal.getConfig().xLogin, pass: this.dLocal.getConfig().transKey, external_id: externalId, cashout_id: cashoutId }

        const authorization = calculatePayoutsSignature(this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, this.dLocal.getConfig().transKey, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/api_curl/cashout_api/release_cashout`,
            headers: {
                'payload-signature': authorization,
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
