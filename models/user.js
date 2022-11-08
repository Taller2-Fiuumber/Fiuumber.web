export class User {
  email;
  firstName;
  lastName;  
  password;
  // blocked;


  constructor(
   email,
    firstName,
    lastName,   
    password,
   
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    // this.blocked = false;
    this.password = password;
  }
}
