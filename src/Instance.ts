import { Payouts } from "./payouts/Payouts";
import { Payins } from "./payins/Payins";

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

    getPayouts(): Payouts {
        return new Payouts(this);
    }
    
    getPayins(): Payins {
        return new Payins(this);
    }

}
