
export class User {

  public nombre: string;
  public username: string;
  public email: string;
  public verified?: number;
  public telefono?: number;
  roleNames?: string[];
  cliente?: [];
  public uid?: string;

  constructor(
    obj: DataObj
  ) {
    this.nombre = obj.nombre;
    this.username = obj.username;
    this.email = obj.email;
    this.uid = obj.uid;
  }
}

interface DataObj {
  uid: string;
  email: string;
  nombre: string;
  username: string;
}
