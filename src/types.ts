export type DealType = {
    id?: number;
    institution: string;
    dealSize: string;
    dealType: string;
    isPublished: boolean
    [key: string]: string | number | boolean | undefined;
}

export type DealsListType = {
    deals: DealType[]
}

export type DealFormDirtyType = {
    institution: boolean;
    dealSize: boolean;
    dealType: boolean;
}

export type CompareFunctionType = (asc: boolean) => (a: any, b: any) => number;

export type DealTableCompareFunctionsType = {
    institution: CompareFunctionType;
    dealSize: CompareFunctionType;
    dealType: CompareFunctionType;
    isPublished: CompareFunctionType;
    [key: string]: CompareFunctionType;
}

export type DealActionType = (deal: DealType) => any

export type DispatchType = (arg0: {
    type: string;
    payload: { deal: DealType };
}) => any