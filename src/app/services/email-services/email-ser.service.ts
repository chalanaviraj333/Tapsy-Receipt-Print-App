import { Injectable } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailSerService {

  constructor(private emailComposer: EmailComposer) { }
}
