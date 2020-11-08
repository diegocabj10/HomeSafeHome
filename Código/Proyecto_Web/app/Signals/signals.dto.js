const _signal_id = Symbol('signalId');
const _signal_name = Symbol('signalName');
const _signal_deletion_date = Symbol('signalDeletionDate');

module.exports = class signal {
  constructor(signalName) {
    this[_signal_name] = signalName;
  }

  get signalId() { return this[_signal_id]; }
  get signalName() { return this[_signal_name]; }
  get signalDeletionDate() { return this[_signal_deletion_date]; }

  set signalName(newSignalName) { this[_signal_name] = newSignalName; }
  set signalDeletionDate(newSignalDeletionDate) { this[_signal_deletion_date] = newSignalDeletionDate; }

  get toJSON() {
    return {
      N_SENIAL: this.signalName, 
      FECHA_BAJA: this.signalDeletionDate
    };
  }

};

