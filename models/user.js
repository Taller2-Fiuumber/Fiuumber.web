export class User {
  email;
  firstName;
  lastName;  
  password;

  constructor(
   email,
    firstName,
    lastName,   
    password,
   
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
