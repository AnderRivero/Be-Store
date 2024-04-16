export default class SaleDto {
  constructor(
    public customerId: number,
    public productId: number,
    public quantity: number,
    public date: Date,
    public unitaryPrice?: number,
    public totalPrice?: number,
    public id?: number
  ) {}

  static create(object: { [key: string]: any }): [string?, SaleDto?] {
    const { customerId, productId, quantity, date, unitaryPrice, totalPrice } = object

    if (!customerId) return ['Missing customerId']
    if (!productId) return ['Missing productId']
    if (!quantity) return ['Missing quantity']
    if (!date) return ['Missing date']

    return [undefined, new SaleDto(customerId, productId, quantity, date, unitaryPrice, totalPrice)]
  }
}
