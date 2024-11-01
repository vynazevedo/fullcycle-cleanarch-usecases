import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.customer.dto";
export default class UpdateProductUseCase {
  private _productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this._productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this._productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);
    
    await this._productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
