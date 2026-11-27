import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "jc-el-gringo", appId: "1:1030798132436:web:8b556f8875482e7f59e741", storageBucket: "jc-el-gringo.firebasestorage.app", apiKey: "AIzaSyAZCFrsO-bePOy9zX9996_Yd21LPEVLh2U", authDomain: "jc-el-gringo.firebaseapp.com", messagingSenderId: "1030798132436", measurementId: "G-GFLB2HE2W6" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
