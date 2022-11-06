import {User} from "./user";

export class Admin extends User {

  constructor(
    id,
    email,
    firstName,
    lastName,  
    password,
  
  ) {
    super(id, email, firstName, lastName, password);       
  }
}