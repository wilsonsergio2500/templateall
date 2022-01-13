import { IFirebasePaginationInMemoryState } from '@firebase-module/types/firebase-pagination-inmemory';
import { I{Name_pascalized}FirebaseModel } from './schema/{Name_original}.schema';

export interface I{Name_pascalized}StateModel {
    loading: boolean;
    paginationState: IFirebasePaginationInMemoryState<I{Name_pascalized}FirebaseModel>;
    currentId: string,
    current: I{Name_pascalized}FirebaseModel;
    selected: I{Name_pascalized}FirebaseModel;
}