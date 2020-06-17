import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ];
  segment: any;
  currentDate: string;
  constructor( private afdb: AngularFireDatabase) {
    const date = new Date();
    const options = { weekday: 'long' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.currentDate = this.currentDate.charAt(0).toUpperCase() + this.currentDate.slice(1);
    this.segment = this.currentDate;

    console.log(this.currentDate);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', this.segment);
  }

}
