import EventInterface from "../../@shared/event/event.interface";

export default class AddressUpdatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: {
    id: string;
    name: string;
    address: string;
  };

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
