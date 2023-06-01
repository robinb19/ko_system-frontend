import {Component} from '@angular/core';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {

  protected messageSaved = 'Item saved';
  protected messageError = 'Error';
  protected messageNewSaved = 'New item saved';
  protected messageNewError = 'New item could not be saved';
  protected messageClose = 'Close';
  protected deletedMessage = 'Item deleted';
  protected deleteErrorMessage = 'Item could not be deleted';
  protected closeMessage = 'Close';
}
