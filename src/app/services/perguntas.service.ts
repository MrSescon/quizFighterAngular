import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
 } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';

import { Pergunta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  readonly PERGUNTAS_COLLECTION: string = 'perguntas';
  readonly SNACKBAR_DURATING: any = {duration: 5000};
  private perguntasCollection: AngularFirestoreCollection<Pergunta>;

  constructor( private angularFirestore : AngularFirestore,
               private snackBar: MatSnackBar ) { 
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

  cadastrar(pergunta: Pergunta) {
    this.perguntasCollection.add(pergunta)
      .then(res => this.snackBar.open(
        'Pergunta adicionada com sucesso!',
        'OK', this.SNACKBAR_DURATING))
      .catch(err => this.snackBar.open(
        'Erro ao adicionar pergunta.',
        'Erro', this.SNACKBAR_DURATING));
  }

}









