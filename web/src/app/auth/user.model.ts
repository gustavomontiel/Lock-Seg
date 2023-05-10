
export class User {

  public nombre: string;
  // public username: string;
  public email: string;
  public verified?: number;
  public telefono?: number;
  public roleNames?: any[];
  public cliente?: any;
  public password?: string;
  public id?: number;
  // tslint:disable-next-line: variable-name
  public codigo_gestion?: string;
  public activo?: boolean;

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
