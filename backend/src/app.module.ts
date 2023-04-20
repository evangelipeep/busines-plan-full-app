import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host: string = configService.get<string>('APP_MONGO_DB_HOST');
        const user: string = configService.get<string>('APP_MONGO_DB_USER');
        const password: string = configService.get<string>('APP_MONGO_DB_PASSWORD');
        const port: number = configService.get<number>('APP_MONGO_DB_PORT');

        return { uri: `mongodb://${user}:${password}@${host}:${port}` };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
