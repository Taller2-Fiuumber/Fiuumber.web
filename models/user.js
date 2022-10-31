import { Wallet } from "./wallet";

export class User {
  id;
  email;
  firstName;
  lastName;
  location;
  blocked;
  password;
  wallet;


  constructor(
    id,
    email,
    firstName,
    lastName,
    location,
    password,
    wallet,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.blocked = false;
    this.password = password;
    this.wallet = wallet;
  }
}
