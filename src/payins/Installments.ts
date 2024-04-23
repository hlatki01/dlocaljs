// Define an interface for the payload
interface InstallmentsPayload {
    country: string;
    bin: string;
    amount: number;
    currency: string;
}

import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayinsSignature } from '../misc/Generators';

export class Installments {
    private readonly DLOCAL_HOST: string;
    private readonly DLOCAL_X_LOGIN: string;
    private readonly DLOCAL_TRANS_KEY: string;
    private readonly DLOCAL_SECRET_KEY: string;

    constructor() {
        this.DLOCAL_HOST = process.env.DLOCAL_HOST as string;
        this.DLOCAL_X_LOGIN = process.env.DLOCAL_X_LOGIN as string;
        this.DLOCAL_TRANS_KEY = process.env.DLOCAL_TRANS_KEY as string;
        this.DLOCAL_SECRET_KEY = process.env.DLOCAL_SECRET_KEY as string;
    }

    async createInstallmentsPlan(payload: InstallmentsPayload): Promise<any> {
        const data = JSON.stringify(payload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.DLOCAL_HOST}/installments-plans`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.DLOCAL_X_LOGIN,
                'X-Trans-Key': this.DLOCAL_TRANS_KEY,
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
