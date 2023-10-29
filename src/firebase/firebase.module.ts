import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseApp } from 'firebase/app';

@Module({
  imports: [],
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}
