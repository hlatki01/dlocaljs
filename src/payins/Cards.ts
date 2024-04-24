// Define the interface for the payload
interface Address {
    state?: string;
    city?: string;
    zip_code?: string;
    street?: string;
    number?: string;
    ip?: string;
    device_id?: string;
}

export interface Payer {
    name: string;
    email: string;
    birth_date?: string;
    phone?: string;
    document: string;
    document2?: string;
    user_reference?: string;
    address?: Address;
}

export interface Card {
    holder_name: string;
    expiration_month: number;
    expiration_year: number;
    number: string;
    cvv?: string; // Optional for India and if save=true
    encrypted_data?: string;
    token?: string;
    cvv_token?: string;
    card_id?: string;
    installments?: string;
    installments_id?: string;
    descriptor?: string;
    capture?: boolean;
    save?: boolean;
    stored_credential_type?: string;
    stored_credential_usage?: string;
}


interface CardPayload {
    country?: string;
    card: Card;
    payer: Payer;
}

import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayinsSignature } from '../misc/Generators';
import { Instance } from '../Instance'; // Import the Instance class

export class Cards {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    async createCard(cardPayload: CardPayload): Promise<any> {
        const data = JSON.stringify(cardPayload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/secure_cards`,
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

    async getCard(cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/cards/${cardId}`,
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

    async deleteCard(cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'delete',
            url: `${this.dLocal.getConfig().host}/secure_cards/${cardId}`,
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

    async associateCard(customerId: string, cardPayload: CardPayload): Promise<any> {
        const data = JSON.stringify(cardPayload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/customers/${customerId}/cards`,
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

    async retrieveCustomerCards(customerId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/customers/${customerId}/cards`,
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


    async retrieveCustomerCard(customerId: string, cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/customers/${customerId}/cards/${cardId}`,
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

    async removeCustomerCard(customerId: string, cardId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'delete',
            url: `${this.dLocal.getConfig().host}/customers/${customerId}/cards/${cardId}`,
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
