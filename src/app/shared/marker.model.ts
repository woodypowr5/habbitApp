export class Marker {
    id: string;
    name: string;
    dataType: 'numeric | enumerated | discrete | boolean';
    iconName?: string;
    isLoading: boolean;
    min?: number;
    max?: number;
    unit?: string;
    value1Name?: string;
    value2Name?: string;
    step?: number;
    minLabel?: string;
    maxLabel?: string;
}
