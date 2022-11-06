import { Wallet } from "./wallet";
import {Vehicle} from "./vehicle";
import {User} from "./user";

//No esta usando los objetos que importo...Los entenderá al levantarlos de la BD?

export class Driver extends User {
  
  location;  
  wallet;
  vehicle;


  constructor(
    id,
    email,
    firstName,
    lastName,
    location,
    password,
    wallet,
    vehicle,
  ) {
    super(id, email, firstName, lastName, password);      
    this.location = location;
    this.wallet = wallet;
    this.vehicle = vehicle;
  }
}