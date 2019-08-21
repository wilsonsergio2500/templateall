import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { I{Name_pascalized}StateModel } from './{Name_file}.model';
import { {Name_pascalized}Done, {Name_pascalized}Loading, {Name_pascalized}GetElements } from './{Name_file}.actions';
import { tap, timeout, mergeMap } from 'rxjs/operators';

@State<I{Name_pascalized}StateModel>({
    name: '{Name_original}',
    defaults: <I{Name_pascalized}StateModel>{
        working: true,
        records: [],
      }
})
export class {Name_pascalized}State {

    constructor(
        private httpClient: HttpClient
    ){

    }

@Selector()
  static IsWorking(state: I{Name_pascalized}StateModel) : boolean {
    return state.working;
  }

  @Selector()
  static getItems(state: I{Name_pascalized}StateModel): any[] {
    return state.records;
  }

  @Action({Name_pascalized}Done)
  on{entry_name}Done(ctx: StateContext<I{Name_pascalized}StateModel>) {
    ctx.patchState({
      working: false
    });
  }
  @Action({Name_pascalized}Loading)
  on{entry_name}Loading(ctx: StateContext<I{Name_pascalized}StateModel>) {
    ctx.patchState({
      working: true
    });
  }

  @Action({Name_pascalized}GetElements)
  getElements(ctx: StateContext<I{Name_pascalized}StateModel>){
    return ctx.dispatch(new {Name_pascalized}Loading()).pipe(
        mergeMap(() => this.httpClient.get(`${environment.api.target}name/items`)),
        tap((records : any[]) => {
            ctx.patchState({
                records
              });
        }),
        mergeMap(() => ctx.dispatch(new  {Name_pascalized}Done()))
    )
  }

}