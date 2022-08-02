import React, { useState } from "react";
import { DealActionType, DealTableSortDirectionsType, DealType } from "../../types";
import DealsTableHeader from "./DealsTableHeader/DealsTableHeader";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import { SortIconDirection } from "../../assets/SortIcon";
import "./DealsTable.scss";

type DealsTableProps = {
  deals: DealType[];
  onDeleteDeal: DealActionType;
  onPublishDeal: DealActionType;
};

const DEFAULT_SORT_DIRECTIONS: DealTableSortDirectionsType = {
  institution: SortIconDirection.UP,
};

const DealsTable = (props: DealsTableProps) => {
  const { deals, onDeleteDeal, onPublishDeal } = props;
  const [sortDirections, setSortDirections] = useState(DEFAULT_SORT_DIRECTIONS);

  
  const handleSortClick = (property: string) => () => {
    setSortDirections(prevSortDirections => {
      const prevSort = prevSortDirections[property];
      let newSort: SortIconDirection;

      if (!prevSort) {
        newSort = SortIconDirection.UP
      } else {
        newSort = prevSort === SortIconDirection.UP ? SortIconDirection.DOWN : SortIconDirection.UP;
      }

      return { [property]: newSort };
    })
  };


  const dealsTableRows = deals.map((deal) => (
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
              sortDirection={sortDirections.institution} 
            />
            <DealsTableHeader
              header="Deal Type"
              onSortClick={handleSortClick("dealType")}
              sortDirection={sortDirections.dealType} 
            />
            <DealsTableHeader
              header="Deal Size"
              onSortClick={handleSortClick("dealSize")}
              sortDirection={sortDirections.dealSize} 
            />
            <DealsTableHeader
              header="Is Published?"
              onSortClick={handleSortClick("isPublished")}
              sortDirection={sortDirections.isPublished} 
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
