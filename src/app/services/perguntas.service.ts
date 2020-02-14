import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
 } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Pergunta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  readonly PERGUNTAS_COLLECTION: string = 'perguntas';
  private perguntasCollection: AngularFirestoreCollection<Pergunta>;

  constructor( private angularFirestore : AngularFirestore ) { 
    this.perguntasCollection = this.angularFirestore.collection<Pergunta>(
      this.PERGUNTAS_COLLECTION);
  }

  obterPerguntas(): Observable<Pergunta[]> {
    return this.perguntasCollection
      .snapshotChanges()
      .map(this.mapearIds);
  }

  mapearIds(perguntas: DocumentChangeAction<Pergunta>[]) : Pergunta[] {
    return perguntas.map(objPergunta => {
      const pergunta = objPergunta.payload.doc.data() as Pergunta;
      pergunta.id = objPergunta.payload.doc.id;
      return pergunta;
    });
  }

}









