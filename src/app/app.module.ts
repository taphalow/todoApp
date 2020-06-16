import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyBYVGbwNDVZBSIosC3Or-W77_Q7oASV9X4',
  authDomain: 'todoapp-5eda6.firebaseapp.com',
  databaseURL: 'https://todoapp-5eda6.firebaseio.com',
  projectId: 'todoapp-5eda6',
  storageBucket: 'todoapp-5eda6.appspot.com',
  messagingSenderId: '974679155281',
  appId: '1:974679155281:web:1f70c539f069f8e1904e70',
  measurementId: 'G-WQP98HE2PZ'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
