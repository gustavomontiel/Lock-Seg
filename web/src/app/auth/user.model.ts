
export class User {

  public nombre: string;
  // public username: string;
  public email: string;
  public verified?: number;
  public telefono?: number;
  public roleNames?: any[];
  public cliente?: any;
  public id?: number;
  // tslint:disable-next-line: variable-name
  public codigo_gestion?: string;

  constructor(
    obj: DataObj
  ) {
    this.nombre = obj.nombre;
    this.email = obj.email;
    this.id = obj.id;
  }
}

interface DataObj {
  id: number;
  email: string;
  nombre: string;
}
