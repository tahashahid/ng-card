import { Directive, Input, OnInit } from '@angular/core';
// import * as Card from 'card/dist/card';
declare var Card: any

const defaultMessages = {
  validDate: 'valid\nthru',
  monthYear: 'month/year',
};

const defaultPlaceholders = {
  number: '•••• •••• •••• ••••',
  name: 'Full Name',
  expiry: '••/••',
  cvc: '•••',
};

@Directive({
  selector: '[ng-card]'
})
export class NgCardDirective implements OnInit {

  @Input() container: string;
  @Input('number-input') numberInput: string;
  @Input('expiry-input') expiryInput: string;
  @Input('cvc-input') cvcInput: string;
  @Input('fname-input') fnameInput: string;
  @Input('lname-input') lnameInput: string;
  @Input('form') form: HTMLElement;

  @Input('card-width') width: number; // optional — default 350px
  // Strings for translation - optional
  _messages;
  @Input() set messages(_messages: any) {
    this._messages = Object.assign({}, defaultMessages, _messages);
  }
  get messages() {
    return this._messages;
  }

  // Default placeholders for rendered fields - optional
  _placeholders;
  @Input() set placeholders(_placeholders: any) {
    this._placeholders = Object.assign({}, defaultPlaceholders, _placeholders);
  }
  get placeholders() {
    return this._placeholders;
  }

  @Input() masks: any;

  @Input() formatting: boolean = true; // optional - default true

  // if true, will log helpful messages for setting up Card
  @Input() debug: boolean = false; // optional - default false

  constructor(
  ) { }

  ngOnInit(): void {
    new Card({
      form: this.form,
      container: this.container,
      width: this.width,
      formSelectors: {
        numberInput: this.numberInput,
        expiryInput: this.expiryInput,
        cvcInput: this.cvcInput,
        nameInput: this.fnameInput + ', ' + this.lnameInput,
      },
      formatting: this.formatting,
      messages: this.messages,
      placeholders: this.placeholders,
      masks: this.masks,
      debug: this.debug,
    });
  }

}
