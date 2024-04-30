import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { CountryFeature } from 'src/interfaces/countryFeature.interface';

@Schema()
export class Countries {
    @Prop()
    type: string;

    @Prop()
    features: CountryFeature[];
}

export const CountriesSchema = SchemaFactory.createForClass(Countries);