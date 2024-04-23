import axios, { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig
import { calculatePayinsSignature } from '../misc/Generators';

export class Customers {
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

}
