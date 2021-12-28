import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  agregarTarea(tareas: any): Promise<any> {
    return this.firestore.collection('tareas').add(tareas);
  }

  getTareas(): Observable<any> {
    return this.firestore
      .collection('tareas', (ref) => ref.orderBy('fechaCreacion', 'desc'))
      .snapshotChanges();
  }

  eliminarTarea(id: string): Promise<any> {
    return this.firestore.collection('tareas').doc(id).delete();
  }

  async loginWithGoogle(email: string, password: string) {
    try {
      return await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log('error en el login con google', error);
      return null;
    }
  }
}
