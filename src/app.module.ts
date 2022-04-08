import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { typeORMConfig } from './configs/typeORMConfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BlogsModule, TypeOrmModule.forRoot(typeORMConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
