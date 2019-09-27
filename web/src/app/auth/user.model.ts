
export class User {

  public nombre: string;
  // public username: string;
  public email: string;
  public verified?: number;
  public telefono?: number;
  public roleNames?: any[];
  public cliente?: any[];
  public id?: string;
  // tslint:disable-next-line: variable-name
  public codigo_gestion?: string;

  constructor(
    obj: DataObj
  ) {
    this.nombre = obj.nombre;
    // this.username = obj.username;
    this.email = obj.email;
    this.id = obj.id;
  }
}

interface DataObj {
  id: string;
  email: string;
  nombre: string;
  // username: string;
}
