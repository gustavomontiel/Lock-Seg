import { User } from '../../auth/user.model';

export class Contacto {
  public tipo: string;
  public titulo: string;
  public descripcion: string;
  // tslint:disable-next-line: variable-name
  public notificado_el?: Date;
  // tslint:disable-next-line: variable-name
  public user_id?: number;
  // tslint:disable-next-line: variable-name
  public created_at?: Date;
  // tslint:disable-next-line: variable-name
  public updated_at?: Date;
  public id?: string;
  public user?: User;
}
