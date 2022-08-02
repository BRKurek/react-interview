import React, { useCallback } from "react";
import { DealActionType, DealType } from "../../../types";

import "./DealsTableRow.scss";

const currencyAmountToString = (amount: string) => {
  return `$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

type DealsTableRowProps = {
  deal: DealType;
  onDelete: DealActionType;
  onPublish: DealActionType;
};

const DealsTableRow = (props: DealsTableRowProps) => {
  const {
    deal,
    onDelete,
    onPublish,
  } = props;

  const memOnDelete = useCallback(() => onDelete(deal), [deal, onDelete]);
  const memOnPublish = useCallback(() => onPublish(deal), [deal, onPublish]);

  const {
    institution,
    dealType,
    dealSize,
    isPublished,
  } = deal;

  return (
    <tr className='DealsTableRow'>
      <td className='DealsTableRow--cell'>{institution}</td>
      <td className='DealsTableRow--cell'>{dealType}</td>
      <td className='DealsTableRow--cell'>
        {currencyAmountToString(dealSize)}
      </td>
      <td className='DealsTableRow--cell'>{isPublished ? "Yes" : "No"}</td>
      <td className='DealsTableRow--cell'>
        <button onClick={memOnPublish}>{isPublished ? "Un-Publish" : "Publish"}</button>
      </td>
      <td className='DealsTableRow--cell'>
        <button className="DealsTableRow--delete-button" onClick={memOnDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default DealsTableRow;
