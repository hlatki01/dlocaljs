import { Instance } from "../Instance";
import { AccountValidation } from "./AccountValidation";
import { ExchangeRate } from "./ExchangeRate";
import { Payments } from "./Payments";

export class Payouts {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    get payouts(): Payments {
        return new Payments(this.dLocal);
    }

    get accountValidation(): AccountValidation {
        return new AccountValidation(this.dLocal);
    }

    get exchangeRate(): ExchangeRate {
        return new ExchangeRate(this.dLocal);
    }
}
