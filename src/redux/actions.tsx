import { DealType } from "../types";

export const CREATE_DEAL = "CREATE_DEAL";

export const createDeal = (deal: DealType) => {
  return {
    type: CREATE_DEAL,
    payload: {
      deal,
    },
  };
};

export const DELETE_DEAL = "DELETE_DEAL";

export const deleteDeal = (deal: DealType) => {
  return {
    type: DELETE_DEAL,
    payload: {
      deal,
    },
  };
};

export const PUBLISH_DEAL = "PUBLISH_DEAL";

export const publishDeal = (deal: DealType) => {
  return {
    type: PUBLISH_DEAL,
    payload: {
      deal,
    },
  };
};
