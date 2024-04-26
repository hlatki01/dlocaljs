import { Instance } from "../Instance";
import { Cards } from "./Cards";
import { Chargebacks } from "./Chargebacks";
import { Customers } from "./Customers";
import { ExchangeRate } from "./ExchangeRate";
import { Installments } from "./Installments";
import { Orders } from "./Orders";
import { PaymentMethods } from "./PaymentMethods";
import { Payments } from "./Payments";
import { Refunds } from "./Refunds";

export class Payins {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    get installments(): Installments {
        return new Installments(this.dLocal);
    }

    get paymentMethods(): PaymentMethods {
        return new PaymentMethods(this.dLocal);
    }

    get payments(): Payments {
        return new Payments(this.dLocal);
    }

    get exchangeRate(): ExchangeRate {
        return new ExchangeRate(this.dLocal);
    }

    get customers(): Customers {
        return new Customers(this.dLocal);
    }

    get cards(): Cards {
        return new Cards(this.dLocal);
    }

    get orders(): Orders {
        return new Orders(this.dLocal);
    }

    get refunds(): Refunds {
        return new Refunds(this.dLocal);
    }

    get chargebacks(): Chargebacks {
        return new Chargebacks(this.dLocal);
    }

}