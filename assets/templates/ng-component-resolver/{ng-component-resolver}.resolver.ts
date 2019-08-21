import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { StateGetElements } from '../xs-ng/StateGetElements';

@Injectable()
export class {Name_pascal}Resolver implements Resolve<any>{


  constructor(
    private store: Store,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // remove below line if no parameter apply
    const pageId = route.params.pageDetailId;
    this.store.dispatch(new StateGetElements());
    return;
  }

}