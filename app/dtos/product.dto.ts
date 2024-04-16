export default class ProductDto {
  constructor(
    public name: string,
    public price: number,
    public isActive: boolean,
    public id?: number
  ) {}

  static create(object: { [key: string]: any }): [string?, ProductDto?] {
    const { name, price, isActive = true } = object
    if (!name) return ['Missing name']
    if (!price) return ['Missing price']

    return [undefined, new ProductDto(name, price, isActive)]
  }
}
