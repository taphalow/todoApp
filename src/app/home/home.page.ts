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
  today: string;
  myTask = '';
  addTask: boolean;
  tasks = [];

  constructor( private afDB: AngularFireDatabase) {
    const date = new Date();
    const options = { weekday: 'long' };
    const option = { weekday: 'long', month: 'long', day: 'numeric' };
    this.today = date.toLocaleDateString('fr-FR', option);
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.currentDate = this.currentDate.charAt(0).toUpperCase() + this.currentDate.slice(1);
    this.segment = this.currentDate;

    this.sortDays(this.segment);
    this.getTasks();
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      createdDate: new Date().toISOString(),
      day: this.segment,
      checked: false
    });
    this.showForm();
  }
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  segmentChanged(ev: any) {
    this.sortDays(this.segment);
    this.getTasks();
  }

  sortDays(string){
    switch (string) {
      case "Lundi":
        this.days = [
          "Vendredi",
          "Samedi",
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi"
        ];
        break;
      case "Mardi":
        this.days = [
          "Samedi",
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi"
        ];
        break;
      case "Mercredi":
        this.days = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi"
        ];
        break;
      case "Jeudi":
        this.days = [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche"
        ];
        break;
      case "Vendredi":
        this.days = [
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
          "Lundi"
        ];
        break;
      case "Samedi":
        this.days = [
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
          "Lundi",
          "Mardi"
        ];
        break;
      case "Dimanche":
          this.days = [
            "Jeudi",
            "Vendredi",
            "Samedi",
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi"
          ];
          break;
    }
  }

  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        if (action.payload.exportVal().day == this.segment) {
          this.tasks.push({
            key: action.key,
            text: action.payload.exportVal().text,
            hour: action.payload.exportVal().createdDate.substring(11, 16),
            checked: action.payload.exportVal().checked
          });
        }
      });
    });
  }

  changeCheckState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }
  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }

}