
// Define an interface for the payload
interface Split {
    account_id: string;
    amount: string;
}

interface Submerchant {
    merchant_reference: string;
    name: string;
    website: string;
    industry: number;
    document: string;
    nationality: string;
    email: string;
    username: string;
    phone: string;
    created_date: string;
    total_order_count: number;
    total_order_amount: number;
    last_updated_date: string;
    onboarding_ip_address: string;
    onboarding_email: string;
    reputation: number;
    ship_from_address: {
        state: string;
        city: string;
        zip_code: string;
        street: string;
        number: string;
    };
    last_login: string;
    device_id: string;
    KYC_review: boolean;
    Fraud_review: boolean;
    Fraud_review_type: string;
    Fraud_review_description: string;
    submerchant_description: string;
    Checkout_type: string;
    Checkout_subtype: string;
    Registered_Company: boolean;
    bank_account: {
        beneficiary_name: string;
        beneficiary_document: string;
        account: string;
        branch: string;
        beneficiary_email: string;
        beneficiary_phone: string;
    };
}

interface Shipping {
    address: {
        state: string;
        city: string;
        zip_code: string;
        street: string;
        number: string;
    };
    is_physical: boolean;
    cost: number;
    delivery_company: string;
    method: string;
    delivery_date: string;
    is_forwarding_address: boolean;
    geolocation: string;
}

interface Beneficiary {
    email: string;
    name: string;
    phone: string;
    document: string;
}

interface BasketItem {
    unit_price: number;
    brand: string;
    category: string;
    item_reference: string;
    upc: string;
    manufacturer: string;
    product_name: string;
    quantity: number;
    size: string;
    subcategory: string;
    url: string;
    published_date: string;
    rating: number;
    count_reviews: number;
    image: string;
    stock: number;
    weight: number;
    subscription?: {
        id: string;
        period: string;
        current_period: number;
        end_date: string;
    };
}

interface PayerRiskData {
    email_is_valid: boolean;
    phone_is_valid: boolean;
    account_creation_date: string;
    first_purchase_date: string;
    is_positive: boolean;
    last_order_id: string;
    total_order_count: number;
    total_order_amount: number;
    last_updated_date: string;
    wish_list: {
        item_reference: string;
        unit_price: number;
        product_name: string;
    }[];
    reputation: number;
}

interface DiscountCode {
    amount: number;
    percentage: number;
    code: string;
    valid_until: string;
    description: string;
}

interface Device {
    user_agent: string;
    geolocation: string;
    locale: string;
    advertising_id: string;
    vendor_id: string;
    android_id: string;
    media_drm_id: string;
    event_uuid: string;
}

interface Purchase {
    is_retry: boolean;
    channel: string;
    time_in_session: number;
    search_history: {
        item_reference: string;
        unit_price: number;
        product_name: string;
    }[];
}

interface Travel {
    car_rental?: {
        insurance_charges: number;
        pickup_city: string;
        pickup_country: string;
        pickup_date: string;
        rental_charges: number;
        return_city: string;
        return_country: string;
        return_date: string;
    }[];
    flight?: {
        itinerary: {
            flight_code: string;
            reservation_code: string;
            legs: {
                amount: number;
                arrival: string;
                arrival_time: string;
                carrier_code: string;
                class_of_travel: string;
                departure: string;
                departure_time: string;
                destination: string;
            }[];
        };
        passengers: {
            date_of_birth: string;
            ffp_ID: string;
            first_name: string;
            last_name: string;
            nationality: string;
        }[];
    };
    lodging?: {
        amount: number;
        check_in_date: string;
        check_out_date: string;
        city: string;
        country: string;
        guests: number;
        prepaid_expenses: number;
        rooms: number;
    }[];
}

interface Driver {
    account_creation_date: string;
    reputation: number;
    number_of_rides: number;
    name: string;
    phone: string;
    document: string;
    user_reference: string;
}

interface Trip {
    pick_up_address: {
        state: string;
        city: string;
        zip_code: string;
        street: string;
        number: string;
    };
    pick_up_geo_loc: string;
    drop_off_address: {
        state: string;
        city: string;
        zip_code: string;
        street: string;
        number: string;
    };
    drop_off_geo_loc: string;
    estimated_time: number;
    distance: number;
}

interface Rider {
    reputation: number;
}

interface AdditionalRiskData {
    submerchant: Submerchant;
    shipping: Shipping;
    beneficiary: Beneficiary;
    basket: BasketItem[];
    payer: PayerRiskData;
    discount_codes: DiscountCode[];
    device: Device;
    purchase: Purchase;
    travel: Travel;
    driver: Driver;
    trip: Trip;
    rider: Rider;
}

interface PaymentPayload {
    amount: number;
    currency: string;
    payment_method_id?: string;
    payment_method_flow: 'DIRECT' | 'REDIRECT';
    country: string;
    order_id: string;
    original_order_id?: string;
    description?: string;
    notification_url?: string;
    callback_url?: string;
    additional_risk_data?: AdditionalRiskData; // Adjusted to object type
    card?: Card;
    payer: Payer;
    splits?: Split[];
}


import axios, { AxiosRequestConfig } from 'axios';
import { calculatePayinsSignature } from '../misc/Generators';
import { Instance } from '../Instance'; // Import the Instance class
import { Card, Payer } from './Cards';

export class Payments {
    private readonly dLocal: Instance; // Store the DLocal instance

    constructor(dLocal: Instance) {
        this.dLocal = dLocal;
    }

    async createPayment(paymentsPayload: PaymentPayload, isSecurePayments?: boolean): Promise<any> {
        const data = JSON.stringify(paymentsPayload);
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey, data);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/${isSecurePayments ? 'secure_payments' : 'payments'}`,
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

    async getPayment(paymentId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/payments/${paymentId}`,
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

    async getPaymentStatus(paymentId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.dLocal.getConfig().host}/payments/${paymentId}/status`,
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

    async cancelPayment(paymentId: string): Promise<any> {
        const timestamp = new Date().toJSON();
        const authorization = calculatePayinsSignature(timestamp, this.dLocal.getConfig().xLogin, this.dLocal.getConfig().secretKey);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.dLocal.getConfig().host}/payments/${paymentId}/cancel`,
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
