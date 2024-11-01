import CreateProductUseCase from "./create.customer.usecase";
import { InputCreateProductDto } from "./create.product.dto";

const input : InputCreateProductDto = {
  name: "Product A",
  price: 10
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateProductUseCase(customerRepository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateProductUseCase(customerRepository);
    input.name = "Product A";
    input.price = -1;

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});
