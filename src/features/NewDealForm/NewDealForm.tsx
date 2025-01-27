import React, { useState } from "react";
import noop from "lodash/noop";
import NewDealFormInput from "./NewDealFormInput/NewDealFormInput";
import { DealType, DealFormDirtyType, DealActionType } from "../../types";
import "./NewDealForm.scss";
import { isNonEmptyString, isValidMonetaryString } from "../../tools/utils";

const DEFAULT_DEAL: DealType = {
  institution: "",
  dealType: "",
  dealSize: "",
  isPublished: false,
};

const DEFAULT_DIRTY_STATES: DealFormDirtyType = {
  institution: false,
  dealType: false,
  dealSize: false,
};

type DealFormProps = {
  onCreateDeal: DealActionType;
};

const dealFormValid = (deal: DealType) => {
  const {
    institution,
    dealType,
    dealSize,
  } = deal;

  return isNonEmptyString(institution) && isNonEmptyString(dealType) && isValidMonetaryString(dealSize);
}

const DealForm = (props: DealFormProps) => {
  const { onCreateDeal = noop } = props;
  const [newDeal, setNewDeal] = useState(DEFAULT_DEAL);
  const [dirtyStates, setDirtyStates] = useState(DEFAULT_DIRTY_STATES);

  const handleUpdateProperty = (property: string) => (
    e: React.ChangeEvent<any>
  ) => {
    e.persist();

    setNewDeal(prevDeal => ({
      ...prevDeal,
      [property]: e.target.value,
    }));


    setDirtyStates(prevDirtyStates => ({
      ...prevDirtyStates,
      [property]: true,
    }));
  }

  const handleCreateDeal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (dealFormValid(newDeal)) {
      const newDealClone = { ...newDeal };

      newDealClone.dealSize = newDealClone.dealSize.replace(/[$,]/g, '');
      onCreateDeal(newDealClone);

      // Reset state for the next deal input.
      setNewDeal({ ...DEFAULT_DEAL });
      setDirtyStates({ ...DEFAULT_DIRTY_STATES });
    } else {
      // potentially alert the user in some way that some form field(s) is invalid
    }
  };

  return (
    <form className='NewDealForm tile'>
      <div className='tile--header'>Add New Deal</div>
      <div className='NewDealForm--div'>
        <NewDealFormInput
          dirty={dirtyStates.institution}
          errorText="Institution not be empty"
          label="Institution"
          value={newDeal.institution}
          placeholder='LS Credit Union'
          onChange={handleUpdateProperty("institution")}
          required
        />
      </div>
      <div className='NewDealForm--div'>
        <NewDealFormInput
          dirty={dirtyStates.dealType}
          errorText="Deal Type must not be empty"
          label="Deal Type"
          value={newDeal.dealType}
          placeholder='Consumer Auto'
          onChange={handleUpdateProperty("dealType")}
          required
        />
      </div>
      <div className='NewDealForm--div'>
        <NewDealFormInput
          dirty={dirtyStates.dealSize}
          errorText="Deal Size must be a valid monetary value (ex: $1,000,000)"
          label="Deal Size"
          value={newDeal.dealSize}
          placeholder='$1,000,000'
          onChange={handleUpdateProperty("dealSize")}
          required
          validator={isValidMonetaryString}
        />
      </div>
      <button 
        className='NewDealForm--button'
        disabled={!dealFormValid(newDeal)}
        onClick={handleCreateDeal}
      >
        Create Deal
      </button>
    </form>
  );
};

export default DealForm;
