
const _event_id = Symbol('eventId');
const _event_date = Symbol('eventDate');
const _event_signal_id = Symbol('eventSignalId');
const _event_signal = Symbol('eventSignal');
const _event_device_id = Symbol('eventDeviceId');
const _event_device = Symbol('eventDevice');
const _event_value = Symbol('eventValue');
const _event_deletion_date = Symbol('eventDeletionDate');

module.exports = class Event {
  constructor(eventDate, eventSignalId, eventDeviceId, eventValue) {
    this[_event_date] = eventDate;
    this[_event_signal_id] = eventSignalId;
    this[_event_device_id] = eventDeviceId;
    this[_event_value] = eventValue;
  }


  get eventId() { return this[_event_id]; }
  get eventDate() { return this[_event_date]; }
  get eventSignalId() { return this[_event_signal_id]; }
  get eventSignal() { return this[_event_signal]; }
  get eventDeviceId() { return this[_event_device_id]; }
  get eventDevice() { return this[_event_device]; }
  get eventValue() { return this[_event_value]; }
  get eventDeletionDate() { return this[_event_deletion_date]; }

  set eventDate(newEventDate) { this[_event_date] = newEventDate; }
  set eventSignalId(newEventSignalId) { this[_event_signal_id] = newEventSignalId; }
  set eventSignal(newEventSignal) { this[_event_signal] = newEventSignal; }
  set eventDeviceId(neweventDeviceId) { this[_event_device_id] = neweventDeviceId; }
  set eventDevice(neweventDevice) { this[_event_device] = neweventDevice; }
  set eventValue(neweventValue) { this[_event_value] = neweventValue; }
  set eventDeletionDate(neweventDeletionDate) { this[_event_deletion_date] = neweventDeletionDate; }


  get toJSON() {
    return {
      FECHA_EVENTO: this.eventDate, ID_SENIAL: this.eventSignalId, 
      ID_DISPOSITIVO: this.eventDeviceId, VALOR: this.eventValue
    };
  }


};

