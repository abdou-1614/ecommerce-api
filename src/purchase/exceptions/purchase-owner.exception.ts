import { PurchaseException } from './purchase-input.exception';
export class NotOwnerPurchase extends PurchaseException {
    constructor() {
        super('Purchase Not Found')
    }
}