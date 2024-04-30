import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesSchema } from './countries.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesController } from './countries.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Countries', schema: CountriesSchema }])],
    exports: [CountriesService],
    controllers: [CountriesController],
    providers: [CountriesService],
})
export class CountriesModule { }
