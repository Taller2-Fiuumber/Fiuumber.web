
export class Vehicle{
  domain;
  modelYear;
  colorName;
  //license;
  brand;
  model;

  constructor(domain,modelYear,colorName,brand, model){
    this.domain = domain;
    this.modelYear = modelYear;
    this.colorName = colorName;
    //this.license = license;
    this.brand = brand;
    this.model = model;
  }
}
