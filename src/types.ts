import { SortIconDirection } from "./assets/SortIcon";

export type DealType = {
    id?: number;
    institution: string;
    dealSize: string;
    dealType: string;
    isPublished: boolean
}

export type DealsListType = {
    deals: DealType[]
}

export type DealFormDirtyType = {
    institution: boolean;
    dealSize: boolean;
    dealType: boolean;
}

export type DealTableSortDirectionsType = {
    institution?: SortIconDirection;
    dealSize?: SortIconDirection;
    dealType?: SortIconDirection;
    isPublished?: SortIconDirection;
    [key: string]: SortIconDirection | undefined;
}

export type DealActionType = (deal: DealType) => any

export type DispatchType = (arg0: {
    type: string;
    payload: { deal: DealType };
}) => any