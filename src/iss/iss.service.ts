var utm = require('utm');
import * as turf from '@turf/turf';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CountriesService } from 'src/countries/countries.service';
import { IssCoordinates } from './dto/iss.interface';
import { CountryFeature } from 'src/interfaces/countryFeature.interface';

@Injectable()
export class IssService {
    constructor(
        private readonly countriesService: CountriesService,
        private readonly httpService: HttpService
    ) { }

    private isIssAboveCountry(lat: number, long: number, country: CountryFeature) {
        const point = turf.point([long, lat]);

        if (country.geometry.type === "Polygon") {
            const polygon = turf.polygon(country.geometry.coordinates);

            return turf.booleanPointInPolygon(point, polygon);
        }

        const multiPolygon = turf.multiPolygon(country.geometry.coordinates);

        return turf.booleanPointInPolygon(point, multiPolygon);
    }

    async getIssCoordinates() {
        const { data } = await firstValueFrom(this.httpService.get<IssCoordinates>('http://api.open-notify.org/iss-now.json'));

        return data;
    }

    async getIssCountry() {
        const countries = await this.countriesService.getCountries();
        const { iss_position } = await this.getIssCoordinates();
        const { latitude, longitude } = iss_position;

        countries.forEach(country => {
            const isAbove = this.isIssAboveCountry(latitude, longitude, country);

            if (isAbove) {
                return {
                    coordinates: { latitude, longitude },
                    countryName: country.properties.name
                };
            }
        });

        return {
            coordinates: { latitude, longitude },
            countryName: "Ocean"
        };;
    }

    async getIssUtm() {
        const { iss_position } = await this.getIssCoordinates();
        const utmCoordinates = utm.fromLatLon(iss_position.latitude, iss_position.longitude);

        return utmCoordinates;
    }
}
