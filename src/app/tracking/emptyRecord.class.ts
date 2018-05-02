import { Record } from './record.model';

export class EmptyRecord implements Record {
    date = null;
    measurements = [];
}
