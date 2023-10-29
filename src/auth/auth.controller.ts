import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor (private firebaseService: FirebaseService) {}

  @Post('email/signup')
  async createUserWithEmail(@Body() data: { email: string, password: string }) {
    try {

      const token = await this.firebaseService.createUserEmailAndPassword(data.email, data.password)

      return token
      
    } catch (error) {
      return error
    }
  }

  @Post('email/signin')
  async signInEmail(@Body() data: { email: string, password: string }) {
    try {

      const token = await this.firebaseService.signInEmailAndPassword(data.email, data.password)

      return token
      
    } catch (error) {
      return error
    }
  }

  @Post('token')
  async verifTest(@Body() data: { token: string }) {
    try {
      const uid = await this.firebaseService.verifToken(data.token)

      return uid
    } catch (error) {
      return error
    }
  }
}
