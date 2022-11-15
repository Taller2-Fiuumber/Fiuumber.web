export class Wallet {
  id;
  address;
  privateKey;

  constructor(id, address, privateKey) {
    this.id = id;
    this.address = address;
    this.privateKey = privateKey;
  }
}
