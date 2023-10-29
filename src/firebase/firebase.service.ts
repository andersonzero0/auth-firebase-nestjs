import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

import * as admin from "firebase-admin"
import { Auth as AuthAdmin, getAuth as getAuthAdmin } from "firebase-admin/auth"
import { App } from 'firebase-admin/app';

@Injectable()
export class FirebaseService {
  private app: FirebaseApp;
  private appAdmin: App
  
  private auth: Auth;
  private authAdmin: AuthAdmin
  
  constructor() {

    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    };

    this.app = initializeApp(firebaseConfig);
    this.appAdmin = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID
      })
    })
    
    this.auth = getAuth(this.app);
    this.authAdmin = getAuthAdmin(this.appAdmin)
  }

  async createUserEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      const user = userCredential.user;

      const token = user.getIdToken();
      return token;
    } catch (e) {
      return new ConflictException();
    }
  }

  async signInEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      const user = userCredential.user;

      const token = user.getIdToken();
      return token;
    } catch (error) {
      return new UnauthorizedException();
    }
  }

  async verifToken(token: string) {
    try {

      const decodedToken = await this.authAdmin.verifyIdToken(token)

      return decodedToken.exp
      
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
