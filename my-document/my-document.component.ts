import { Component, AfterContentInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeState } from '../xs-ng/SomeState';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store, ofActionSuccessful,  Actions} from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { I{Name_pascalized }Form } from './my-document.contract';

@Component({
    selector: 'my-document',
    templateUrl: 'my-document.component.html',
    styleUrls: [`my-document.component.scss`]
  })
export class MyDocumentComponent implements OnInit {
   
    formlyGroup: FormlyGroup <IMyDocumentForm>;
    @Select(SomeState.IsWorking) working$: Observable<boolean>;
    //@Select(SomeState.getItems) items$: Observable<any[]>;

    btnReadyLabel = 'Update';
    btnLoadingLabel = 'Updating...';
    componentTitle = 'My Document Title';

    constructor(
      private store: Store,
      private actions: Actions,
      private activatedRoute: ActivatedRoute
    ) {
    }
    
    ngOnInit(){
      this.actions.pipe(ofActionSuccessful(SomeAction)).subscribe(() => this.submitDone())
      this.bindForm();
    }

    bindForm(){
        this.formlyGroup = new FormlyGroup<IMyDocumentForm>({
        SomeField: new FieldTypes.HiddenField('SomeField'),
      })
    }

    submitDone(): any {
      this.onCancel();
    }

    bindValue(formData: any){
        //implement if any...
        if(!!formData){
          setTimeout(() => {
            //this.formlyGroup.setModel(formData);
            ///or....
            //this.formlyGroup.patchValue('SomeField', 'something....');
          })
        }

    }
    
    onCancel() {
      // do something...
      //const PageTypeId = this.activatedRoute.snapshot.params['dashboardPageId'];
      //const RequestId = this.activatedRoute.snapshot.params['pageDetailId'];
      this.store.dispatch(new Navigate([`main/fos/details/request-detail/$/$`]));
    }

    formSubmit($event) {
      //submit to action
      console.log(this.formlyGroup.model);
    }
  
   
  
  } 