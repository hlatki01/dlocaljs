
import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayinsSignature } from '../misc/Generators';
import { Instance } from '../Instance'; // Import the Instance class

export class ExchangeRate {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    async getCurrencyExchange(login: string, pass: string, currency: string): Promise<any> {
        const data = JSON.stringify({ login, pass, currency });

        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, data);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/api_curl/cashout_api/get_exchange_rate`,
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
