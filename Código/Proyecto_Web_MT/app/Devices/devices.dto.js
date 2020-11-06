const _device_id = Symbol('deviceId');
const _device_name = Symbol('deviceName');
const _device_deletion_date = Symbol('deviceDeletionDate');

module.exports = class Device {
  constructor(deviceName) {
    this[_device_name] = deviceName;
  }

  get deviceId() { return this[_device_id]; }
  get deviceName() { return this[_device_name]; }
  get deviceDeletionDate() { return this[_device_deletion_date]; }

  set deviceName(newDeviceName) { this[_device_name] = newDeviceName; }
  set deviceDeletionDate(newDeviceDeletionDate) { this[_device_deletion_date] = newDeviceDeletionDate; }

  get toJSON() {
    return {
      N_DISPOSITIVO: this.deviceName,
      FECHA_BAJA: this.deviceDeletionDate
    };
  }

};

