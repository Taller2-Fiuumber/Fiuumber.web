import { Wallet } from "./wallet";
import {User} from "./user";


export class Passenger extends User {
  username;
  address;
  wallet;

  constructor(
    id,
    email,
    firstName,
    lastName,
    username,
    address,
    password,
    wallet,
  ) {

    super(id, email, firstName, lastName, password);    
    this.username = username;
    this.address = address;
    this.wallet = wallet;
  }
}