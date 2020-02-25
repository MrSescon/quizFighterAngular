import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import {
  MatTableDataSource, MatPaginator, 
  MatDialog, 
  MatDialogRef
} from '@angular/material';
import { environment as env } from '../../../environments/environment';

import {PerguntasService } from '../../services';
import { Pergunta } from '../../models';
import { 
  PerguntaFormDialogComponent, 
  ConfirmarRemoverDialogComponent,
  ConfirmarRestauracaoDialogComponent
} from './dialogs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  colunas = ['pergunta', 'opcoes', 'correta', 'acao'];
  dataSource: MatTableDataSource<Pergunta>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private perguntasService: PerguntasService
  ) { }

  ngOnInit() {
    this.validarAuntenticacao();
    this.perguntasService.obterPerguntas()
      .subscribe(perguntas => {
        this.dataSource = new MatTableDataSource<Pergunta>(perguntas);
        this.dataSource.paginator = this.paginator;
      });
  }

  validarAuntenticacao() {
    this.angularFireAuth.authState.subscribe(authState => {
      if(!authState || authState.email != env.adminEmail) {
        this.router.navigate(['/']);
      }
    });
  }

  sair() {
    this.angularFireAuth.auth.signOut();
  }

  cadastrar(){
    this.dialog
      .open(PerguntaFormDialogComponent)
      .afterClosed().subscribe(data => {
        if (data && data.pergunta !== null) {
          this.perguntasService.cadastrar(data.pergunta);
        }
      });
  }

  atualizar($event: any, pergunta: Pergunta) {
    $event.preventDefault();
    this.dialog.open(
      PerguntaFormDialogComponent,
      { data: {pergunta: pergunta } }
    )
    .afterClosed().subscribe(data => {
      if (data && data.pergunta !== null) {
        this.perguntasService.atualizar(data.pergunta, data.id);
      }
    });
  }

  remover($event: any, perguntaId: string) {
    $event.preventDefault();
    this.dialog.open(
      ConfirmarRemoverDialogComponent,
      { data: {perguntaId: perguntaId } }
    )
    .afterClosed().subscribe(data => {
      if (data) {
        this.perguntasService.remover(data.perguntaId);
      }
    });
  }

  confirmarRestauracaoDados() {
    this.dialog
      .open(ConfirmarRestauracaoDialogComponent)
      .afterClosed().subscribe(resposta => {
        if (resposta) {
          this.perguntasService.restaurarPerguntas();
        }
      });
  }

}
