import React from "react";
import { DealActionType, DealType } from "../../types";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import "./DealsTable.scss";

type DealsTableProps = {
  deals: DealType[];
  onDeleteDeal: DealActionType;
  onPublishDeal: DealActionType;
};

const DealsTable = (props: DealsTableProps) => {
  const { deals, onDeleteDeal, onPublishDeal } = props;
  const dealsTableRows = deals.map((deal) => (
    <DealsTableRow key={deal.id} deal={deal} onDelete={onDeleteDeal} onPublish={onPublishDeal} />
  ));
  return (
    <div className="tile">
      <div className="tile--header">Deal Portfolio</div>
      <table className='DealsTable'>
        <thead>
          <tr>
            <th className='DealsTable--headerCell'>Institution</th>
            <th className='DealsTable--headerCell'>Deal Type</th>
            <th className='DealsTable--headerCell'>Deal Size</th>
            <th className='DealsTable--headerCell'>Is Published?</th>
            <th className='DealsTable--headerCell'></th>
            <th className='DealsTable--headerCell'></th>
          </tr>
        </thead>
        <tbody>{dealsTableRows}</tbody>
      </table>
    </div>
  );
};

export default DealsTable;
