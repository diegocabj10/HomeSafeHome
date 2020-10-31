
const _event_id = Symbol('eventId');
const _event_date = Symbol('eventDate');
const _event_id_of_signal = Symbol('eventIdOfSignal');
const _event_signal = Symbol('eventSignal');
const _event_id_of_device = Symbol('eventIdOfDevice');
const _event_device = Symbol('eventDevice');
const _event_value = Symbol('eventValue');
const _event_deletion_date = Symbol('eventDeletionDate');

module.exports = class Event {
  constructor(eventDate, eventIdOfSignal, eventIdOfDevice, eventValue) {
    this[_event_date] = eventDate;
    this[_event_id_of_signal] = eventIdOfSignal;
    this[_event_id_of_device] = eventIdOfDevice;
    this[_event_value] = eventValue;
  }


  get eventId() { return this[_event_id]; }
  get eventDate() { return this[_event_date]; }
  get eventIdOfSignal() { return this[_event_id_of_signal]; }
  get eventSignal() { return this[_event_signal]; }
  get eventIdOfDevice() { return this[_event_id_of_device]; }
  get eventDevice() { return this[_event_device]; }
  get eventValue() { return this[_event_value]; }
  get eventDeletionDate() { return this[_event_deletion_date]; }

  set eventDate(newEventDate) { this[_event_date] = newEventDate; }
  set eventIdOfSignal(newEventIdOfSignal) { this[_event_id_of_signal] = newEventIdOfSignal; }
  set eventSignal(newEventSignal) { this[_event_signal] = newEventSignal; }
  set eventIdOfDevice(neweventIdOfDevice) { this[_event_id_of_device] = neweventIdOfDevice; }
  set eventDevice(neweventDevice) { this[_event_device] = neweventDevice; }
  set eventValue(neweventValue) { this[_event_value] = neweventValue; }
  set eventDeletionDate(neweventDeletionDate) { this[_event_deletion_date] = neweventDeletionDate; }


  get toJSON() {
    return {
      eventId: this.eventId, eventDate: this.eventDate, eventIdOfSignal: this.eventIdOfSignal, eventSignal: this.eventSignal,
      eventIdOfDevice: this.eventIdOfDevice, eventDevice: this.eventDevice, eventValue: this.eventValue, eventDeletionDate: this.eventDeletionDate
    };
  }


};

