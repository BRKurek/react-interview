import React from "react";
import { noop } from "lodash";
import { isNonEmptyString } from "../../../tools/utils";

import './NewDealFormInput.scss';


type DealFormInputProps = {
  dirty?: boolean;
  errorText?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  placeholder?: string;
  required?: boolean;
  validator?: (val: string) => boolean;
  value?: string;
};

const defaultValidator = () => true;

const DealFormInput = (props: DealFormInputProps) => {
  const {
    dirty = false,
    errorText = "",
    label = "",
    onChange = noop,
    placeholder = "",
    required = false,
    validator = defaultValidator,
    value = "",
  } = props;

  const baseValidity = required ? isNonEmptyString(value) && validator(value) : validator(value);
  const valid = dirty ? baseValidity : true;
  const labelClassName = `NewDealFormInputLabel${required ? ' required' : ''}`;

  return (
    <div className={`NewDealFormInput${!valid ? ' invalid' : ''}`}>
      {Boolean(label) && (<label className={labelClassName}>{label}</label>)}
      <input
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={value}
      />
      {!valid && Boolean(errorText) && (
        <div className="NewDealFormInput--error-text">{errorText}</div>
      )}
    </div>
  );
}

export default DealFormInput;