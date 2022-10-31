export class Wallet {
  id;
  adress;
  privateKey;

  constructor(id, adress, privateKey) {
    this.id = id;
    this.adress = adress;
    this.privateKey = privateKey;
  }
}
