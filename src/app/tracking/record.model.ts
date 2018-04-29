import { Measurement } from './measurement.model';
import * as moment from 'moment';

export interface Record {
    date: Date;
    measurements: Measurement[];
}
