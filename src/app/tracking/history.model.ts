import { Record } from './record.model';

export interface History {
    userId: string;
    days: Record[];
}
