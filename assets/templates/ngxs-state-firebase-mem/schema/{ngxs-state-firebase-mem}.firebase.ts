import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { I{Name_pascalized}FirebaseModel } from './{Name_file}.schema';

export class {Name_pascalized}FireStore extends FirestoreService<I{Name_pascalized}FirebaseModel>{

    protected basePath = "{Name_original}";
    constructor(private angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}