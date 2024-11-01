import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.customer.usecase";
const product = ProductFactory.createNewProduct("Product A",10);

const input = {
  id: product.id,
  name: "Product AB",
  price: 10
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
