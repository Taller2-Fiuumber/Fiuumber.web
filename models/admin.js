import {User} from "./user";

export class Admin extends User {
  // createdAt;
  adminId;
  constructor(
    adminId,
    email,
    firstName,
    lastName,  
    password,
    // createdAt
  ) {
    super(email, firstName, lastName, password);       
    this.adminId = adminId;

    // this.createdAt = createdAt;
  }
}
