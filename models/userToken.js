export class UserToken {
    user;
    token;

    constructor(user,token) {
         this.user = user;
         this.token = token;
    }
    
    setUserToken(user, token) {
        this.user = user;
        this.token = token;
  }
}
