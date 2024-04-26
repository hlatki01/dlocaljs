import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayinsSignature } from '../misc/Generators';
import { Instance } from '../Instance'; // Import the Instance class

export class Chargebacks {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    async getChargeback(chargebackId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/chargebacks/${chargebackId}`,
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

    async getChargebackStatus(chargebackId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/chargebacks/${chargebackId}/status`,
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

}
