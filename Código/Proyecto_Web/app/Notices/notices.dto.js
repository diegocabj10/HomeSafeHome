const _notice_id = Symbol('noticeId');
const _notice_date = Symbol('noticeDate');
const _notice_title = Symbol('noticeTitle');
const _notice_message = Symbol('noticeMessage');
const _notice_user_id = Symbol('noticeUserId');
const _notice_deletion_date = Symbol('noticeDeletionDate');

module.exports = class notice {
  constructor(noticeDate, noticeTitle, noticeMessage, noticeUserId) {
    this[_notice_date] = noticeDate;
    this[_notice_title] = noticeTitle;    
    this[_notice_message] = noticeMessage;
    this[_notice_user_id] = noticeUserId;
  }

  get noticeId() { return this[_notice_id]; }
  get noticeDate() { return this[_notice_date]; }
  get noticeTitle() { return this[_notice_title]; }
  get noticeMessage() { return this[_notice_message]; }
  get noticeUserId() { return this[_notice_user_id]; }
  get noticeDeletionDate() { return this[_notice_deletion_date]; }

  set noticeDate(newNoticeDate) { this[_notice_date] = newNoticeDate; }
  set noticeTitle(newNoticeTitle) { this[_notice_title] = newNoticeTitle; }
  set noticeMessage(newNoticeMessage) { this[_notice_message] = newNoticeMessage; }
  set noticeUserId(newNoticeUserId) { this[_notice_user_id] = newNoticeUserId; }
  set noticeDeletionDate(newNoticeDeletionDate) { this[_notice_deletion_date] = newNoticeDeletionDate; }

  get toJSON() {
    return {
      //noticeId: this.noticeId, 
      FECHA: this.noticeDate, 
      TITULO: this.noticeTitle, 
      MENSAJE: this.noticeMessage,
      ID_USUARIO: this.noticeUserId, 
      FECHA_BAJA: this.noticeDeletionDate
    };
  }

};