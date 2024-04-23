import axios, { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig
import { calculatePayinsSignature } from '../misc/Generators';

export class Cards {
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

    async createCard(payload: any): Promise<any> {
        const data = JSON.stringify(payload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.DLOCAL_HOST}/secure_cards`,
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

    async getCard(cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.DLOCAL_HOST}/cards/${cardId}`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.DLOCAL_X_LOGIN,
                'X-Trans-Key': this.DLOCAL_TRANS_KEY,
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

    async deleteCard(cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY);

        const config: AxiosRequestConfig = {
            method: 'delete',
            url: `${this.DLOCAL_HOST}/secure_cards/${cardId}`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.DLOCAL_X_LOGIN,
                'X-Trans-Key': this.DLOCAL_TRANS_KEY,
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

    async associateCard(customerId: string, payload: any): Promise<any> {
        const data = JSON.stringify(payload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.DLOCAL_HOST}/customers/${customerId}/cards`,
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

    async retriveCustomerCards(customerId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.DLOCAL_HOST}/customers/${customerId}/cards`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.DLOCAL_X_LOGIN,
                'X-Trans-Key': this.DLOCAL_TRANS_KEY,
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

    async retriveCustomerCard(customerId: string, cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.DLOCAL_HOST}/customers/${customerId}/cards/${cardId}`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.DLOCAL_X_LOGIN,
                'X-Trans-Key': this.DLOCAL_TRANS_KEY,
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

    async removeCustomerCard(customerId: string, cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.DLOCAL_X_LOGIN, this.DLOCAL_SECRET_KEY);

        const config: AxiosRequestConfig = {
            method: 'delete',
            url: `${this.DLOCAL_HOST}/customers/${customerId}/cards/${cardId}`,
            headers: {
                'X-Date': timestamp,
                'X-Login': this.DLOCAL_X_LOGIN,
                'X-Trans-Key': this.DLOCAL_TRANS_KEY,
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