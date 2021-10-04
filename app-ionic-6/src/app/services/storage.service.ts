import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private inicializado = false;

  constructor(private storage: Storage) {
  }

  async init(): Promise<boolean> {
   
    if(!this.inicializado){
      this.inicializado = true;
      this._storage = await this.storage.create() ;
      return this.inicializado;
    }
  }

  public async get(key: string) {
      !this._storage && await this.init();
      const data = await this._storage.get(key);
      return data
  }

  public async set(key: string, value: any) {
    !this._storage && await this.init();
    return this._storage?.set(key, value);
  }

  public async remove(key: string) {
    !this._storage && await this.init();
    return this._storage?.remove(key);
  }

  public async clear() {
    !this._storage && await this.init();
    return this._storage?.clear();
  }

  public async keys() {
    !this._storage && await this.init();
    return this._storage?.keys();
  }

}
