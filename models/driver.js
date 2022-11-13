import { Wallet } from "./wallet";
import {Vehicle} from "./vehicle";
import {User} from "./user";

//No esta usando los objetos que importo...Los entenderá al levantarlos de la BD?

export class Driver extends User {
  userId;
  username;
  address;  
  wallet;
  vehicle;


  constructor(
    userId,
    email,
    firstName,
    lastName,
    username,
    address,
    password,
    blocked,
    wallet,
    vehicle,
  ) {
    super(email, firstName, lastName, password);    
    this.userId = userId;
    this.username = username;  
    this.address = address;
    this.blocked = blocked;
    this.wallet = wallet;
    this.vehicle = vehicle;
  }
}