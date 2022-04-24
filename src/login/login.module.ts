import { Module } from '@nestjs/common';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
