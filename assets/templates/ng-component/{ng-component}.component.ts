import { Component, AfterContentInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeState } from '../xs-ng/SomeState';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
    selector: '{Name_file}',
    templateUrl: '{Name_file}.component.html',
    styleUrls: [`{Name_file}.component.scss`]
  })
  export class {Name_pascalized}Component {
   
    @Select(SomeState.IsWorking) working$: Observable<boolean>;
    @Select(SomeState.getItems) items$: Observable<any[]>;

    constructor(
      private store: Store
    ) {
    }
  
    
  
   
  
  } 