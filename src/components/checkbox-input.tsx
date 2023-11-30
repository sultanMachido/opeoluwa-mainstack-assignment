import { useEffect, useState } from "react";
import "./style/checkbox.css";

type CheckboxInputProps = {
  toggleSelect: (
    event: { target: { checked: boolean } },
    value: string
  ) => void;
  label: string;
  value: string;
  selectedValues: string[];
};
const CheckboxInput = ({
  toggleSelect,
  label,
  value,
  selectedValues,
}: CheckboxInputProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (selectedValues.includes(value)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectedValues, value]);

  return (
    <div className="flex h-[48px] items-center">
      <label className="checkbox-container">
        <input
          type="checkbox"
          onChange={(event) => {
            toggleSelect(event, value);
          }}
          checked={isChecked}
        />
        <span className="checkmark"></span>
      </label>
      <p className="pt-[6px] text-sm font-[600]">{label}</p>
    </div>
  );
};

export default CheckboxInput;
