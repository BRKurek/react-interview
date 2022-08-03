import React from "react";
import SortIcon from "../../../assets/SortIcon";
import { SortIconDirection } from "../../../assets/SortIcon";

import "./DealsTableHeader.scss";

type DealsTableHeaderProps = {
  header?: string;
  onSortClick?: (e: React.SyntheticEvent) => void;
  sortDirection?: SortIconDirection | null;
};

const DealsTableHeader = (props: DealsTableHeaderProps) => {
  const { header = "", onSortClick, sortDirection } = props;

  const className = `DealsTableHeader ${onSortClick ? ' clickable' : ''}`;

  return (
    <th className={className} onClick={onSortClick}>
      {header}{' '}{Boolean(sortDirection) && <SortIcon direction={sortDirection} />}
    </th>
  );
};

export default DealsTableHeader;