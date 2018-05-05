import { Measurement } from './../../../../measurement.model';

export interface MeasurementDiscrete extends Measurement {
    min: number;
    max: number;
    delta: number;
    unit: string;
}
