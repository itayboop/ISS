
import { Controller, Get, HttpException } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) { }

    @Get('')
    async getCountries() {
        try {
            const countries = await this.countriesService.getCountries();

            return { data: countries };
        } catch (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }
}
