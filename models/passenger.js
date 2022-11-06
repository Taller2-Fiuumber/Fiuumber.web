import { Wallet } from "./wallet";
import {User} from "./user";


export class Passenger extends User {

  location;
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

    super(id, email, firstName, lastName, password);    
    this.location = location;
    this.wallet = wallet;
  }
}