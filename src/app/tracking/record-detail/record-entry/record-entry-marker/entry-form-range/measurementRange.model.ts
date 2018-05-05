import { Measurement } from './../../../../measurement.model';

export interface MeasurementRange extends Measurement {
    min: number;
    max: number;
    unit: string;
}
