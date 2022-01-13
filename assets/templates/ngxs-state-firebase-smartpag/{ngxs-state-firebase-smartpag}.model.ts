import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';
import { I{Name_pascalized}FirebaseModel } from './schema/{Name_original}.schema';

export interface I{Name_pascalized}StateModel {
    loading: boolean;
    paginationState: IFirebasePaginationState<I{Name_pascalized}FirebaseModel>;
    currentId: string,
    current: I{Name_pascalized}FirebaseModel;
    selected: I{Name_pascalized}FirebaseModel;
}