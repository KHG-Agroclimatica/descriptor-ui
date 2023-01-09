export interface FieldScreenVM {
    fieldId: string;
    contentPosition?: string;
    numberOrder: string;
}

export interface DescriptorScreenVM {
    descriptorId: string;
    name: string;
    numberOrder: number;
    fields: Array<FieldScreenVM>,
    description: string;
}