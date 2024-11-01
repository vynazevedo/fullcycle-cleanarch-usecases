import EventDispatcher from "../../@shared/event/event-dispatcher";
import AddressUpdatedEvent from "./address-updated.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/EnviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "./handler/EnviaConsoleLog2Handler";
import EnviaConsoleLogHandler from "./handler/EnviaConsoleLogHandler";

describe("Customer events tests", () => {
  it("should notify CustomerCreatedEvent handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

    const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler,"handle");
    const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler,"handle");

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(enviaConsoleLog1Handler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(enviaConsoleLog2Handler);

    const productCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Jhon Doe",
      street: "Street",
      number: 123,
      zipcode: "zip",
      city: "City",
      active: true,
      rewardPoints: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(enviaConsoleLog1Handler.handle).toHaveBeenCalledWith(productCreatedEvent);
    expect(enviaConsoleLog2Handler.handle).toHaveBeenCalledWith(productCreatedEvent);
    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
  });

  it("should notify AddressUpdatedEvent handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler,"handle");
    eventDispatcher.register("AddressUpdatedEvent", enviaConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]).toMatchObject(enviaConsoleLogHandler);

    const addressUpdatedEvent = new AddressUpdatedEvent({
      id: "1",
      name: "Jhon Doe",
      address: "Street, 321, Zip, City",
    });

    eventDispatcher.notify(addressUpdatedEvent);
    expect(enviaConsoleLogHandler.handle).toHaveBeenCalledWith(addressUpdatedEvent);
    expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();
  });
});
