const _event_date = Symbol('date');
const _event_id_of_signal = Symbol('idOfSignal');
const _event_signal = Symbol('signal');
const _event_id_of_device = Symbol('idOfDevice');
const _event_device = Symbol('device');
const _event_value = Symbol('value');

module.exports = class Event {
  constructor(date, idOfSignal, signal, idOfDevice, device, value) {
    this[_event_date] = date;
    this[_event_id_of_signal] = idOfSignal;
    this[_event_signal] = signal;
    this[_event_id_of_device] = idOfDevice;
    this[_event_device] = device;
    this[_event_value] = value;
  }


  get date() { return this[_event_date]; }
  get idOfSignal() { return this[_event_id_of_signal]; }
  get signal() { return this[_event_signal]; }
  get idOfDevice() { return this[_event_id_of_device]; }
  get device() { return this[_event_device]; }
  get value() { return this[_event_value]; }

  set date(newDate) { this[_event_date] = newDate; }
  set idOfSignal(newIdOfSignal) { this[_event_id_of_signal] = newIdOfSignal; }
  set signal(newSignal) { this[_event_signal] = newSignal; }
  set idOfDevice(newIdOfDevice) { this[_event_id_of_device] = newIdOfDevice; }
  set device(newDevice) { this[_event_device] = newDevice; }
  set value(newValue) { this[_event_value] = newValue; }

  get toJSON() {
    return {
      date: this.date, idOfSignal: this.idOfSignal, signal: this.signal, idOfDevice: this.idOfDevice, device: this.device, value: this.value
    };
  }

 
}; 

