import { Injectable } from '@nestjs/common';

// API Service test
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}