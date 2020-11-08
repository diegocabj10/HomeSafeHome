const _device_id = Symbol('deviceId');
const _device_name = Symbol('deviceName');
const _device_deletion_date = Symbol('deviceDeletionDate');

module.exports = class Device {
  constructor(deviceId, deviceName, deviceDeletionDate) {
    this[_device_id] = deviceId;
    this[_device_name] = deviceName;
    this[_device_deletion_date] = deviceDeletionDate;
  }

  get deviceId() { return this[_device_id]; }
  get deviceName() { return this[_device_name]; }
  get deviceDeletionDate() { return this[_device_deletion_date]; }

  set deviceName(newDeviceName) { this[_device_name] = newDeviceName; }
  set deviceDeletionDate(newDeviceDeletionDate) { this[_device_deletion_date] = newDeviceDeletionDate; }

  get toJSON() {
    return {
      deviceId: this.deviceId, deviceName: this.deviceName, deviceDeletionDate: this.deviceDeletionDate
    };
  }
};

