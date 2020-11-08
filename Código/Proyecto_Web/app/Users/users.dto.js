const _user_id = Symbol('userId');
const _user_login = Symbol('userLogin');
const _user_start_date = Symbol('userStartDate');
const _user_end_date = Symbol('userEndDate');
const _user_email = Symbol('userEmail');
const _user_password = Symbol('userPassword');
const _user_name = Symbol('userName');
const _user_surname = Symbol('userSurname');
const _user_last_login = Symbol('userLastLogin');
const _user_deletion_date = Symbol('userDeletionDate');

module.exports = class User {
  constructor(userStartDate, userEmail, userPassword, userName, userSurname) {
    this[_user_start_date] = userStartDate;
    this[_user_email] = userEmail;
    this[_user_password] = userPassword;
    this[_user_name] = userName;
    this[_user_surname] = userSurname;
  }

  get userId() { return this[_user_id]; }
  get userLogin() { return this[_user_login]; }
  get userStartDate() { return this[_user_start_date]; }
  get userEndDate() { return this[_user_end_date]; }
  get userEmail() { return this[_user_email]; }
  get userLastLogin() { return this[_user_last_login]; }
  get userPassword() { return this[_user_password]; }
  get userName() { return this[_user_name]; }
  get userSurname() { return this[_user_surname]; }
  get userDeletionDate() { return this[_user_deletion_date]; }

  set userLogin(newUserLogin) { this[_user_login] = newUserLogin; }
  set userStartDate(newUserStartDate) { this[_user_start_date] = newUserStartDate; }
  set userEndDate(newUserEndDate) { this[_user_end_date] = newUserEndDate; }
  set userEmail(newUserEmail) { this[_user_email] = newUserEmail; }
  set userPassword(newUserPassword) { this[_user_password] = newUserPassword; }
  set userName(newUserName) { this[_user_name] = newUserName; }
  set userSurname(newUserSurname) { this[_user_surname] = newUserSurname; }
  set userLastLogin(newUserLastLogin) { this[_user_last_login] = newUserLastLogin; }
  set userDeletionDate(newUserDeletionDate) { this[_user_deletion_date] = newUserDeletionDate; }

  get toJSON() {
    return {
      LOGIN: this.userLogin, 
      FECHA_INICIO: this.userStartDate, 
      FECHA_FIN: this.userEndDate, 
      EMAIL: this.userEmail, 
      PASSWORD: this.userPassword,
      NOMBRE: this.userName, 
      APELLIDO: this.userSurname,
      ULTIMO_LOGIN: this.userLastLogin, 
      FECHA_BAJA: this.userDeletionDate
    };
  }

};