import { Wallet } from "./wallet";
import {Vehicle} from "./vehicle";
import {User} from "./user";

//No esta usando los objetos que importo...Los entenderá al levantarlos de la BD?

export class Driver extends User {
  username;
  address;  
  wallet;
  vehicle;


  constructor(
    id,
    email,
    firstName,
    lastName,
    username,
    address,
    password,
    wallet,
    vehicle,
  ) {
    super(id, email, firstName, lastName, password);    
    this.username = username;  
    this.address = address;
    this.wallet = wallet;
    this.vehicle = vehicle;
  }
}