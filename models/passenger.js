import { Wallet } from "./wallet";
import {User} from "./user";


export class Passenger extends User {
  userId;
  username;
  address;
  wallet;

  constructor(
    userId,
    email,
    firstName,
    lastName,
    username,
    address,
    password,
    //blocked,
    wallet,
  ) {

    super(email, firstName, lastName, password);    
    this.userId = userId;
    this.username = username;
    this.address = address;
    //this.blocked = blocked;
    this.wallet = wallet;
  }
}