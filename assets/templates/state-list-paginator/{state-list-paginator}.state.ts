import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { I{Name_pascalized}StateModel, IPaginate } from './{Name_file}.model';
import { { Name_pascalized }Done, { Name_pascalized }Loading, { Name_pascalized }GetElements, { Name_pascalized }SetPage, { Name_pascalized }ApplyFilter, { Name_pascalized }ClearFilter  } from './{Name_file}.actions';
import { tap, timeout, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

@State<I{Name_pascalized}StateModel>({
    name: '{Name_original}',
    defaults: <I{Name_pascalized}StateModel>{
        working: true,
        records: [],
        filtered: [],
        fields: [],
        page: [],
      }
})
export class {Name_pascalized}State {

    constructor(
        private httpClient: HttpClient,
        private webWorkerService: WebWorkerService
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

  @Selector()
  static getPage(state: I{Name_pascalized}StateModel): any[] {
    return state.page;
  }
  @Selector()
  static getFilterSize(state: I{Name_pascalized}StateModel): number {
    return state.filtered.length;
  }

  @Selector()
  static getFields(state: I{Name_pascalized}StateModel): any[] {
    return state.fields;
  }
  @Selector()
  static solveFieldValues(state: I{Name_pascalized}StateModel) {
    const func = (field: string) => {
      const distinct = (value, index, self: any[]) => {
        return self.indexOf(value) === index;
      }
      return state.records.map(x => x[field]).filter(distinct);
    }
    return func;
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
        mergeMap(() => this.httpClient.get(`${environment.api.target}name/ReplaceEndPoint`)),
        tap((response: any) => {

          const { records, fields } = response;

            ctx.patchState({
                records,
                fields,
                filtered: records
              });
        }),
        mergeMap(() => ctx.dispatch(new {Name_pascalized}SetPage(<IPaginate>{ pageIndex: 0, pageSize: 15 }))),
        mergeMap(() => ctx.dispatch(new  {Name_pascalized}Done()))
    )
  }

  @Action({Name_pascalized}SetPage)
  onSetPage(ctx: StateContext<I{Name_pascalized}StateModel>, action: {Name_pascalized}SetPage){
    const state = ctx.getState();
    const records = [...state.filtered];
    const page = records.splice(action.pagination.pageIndex * action.pagination.pageSize, action.pagination.pageSize);
    ctx.patchState({
      page
    })
  }

  @Action({Name_pascalized}ApplyFilter)
  onApplyFilter(ctx: StateContext<I{Name_pascalized}StateModel>, action: {Name_pascalized}ApplyFilter) {

    const state = ctx.getState();

    const filter = [...action.filter]
    const wwInput = { elements: [...state.records], filters: MakeCopy(filter) };

    const promise = this.webWorkerService.run(
      (workerEntry) => {
        const records = [...workerEntry.elements];
        const filtered = records.filter(payload => {
          let result = true;
          for (var i = workerEntry.filters.length; i--;) {
            const request = workerEntry.filters[i];
            const fn = eval(request.cbFunAsString);
            const filterPredicate = fn(request.filterValue, request.field, payload);
            if (filterPredicate === false) {
              result = false;
              break;
            }
          }
          return result;
        });
        return filtered;
      }, wwInput);


    return from(promise).pipe(
      tap((filteredRecords: any) => {
        ctx.patchState({
          filteredRecords
        })
      }),
      mergeMap(() => ctx.dispatch(new {Name_pascalized}SetPage(<IPaginate>{ pageIndex: 0, pageSize: 15 })))
    );

  }

  @Action({Name_pascalized}ClearFilter)
  onClearFilter(ctx: StateContext<I{Name_pascalized}StateModel>) {
    const { records } = ctx.getState();
    const filtered = [...records];
    ctx.patchState({
      filtered
    })
    ctx.dispatch(new {Name_pascalized}SetPage(<IPaginate>{ pageIndex: 0, pageSize: 15 }));
  }


}