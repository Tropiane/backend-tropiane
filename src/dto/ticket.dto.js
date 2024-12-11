
export default class ticketDto {
    constructor(code, purchaseDatetime, amount, purchaser, status) {
        this.code = code
        this.purchaseDatetime = purchaseDatetime
        this.amount = amount
        this.purchaser = purchaser
        this.status = status
    }
}