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

  atualizar(pergunta: Pergunta, perguntaId: string) {
    this.angularFirestore.doc<Pergunta>(`${this.PERGUNTAS_COLLECTION}/${perguntaId}`)
    .update(pergunta)
    .then(res => this.snackBar.open(
      'Pergunta atualizada com sucesso!',
      'OK', this.SNACKBAR_DURATING))
    .catch(err => this.snackBar.open(
      'Erro ao atualizar pergunta.',
      'Erro', this.SNACKBAR_DURATING));
  }

  remover(perguntaId: string) {
    this.angularFirestore.doc<Pergunta>(`${this.PERGUNTAS_COLLECTION}/${perguntaId}`)
    .delete()
    .then( res => this.snackBar.open(
      'Pergunta removida com sucesso!',
      'OK', this.SNACKBAR_DURATING))
    .catch(err => this.snackBar.open(
      'Erro ao excluir pergunta.',
      'Erro', this.SNACKBAR_DURATING));
  }

  restaurarPerguntas() {
    this.removerTodasPerguntas()
      .then(res => this.adicionarPerguntas());
  }

  async removerTodasPerguntas(): Promise<void> {
    const perguntas: firebase.firestore.QuerySnapshot = 
      await this.angularFirestore.collection(this.PERGUNTAS_COLLECTION).ref.get();
      const batch = this.angularFirestore.firestore.batch();
      perguntas.forEach(pergunta => batch.delete(pergunta.ref));
      return batch.commit();
  }

  adicionarPerguntas() {
    const perguntas = this.obterPerguntasExemplo();
    for (let i in perguntas) {
      const pergunta: Pergunta = {
        questao: perguntas[i].questao,
        opcoes: perguntas[i].opcoes,
        correta: perguntas[i].correta
      }
      this.perguntasCollection.add(pergunta);
    }
    this.snackBar.open(
      'Dados restaurados com sucesso!',
      'OK',
      this.SNACKBAR_DURATING
    );
  }

  obterPerguntasExemplo() {
    return [
      {
        questao: 'Como se diz "azul" em inglês?',
        opcoes: ['Black', 'Blue', 'Green', 'Purple'],
        correta: 1
      },
      {
        questao: 'Como se diz "verde" em inglês?',
        opcoes: ['Black', 'Blue', 'Green', 'Purple'],
        correta: 2
      },
      {
        questao: 'Como se diz "preto" em inglês?',
        opcoes: ['Black', 'Blue', 'Green', 'Purple'],
        correta: 0
      },
      {
        questao: 'Como se diz "vermelho" em inglês?',
        opcoes: ['Black', 'Blue', 'Red', 'Purple'],
        correta: 2
      },
      {
        questao: 'Como se diz "amarelo" em inglês?',
        opcoes: ['Black', 'Blue', 'yellow', 'Purple'],
        correta: 2
      },
      {
        questao: 'Como se diz "branco" em inglês?',
        opcoes: ['Black', 'Blue', 'white', 'Purple'],
        correta: 2
      },

    ]

  }
}









