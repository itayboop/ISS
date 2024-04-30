import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssModule } from './iss/iss.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { IssWatcherGateway } from './iss-watcher/iss-watcher.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/countries'), IssModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService, IssWatcherGateway],
})
export class AppModule { }