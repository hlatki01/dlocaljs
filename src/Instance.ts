import axios, { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig
import { calculatePayinsSignature } from './misc/Generators';
import { Installments } from './payins/Installments';
import { PaymentMethods } from './payins/PaymentMethods';
import { Payments } from './payins/Payments';
import { ExchangeRate } from './payins/ExchangeRate';
import { Customers } from './payins/Customers';
import { Cards } from './payins/Cards';

interface DLocalConfig {
    host: string;
    xLogin: string;
    transKey: string;
    secretKey: string;
}

export class Instance {
    private static instance: Instance | null = null;
    private config: DLocalConfig;

    private constructor(host: string, xLogin: string, transKey: string, secretKey: string) {
        this.config = {
            host,
            xLogin,
            transKey,
            secretKey
        };
    }

    static getInstance(host: string, xLogin: string, transKey: string, secretKey: string): Instance {
        if (!Instance.instance) {
            Instance.instance = new Instance(host, xLogin, transKey, secretKey);
        }
        return Instance.instance;
    }

    getConfig(): DLocalConfig {
        return this.config;
    }

    get installments(): Installments {
        return new Installments(this);
    }

    get paymentMethods(): PaymentMethods {
        return new PaymentMethods(this);
    }

    get payments(): Payments {
        return new Payments(this);
    }

    get exchangeRate(): ExchangeRate {
        return new ExchangeRate(this);
    }

    get customers(): Customers {
        return new Customers(this);
    }

    get cards(): Cards {
        return new Cards(this);
    }
}
