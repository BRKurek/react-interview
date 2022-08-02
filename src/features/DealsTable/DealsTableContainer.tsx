import { connect } from "react-redux";
import DealsTable from "./DealsTable";
import { DealType, DealsListType, DispatchType } from "../../types";
import { deleteDeal, publishDeal } from "../../redux/actions";

const mapStateToProps = (state: DealsListType) => {
  const { deals } = state;
  return {
    deals,
  };
};

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onDeleteDeal: (deal: DealType) => dispatch(deleteDeal(deal)),
  onPublishDeal: (deal: DealType) => dispatch(publishDeal(deal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DealsTable);
