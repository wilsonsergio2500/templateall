import { Injectable } from '@angular/core';
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from, of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationStateModel } from '@firebase-module/types/firebase-pagination';
import { ConfirmationDialogService } from "@customComponents/ui-elements/confirmation-dialog/confirmation-dialog.service";
import { SnackbarStatusService } from '@customComponents/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '@states/auth/auth.state';
import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';
import { {Name_pascalized}FireStore } from './schema/{Name_original}.firebase';
import { I{Name_pascalized}FirebaseModel } from './schema/{Name_original}.schema';
import { I{Name_pascalized}StateModel } from './{Name_file}.model';
import { {Name_pascalized}SetAsLoadingAction, {Name_pascalized}SetAsDoneAction, {Name_pascalized}CreateAction, {Name_pascalized}RemoveAction, {Name_pascalized}GetByIdAction, {Name_pascalized}LoadFirstPageAction, {Name_pascalized}LoadNextPageAction, {Name_pascalized}LoadPreviousPageAction } from './{Name_file}.actions';
import { tap, mergeMap, delay, filter, finalize, catchError } from 'rxjs/operators';
import { Logger } from '@appUtils/logger';


@State<I{Name_pascalized}StateModel>({
    name: '{Name_original}State',
    defaults: <I{Name_pascalized}StateModel>{
        loading: false,
        paginationState: new FirebasePaginationStateModel<I{Name_pascalized}FirebaseModel>(),
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
  static getPage(state: I{Name_pascalized}StateModel) : I{Name_pascalized}FirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getPageSize(state: I{Name_pascalized}StateModel) : number {
    return state.paginationState.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: I{Name_pascalized}StateModel) : number {
    return state.paginationState.items.length;
  }

  @Selector()
  static getNextEnabled(state: I{Name_pascalized}StateModel) : boolean {
    return state.paginationState.next;
  }
  @Selector()
  static getPreviousEnabled(state: I{Name_pascalized}StateModel) : boolean {
    return state.paginationState.prev;
  }
  @Selector()
  static IsPaginatorEnabled(state: I{Name_pascalized}StateModel): boolean {
    return state.paginationState.prev || state.paginationState.next;
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
        this.snackBarStatus.OpenComplete('{Name_titlelized} Succesfully Created');
        ctx.dispatch(new Navigate(['admin/{Name_pascalized}']));
      })
    );
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

  @Action({Name_pascalized}LoadFirstPageAction)
  onGoToFirstPage(ctx: StateContext<I{Name_pascalized}StateModel>) {
    const { paginationState  } = ctx.getState();
    const { pageSize, orderByField, begining } = paginationState;
    ctx.dispatch(new {Name_pascalized}SetAsLoadingAction());
    return this.schemas.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc'))
      .get().pipe(
        filter(models => !!models.docs?.length),
        tap(models => {
          const currentSize = models.docs.length;
          const next = currentSize === pageSize;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          const pagination_count = 0;
          const prev = pagination_count != 0;
          const prev_start_at = [first];
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate {Name_titlelized}[Page:${pagination_count + 1}]`, items);
        }),
        finalize(() => ctx.dispatch(new {Name_pascalized}SetAsDoneAction()))
      )
  }

  @Action({Name_pascalized}LoadNextPageAction)
  onNextPage(ctx: StateContext<I{Name_pascalized}StateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
    return this.schemas.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
      .get().pipe(
        tap(models => {
          const currentSize = models.docs.length;
          let next = currentSize === pageSize;
          const prev = true;
          if (!currentSize) {
            next = false;
            return;
          }
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count++;
          const prevStartAt = [...prev_start_at, first];
          const newPaginationState = { ...paginationState, next, first, last, items, pagination_count, prev_start_at: prevStartAt, prev };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate {Name_titlelized}[Page:${pagination_count + 1}]`, items);

        })
        , catchError(error => {
          const newPaginationState = { ...paginationState, next: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      );
  }

  @Action({Name_pascalized}LoadPreviousPageAction)
  onPreviousPage(ctx: StateContext<I{Name_pascalized}StateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
    return this.schemas.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
      .get().pipe(
        tap(models => {
          const next = true;
          const currentSize = models.docs.length;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count--;
          const prev = pagination_count != 0;
          prev_start_at = prev_start_at.slice(0, prev_start_at.length - 1);
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate {Name_titlelized}[Page:${pagination_count + 1}]`, items);
        }),
        catchError(error => {
          const newPaginationState = { ...paginationState, prev: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      )
  }




}