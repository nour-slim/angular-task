
import { FormGroup , FormControl } from "@angular/forms";

export default class ValidateForm{
    static validatefields(fbb: FormGroup){
        Object.keys(fbb.controls).forEach(field=>{
          const control  = fbb.get(field);
          if(control instanceof FormControl){
            control.markAsDirty({onlySelf:true}); // field becomes idrty to display error
          }
          else if(control instanceof FormGroup){
            this.validatefields(control)
          }
        })
      }
}