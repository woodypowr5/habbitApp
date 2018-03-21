import { Measurement } from './measurement.model';

export interface Record {
    userId: 'string';
    measurements: Measurement[];
}
