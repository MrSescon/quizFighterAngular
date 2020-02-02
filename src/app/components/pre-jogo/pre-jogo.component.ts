import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit {

  constructor(private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  sair() {
    this.angularFireAuth.auth.signOut();
  }
}
