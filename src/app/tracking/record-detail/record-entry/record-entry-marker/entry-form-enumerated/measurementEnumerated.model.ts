import { Measurement } from './../../../../../shared/types/measurement.model';

export interface MeasurementEnumerated extends Measurement {
    values: string[];
}
