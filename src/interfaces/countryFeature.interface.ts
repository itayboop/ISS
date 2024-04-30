import { Feature, Polygon, MultiPolygon } from "@turf/turf";

export interface CountryFeature extends Feature<Polygon | MultiPolygon> { }