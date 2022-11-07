import {User} from "./user";

export class Admin extends User {
  createdAt;
  constructor(
    id,
    email,
    firstName,
    lastName,  
    password,
    createdAt
  ) {
    super(id, email, firstName, lastName, password);       
    this.createdAt = createdAt;
  }
}