import { CREATE_DEAL, DELETE_DEAL, PUBLISH_DEAL } from "./actions";
import { DealType, DealsListType } from "../types";
import { cloneDeep } from "lodash";

let nextDealId = 3;

export const initialState: DealsListType = {
  deals: [
    {
      id: 1,
      institution: "LS Credit Union",
      dealSize: "1000000",
      dealType: "Consumer Auto",
      isPublished: true,
    },
    {
      id: 2,
      institution: "LS Credit Union",
      dealSize: "5000000",
      dealType: "Real Estate",
      isPublished: false,
    },
  ],
};

type ActionType = {
  type: string;
  payload: { deal: DealType };
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_DEAL:
      return {
        ...state,
        deals: [...state.deals, { ...action.payload.deal, id: nextDealId++ }],
      };
    case DELETE_DEAL:
      const { id: idToDelete } = action.payload.deal;
      return {
        ...state,
        deals: state.deals.filter(({ id }) => id !== idToDelete),
      };
    case PUBLISH_DEAL:
      const { id: idToPublish } = action.payload.deal;
      const stateClone = cloneDeep(state);
      const dealToPublish = stateClone.deals.find(({ id }) => id === idToPublish);

      if (dealToPublish) {
        dealToPublish.isPublished = !dealToPublish.isPublished;
      }

      return stateClone;
    default:
      return state;
  }
};
