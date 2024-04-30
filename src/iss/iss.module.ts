import { Module } from '@nestjs/common';
import { IssService } from './iss.service';
import { HttpModule } from '@nestjs/axios';
import { CountriesModule } from '../countries/countries.module';
import { IssController } from './iss.controller';

@Module({
  imports: [
    CountriesModule,
    HttpModule
  ],
  exports: [IssService],
  controllers: [IssController],
  providers: [IssService]
})
export class IssModule { }
