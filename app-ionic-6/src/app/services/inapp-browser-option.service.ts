import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import {
  inappbrowserOptionAndroid,
  inappbrowserOptionDefault,
  inappbrowserOptionIos,
  inappbrowserOptionSistem,
} from "../shared/inappbrowser-options";

@Injectable({
  providedIn: "root",
})
export class InappBrowserOptionService {
  public inappbrowserOption;
  public inappbrowserOptionSistem;

  constructor(public platform: Platform) {
    this.inappbrowserOptionSistem = inappbrowserOptionSistem;
    this.platform.ready().then(() => {
      if (this.platform.is("android")) {
        this.inappbrowserOption = inappbrowserOptionAndroid;
      } else if (this.platform.is("ios")) {
        this.inappbrowserOption = inappbrowserOptionIos;
      } else {
        this.inappbrowserOption = inappbrowserOptionDefault;
      }
    });
  }
}
