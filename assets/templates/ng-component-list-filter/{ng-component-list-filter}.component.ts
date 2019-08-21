import { Component, AfterContentInit, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SomeState } from '../xs-ng/SomeState';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Select, Store } from '@ngxs/store';
import { map } from 'rxjs/internal/operators/map';
import { SomeActionSetPage, SomeActionApplyFilter, SomeActionClearFilter } from './addressToActions'

@Component({
    selector: '{Name_file}',
    templateUrl: '{Name_file}.component.html',
    styleUrls: [`{Name_file}.component.scss`]
  })
export class {Name_pascalized}Component {
   
    @Select(SomeState.IsWorking) working$: Observable<boolean>;
    @Select(SomeState.getPage) page$: Observable<any[]>;
    @Select(SomeState.getFilterSize) size$: Observable<boolean>;
    @Select(SomeState.getFields) fields$: Observable<any[]>;

    fieldSolver$: Observable<string[]>;
    componentTitle = '{Name_titlelized} Title';
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
      private store: Store
    ) {
    }

    onPageEvent($event: PageEvent) {
      this.store.dispatch(new SomeActionSetPage($event as any));
    }

    fieldChange($event: any) {
      const { columnName } = $event;
      this.fieldSolver$ = this.store.select(SomeState.solveFieldValues).pipe(map(filterFn => filterFn(columnName)));
    }

    applyFilter($event: any) {
      this.store.dispatch(new SomeActionApplyFilter($event));
    }

    onClearFilter() {
      if (!!this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.store.dispatch(new SomeActionClearFilter());
    }
   
  
  } 