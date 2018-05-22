import { Record } from './record.model';

export class EmptyRecord implements Record {
    id = null;
    date = null;
    measurements = [];
}
