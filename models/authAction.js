export class AuthAction {
    userToken;
    type;

    constructor(userToken, type) {
        this.userToken = userToken;
        this.type = type;
   }
}