import { Measurement } from './measurement.model';

export interface Record {
    date: string;
    measurements: Measurement[];
}
