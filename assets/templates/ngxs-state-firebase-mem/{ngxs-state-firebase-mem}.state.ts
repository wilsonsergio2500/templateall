import { Injectable } from '@angular/core';
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationInMemoryStateModel } from '@firebase-module/types/firebase-pagination-inmemory';
import { ConfirmationDialogService } from "@customComponents/ui-elements/confirmation-dialog/confirmation-dialog.service";
import { SnackbarStatusService } from '@customComponents/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '@states/auth/auth.state';
import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';
import { {Name_pascalized}FireStore } from './schema/{Name_original}.firebase';
import { I{Name_pascalized}FirebaseModel } from './schema/{Name_original}.schema';
import { I{Name_pascalized}StateModel } from './{Name_file}.model';
import { {Name_pascalized}SetAsLoadingAction, {Name_pascalized}SetAsDoneAction, {Name_pascalized}CreateAction, {Name_pascalized}LoadItemsAction, {Name_pascalized}SetPaginatorAction, {Name_pascalized}PaginateItemsAction, {Name_pascalized}RemoveAction, {Name_pascalized}GetByIdAction } from './{Name_file}.actions';
import { tap, mergeMap, delay } from 'rxjs/operators';


@State<I{Name_pascalized}StateModel>({
    name: '{Name_original}State',
    defaults: <I{Name_pascalized}StateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<I{Name_pascalized}FirebaseModel>(),
        currentId: null,
        current: null,
        selected: null
    }
})
@Injectable()
export class {Name_pascalized}State {

    private schemas: {Name_pascalized}FireStore;
    private subscription: Subscription;
    constructor(
        private store: Store,
        private snackBarStatus: SnackbarStatusService,
        private confirmationDialog: ConfirmationDialogService,
        angularFireStore: AngularFirestore
    ){
      this.schemas = new {Name_pascalized}FireStore(angularFireStore);
    }

  @Selector()
  static IsLoading(state: I{Name_pascalized}StateModel) : boolean {
    return state.loading;
  }

  @Selector()
  static getCurrentPage(state: I{Name_pascalized}StateModel) : I{Name_pascalized}FirebaseModel[] {
    return state.paginationState.page;
  }

  @Selector()
  static getPageSize(state: I{Name_pascalized}StateModel) : number {
    return state.paginationState.paginator.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: I{Name_pascalized}StateModel) : number {
    return state.paginationState.items.length;
  }
  @Selector()
  static getAllPages(state: I{Name_pascalized}StateModel) : I{Name_pascalized}FirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getCurrent(state: I{Name_pascalized}StateModel) : I{Name_pascalized}FirebaseModel {
    return state.current;
  }

  @Selector()
  static getSelected(state: I{Name_pascalized}StateModel) : I{Name_pascalized}FirebaseModel {
    return state.selected;
  }


  @Action({Name_pascalized}SetAsDoneAction)
 onDone(ctx: StateContext<I{Name_pascalized}StateModel>) {
    ctx.patchState({
        loading: false
    });
  }
  @Action({Name_pascalized}SetAsLoadingAction)
  onLoading(ctx: StateContext<I{Name_pascalized}StateModel>) {
    ctx.patchState({
        loading: true
    });
  }

  @Action({Name_pascalized}CreateAction)
  onCreate(ctx: StateContext<I{Name_pascalized}StateModel>, action: {Name_pascalized}CreateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ createDate: now, updatedDate: now, updatedBy: user, createdBy: user }
        const form = { ...action.request, ...metadata };
        return from(this.schemas.create(form))
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Name_titlelized} Succesfully Created');
        ctx.dispatch(new Navigate(['admin/{Name_pascalized}']));
      })
    );
  }

  @Action({Name_pascalized}LoadItemsAction)
  onLoadItems(ctx: StateContext<I{Name_pascalized}StateModel>) {
    const { paginationState } = ctx.getState();
    const { orderByField, paginator } = paginationState;
    if (!this.subscription) {
      ctx.dispatch(new {Name_pascalized}SetAsLoadingAction());
      this.subscription = this.schemas.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
        tap(items => {
          const newPaginationState = { ...paginationState, items };
          ctx.patchState({ paginationState: newPaginationState });
        }),
        mergeMap(() => ctx.dispatch(new {Name_pascalized}SetPaginatorAction({ ...paginator }))),
        mergeMap(() => ctx.dispatch(new {Name_pascalized}SetAsDoneAction()))
      ).subscribe();
    }
  }

  @Action({Name_pascalized}SetPaginatorAction)
  onSetPaginate(ctx: StateContext<I{Name_pascalized}StateModel>, action: {Name_pascalized}SetPaginatorAction) {
    let { paginationState } = ctx.getState();
    let { paginator } = action;

    paginationState = { ...paginationState, paginator };
    ctx.patchState({ paginationState });
    return ctx.dispatch(new {Name_pascalized}PaginateItemsAction());
  }

  @Action({Name_pascalized}PaginateItemsAction)
  onPaginate(ctx: StateContext<I{Name_pascalized}StateModel>) {
    let { paginationState } = ctx.getState();
    let { paginator } = paginationState;
    let items = [...paginationState.items];
    const page = items.splice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);

    paginationState = { ...paginationState, page };
    ctx.patchState({ paginationState });
  }

  @Action({Name_pascalized}RemoveAction)
  onRemove(ctx: StateContext<I{Name_pascalized}StateModel>, action: {Name_pascalized}RemoveAction) {
    const { Id } = action.request;
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this {Name_titlelized}?').pipe(
      mergeMap(() => from(this.schemas.delete(Id))),
      tap(() => this.snackBarStatus.OpenComplete('{Name_titlelized} has been Removed')),
    )
  }

  @Action({Name_pascalized}GetByIdAction)
  onGetById(ctx: StateContext<I{Name_pascalized}StateModel>, action: {Name_pascalized}GetByIdAction){
    const { id: currentId } = action;
    ctx.dispatch(new {Name_pascalized}SetAsLoadingAction());
    return from(this.schemas.queryCollection(ref => ref.where('Id', '==', currentId)).get()).pipe(
      tap(records => {
        if (records?.docs.length) {
          const current = records.docs[0].data() as I{Name_pascalized}FirebaseModel;
          ctx.patchState({ currentId, current });
        }
      }),
      delay(1000),
      mergeMap(() => ctx.dispatch(new {Name_pascalized}SetAsDoneAction()))
    )
  }


}