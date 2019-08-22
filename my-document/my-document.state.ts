import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { IMyDocumentStateModel } from './my-document.model';
import { MyDocumentDone, MyDocumentLoading, MyDocumentGetElements } from './my-document.actions';
import { tap, timeout, mergeMap } from 'rxjs/operators';

/**
 * Comments: just an example
 */
@State<IMyDocumentStateModel>({
    name: 'myDocumentState',
    defaults: <IMyDocumentStateModel>{
        working: true,
        records: [],
      }
})
export class MyDocumentState {

    constructor(
        private httpClient: HttpClient
    ){

    }

@Selector()
  static IsWorking(state: IMyDocumentStateModel) : boolean {
    return state.working;
  }

  @Selector()
  static getItems(state: IMyDocumentStateModel): any[] {
    return state.records;
  }

  @Action(MyDocumentDone)
  onMyDocumentDone(ctx: StateContext<IMyDocumentStateModel>) {
    ctx.patchState({
      working: false
    });
  }
  @Action(MyDocumentLoading)
  onMyDocumentLoading(ctx: StateContext<IMyDocumentStateModel>) {
    ctx.patchState({
      working: true
    });
  }

  @Action(MyDocumentGetElements)
  getElements(ctx: StateContext<IMyDocumentStateModel>){
    return ctx.dispatch(new MyDocumentLoading()).pipe(
        mergeMap(() => this.httpClient.get(`${environment.api.target}name/items`)),
        tap((records : any[]) => {
            ctx.patchState({
                records
              });
        }),
        mergeMap(() => ctx.dispatch(new  MyDocumentDone()))
    )
  }

}