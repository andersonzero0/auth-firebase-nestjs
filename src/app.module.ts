import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FirebaseModule, ConfigModule.forRoot({
    envFilePath: '.env'
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
