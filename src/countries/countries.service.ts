import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Countries } from './countries.schema';
import { Model } from 'mongoose';
import { CountryFeature } from 'src/interfaces/countryFeature.interface';

@Injectable()
export class CountriesService {
    constructor(@InjectModel(Countries.name) private readonly countriesModel: Model<Countries>) { }

    async getCountries(): Promise<CountryFeature[]> {
        const countries = await this.countriesModel.findOne();

        return countries.features;
    }
}
