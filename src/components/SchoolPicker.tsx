import { FunctionComponent, h, JSX } from "preact";

import { School } from "../types";

export interface SchoolPickerProps {
  schools: Pick<School, "id" | "name">[];
  onContinue?: JSX.MouseEventHandler<HTMLButtonElement>;
  onInput?: JSX.GenericEventHandler<HTMLSelectElement>;
}

const SchoolPicker: FunctionComponent<SchoolPickerProps> = ({ onContinue, onInput, schools }) => (
  <div className="field has-addons">
    <div className="control has-icons-left">
      <div className="select">
        <select onInput={onInput}>
          <option disabled selected>Velg skole</option>
          {schools.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </div>
      <span className="icon is-left">
        <i className="fas fa-school" />
      </span>
    </div>

    <div className="control">
      <button type="button" className="button is-dark" onClick={onContinue}>
        <i className="fas fa-arrow-right" />
      </button>
    </div>
  </div>
);

export default SchoolPicker;
