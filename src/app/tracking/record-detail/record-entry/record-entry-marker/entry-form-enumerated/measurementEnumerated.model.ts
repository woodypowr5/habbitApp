import { Measurement } from './../../../../measurement.model';

export interface MeasurementEnumerated extends Measurement {
    values: string[];
}
