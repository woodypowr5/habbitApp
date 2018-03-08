export class Marker {
    id: string;
    name: string;
    dataType: 'numeric | enumerated | discrete | boolean';
    values?: any[];
    min?: number;
    max?: number;
    iconName?: string;
}
