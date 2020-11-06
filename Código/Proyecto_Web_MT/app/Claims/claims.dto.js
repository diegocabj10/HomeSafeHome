const _claim_id = Symbol('claimId');
const _claim_date = Symbol('claimDate');
const _claim_title = Symbol('claimTitle');
const _claim_message = Symbol('claimMessage');
const _claim_response = Symbol('claimResponse');
const _claim_user_id = Symbol('claimUserId');
const _claim_deletion_date = Symbol('claimDeletionDate');

module.exports = class Claim {
  constructor(claimDate, claimTitle, claimMessage, claimUserId) {
    this[_claim_date] = claimDate;
    this[_claim_title] = claimTitle;
    this[_claim_message] = claimMessage;
    this[_claim_user_id] = claimUserId;
  }

  get claimId() { return this[_claim_id]; }
  get claimDate() { return this[_claim_date]; }
  get claimTitle() { return this[_claim_title]; }
  get claimMessage() { return this[_claim_message]; }
  get claimResponse() { return this[_claim_response]; }
  get claimUserId() { return this[_claim_user_id]; }
  get claimDeletionDate() { return this[_claim_deletion_date]; }

  set claimDate(newClaimDate) { this[_claim_date] = newClaimDate; }
  set claimTitle(newClaimTitle) { this[_claim_title] = newClaimTitle; }
  set claimMessage(newClaimMessage) { this[_claim_message] = newClaimMessage; }
  set claimResponse(newClaimResponse) { this[_claim_response] = newClaimResponse; }
  set claimUserId(newClaimUserId) { this[_claim_user_id] = newClaimUserId; }
  set claimDeletionDate(newClaimDeletionDate) { this[_claim_deletion_date] = newClaimDeletionDate; }

  get toJSON() {
    return {
      FECHA_RECLAMO: this.claimDate,
      TITULO: this.claimTitle,
      MENSAJE: this.claimMessage,
      RESPUESTA: this.claimResponse,
      ID_USUARIO: this.claimUserId,
      FECHA_BAJA: this.claimDeletionDate
    };
  }

};