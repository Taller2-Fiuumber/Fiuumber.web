export class User {
  id;
  email;
  firstName;
  lastName;  
  blocked;
  password;

  constructor(
    id,
    email,
    firstName,
    lastName,   
    password,
   
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.blocked = false;
    this.password = password;
  }
}
