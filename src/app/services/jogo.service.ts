import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';

import { Jogo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  readonly JOGOS_DOC_PATH = 'jogos/';
  readonly SNACKBAR_DURATION: any = {duration: 5000};

  constructor(
    private angularFirestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) { }

  adicionarJogosPadrao(qtdJogos: number) {
    if (qtdJogos <= 0 ) {
      return;
    }
    let jogosCollection: AngularFirestoreCollection<Jogo>;
    jogosCollection = this.angularFirestore.collection<Jogo>(this.JOGOS_DOC_PATH);
    for (let i=0; i <qtdJogos; i++) {
      const jogo: Jogo = { qtdJogadores: 0 } ;
      jogosCollection.add(jogo);
    }
    this.snackBar.open(
      'Jogos inicializados com sucesso!',
      'OK', this.SNACKBAR_DURATION)
  }

  async removerTodosJogos(): Promise<void> {
    const jogos: firebase.firestore.QuerySnapshot = 
      await this.angularFirestore.collection(this.JOGOS_DOC_PATH).ref.get();
      const batch = this.angularFirestore.firestore.batch();
      jogos.forEach(jogo => batch.delete(jogo.ref));
      return batch.commit();
  }

  inicializarJogos(data: any) {
    if (data.manterJogosExistentes) {
      this.adicionarJogosPadrao(data.qtdJogos);
    } else {
      this.removerTodosJogos()
        .then(res => this.adicionarJogosPadrao(data.qtdJogos))
        .catch(err => this.snackBar.open(
          'Erro ao inicializar jogos.',
          'Erro', this.SNACKBAR_DURATION));
    }
  }

}
