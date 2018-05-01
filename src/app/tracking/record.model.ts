import { Measurement } from './measurement.model';

export interface Record {
    date: Date;
    measurements: Measurement[];
}
