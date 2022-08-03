import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { DealActionType, DealType, DealTableCompareFunctionsType } from "../../types";
import DealsTableHeader from "./DealsTableHeader/DealsTableHeader";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import { SortIconDirection } from "../../assets/SortIcon";
import { booleanSorter, stringNumberSorter, stringSorter } from "../../tools/utils";
import "./DealsTable.scss";


type DealsTableProps = {
  deals: DealType[];
  onDeleteDeal: DealActionType;
  onPublishDeal: DealActionType;
};

type DealTableSortState = {
  property: string;
  sortDirection: SortIconDirection;
}

const DEAL_TABLE_COMPARE_FUNCTIONS: DealTableCompareFunctionsType = {
  institution: stringSorter,
  dealType: stringSorter,
  dealSize: stringNumberSorter,
  isPublished: booleanSorter,
};

const DEFAULT_DEAL_TABLE_SORT_STATE: DealTableSortState = {
  property: "institution",
  sortDirection: SortIconDirection.UP,
};

const DealsTable = (props: DealsTableProps) => {
  const { deals, onDeleteDeal, onPublishDeal } = props;
  const [sortState, setSortState] = useState(DEFAULT_DEAL_TABLE_SORT_STATE);
  const { property, sortDirection } = sortState;

  
  const handleSortClick = (property: string) => () => {
    setSortState(prevSortState => {
      const { property: prevProperty, sortDirection: prevSortDirection } = prevSortState;
      let newSortDirection: SortIconDirection;

      if (property === prevProperty) {
        newSortDirection = prevSortDirection === SortIconDirection.UP ? SortIconDirection.DOWN : SortIconDirection.UP;
      } else {
        newSortDirection = SortIconDirection.UP;
      }

      return { property, sortDirection: newSortDirection };
    });
  };

  const sortedDeals = cloneDeep(deals).sort((dealA, dealB) => {
    const a = dealA[property];
    const b = dealB[property];
    const asc = sortDirection === SortIconDirection.UP;
    const baseCompareFunc = DEAL_TABLE_COMPARE_FUNCTIONS[property];
    return baseCompareFunc(asc)(a, b);
  });

  const dealsTableRows = sortedDeals.map((deal) => (
    <DealsTableRow key={deal.id} deal={deal} onDelete={onDeleteDeal} onPublish={onPublishDeal} />
  ));

  return (
    <div className="tile">
      <div className="tile--header">Deal Portfolio</div>
      <table className='DealsTable'>
        <thead>
          <tr>
            <DealsTableHeader
              header="Institution"
              onSortClick={handleSortClick("institution")}
              sortDirection={property === "institution" ? sortDirection : null} 
            />
            <DealsTableHeader
              header="Deal Type"
              onSortClick={handleSortClick("dealType")}
              sortDirection={property === "dealType" ? sortDirection : null} 
            />
            <DealsTableHeader
              header="Deal Size"
              onSortClick={handleSortClick("dealSize")}
              sortDirection={property === "dealSize" ? sortDirection : null} 
            />
            <DealsTableHeader
              header="Is Published?"
              onSortClick={handleSortClick("isPublished")}
              sortDirection={property === "isPublished" ? sortDirection : null} 
            />
            <DealsTableHeader />
            <DealsTableHeader />
          </tr>
        </thead>
        <tbody>{dealsTableRows}</tbody>
      </table>
    </div>
  );
};

export default DealsTable;
