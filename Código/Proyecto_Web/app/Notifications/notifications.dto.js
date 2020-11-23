const _notification_id = Symbol('notificationId');
const _notification_date = Symbol('notificationDate');
const _notification_lecture_date = Symbol('notificationReadDate');
const _notification_user_id = Symbol('notificationUserId');
const _notification_event_id = Symbol('notificationEventId');
const _notification_deletion_date = Symbol('notificationDeletionDate');
const _notification_title = Symbol('notificationTitle');
const _notification_message = Symbol('notificationMessage');

module.exports = class notification {
    constructor(notificationDate, notificationReadDate, notificationUserId, notificationEventId, notificationTitle, notificationMessage) {
        this[_notification_date] = notificationDate;
        this[_notification_lecture_date] = notificationReadDate;
        this[_notification_user_id] = notificationUserId;
        this[_notification_event_id] = notificationEventId;
        this[_notification_title] = notificationTitle;
        this[_notification_message] = notificationMessage;
    }

    get notificationId() { return this[_notification_id]; }
    get notificationDate() { return this[_notification_date]; }
    get notificationReadDate() { return this[_notification_lecture_date]; }    
    get notificationUserId() { return this[_notification_user_id]; }
    get notificationEventId() { return this[_notification_event_id]; }
    get notificationDeletionDate() { return this[_notification_deletion_date]; }
    get notificationTitle() { return this[_notification_title]; }
    get notificationMessage() { return this[_notification_message]; }

    set notificationDate(newnotificationDate) { this[_notification_date] = newnotificationDate; }
    set notificationReadDate(newnotificationReadDate) { this[_notification_lecture_date] = newnotificationReadDate; }
    set notificationUserId(newnotificationUserId) { this[_notification_user_id] = newnotificationUserId; }
    set notificationEventId(newnotificationEventId) { this[_notification_event_id] = newnotificationEventId; }
    set notificationDeletionDate(newnotificationDeletionDate) { this[_notification_deletion_date] = newnotificationDeletionDate; }
    set notificationTitle(newnotificationTitle) { this[_notification_title] = newnotificationTitle; }
    set notificationMessage(newnotificationMessage) { this[_notification_message] = newnotificationMessage; }

    get toJSON() {
        return {
            //notificationId: this.notificationId, 
            FECHA_NOTIFICACION: this.notificationDate,
            FECHA_LECTURA: this.notificationReadDate,
            ID_USUARIO: this.notificationUserId,
            ID_EVENTO: this.notificationEventId,
            FECHA_BAJA: this.notificationDeletionDate,
            TITULO: this.notificationTitle,
            MENSAJE: this.notificationMessage
        };
    }

};