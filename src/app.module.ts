import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './utils/constants';

@Module({
  imports: [JwtModule.register({
    global:true,
    secret:jwtConstant.secret,
    signOptions:{expiresIn:'30d'},
  })],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
