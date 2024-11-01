import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputFindProductDto,
  OutputFindProductDto,
} from "./find.product.dto";

export default class FindProductUseCase {
  private _productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this._productRepository = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this._productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
