import { useState } from "react";
import { CheckIcon } from "../assets/svgs";

const NUMBER_OF_OPTIONS = 6;

const PageSelector = () => {
  const initialOptionsState = Array.from(
    { length: NUMBER_OF_OPTIONS },
    (_, index) => ({
      [`option${index + 1}`]: false,
    })
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [selectAll, setSelectAll] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(initialOptionsState);
  const [hoveringRow, setHoveringRow] = useState<string | null>(null);

  const handleSelectAllChange = () => {
    setSelectAll((prev) => !prev);

    const updatedOptions = Object.keys(selectedOptions).reduce(
      (acc, key) => ({ ...acc, [key]: !selectAll }), //Makes all the values true if selectAll is false and vice versa
      {}
    );
    setSelectedOptions(updatedOptions);
  };

  const handleOptionChange = (option: string, isChecked: boolean) => {
    const updatedOptions = { ...selectedOptions, [option]: isChecked };
    setSelectedOptions(updatedOptions);

    const allSelected = Object.values(updatedOptions).every((value) => value);
    setSelectAll(allSelected);
  };

  return (
    <div className="flex flex-col justify-evenly w-[365px] h-fit bg-white p-4 rounded-[6px] shadow-lg">
      {/* Header select all pages optino */}
      <div
        className="flex flex-row justify-between text-lg font-thin mt-2 hover:cursor-pointer"
        onClick={() => handleSelectAllChange()}
        onMouseEnter={() => setHoveringRow("all")}
        onMouseLeave={() => setHoveringRow(null)}
      >
        <span className="mr-auto">All Pages</span>
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectAll}
            className={`appearance-none w-6 h-6 border-2 rounded-[6px] transition-all duration-200 bg-transparent ${
              selectAll
                ? "checked:bg-[#2469F6] border-gray-200"
                : hoveringRow === "all"
                ? "border-gray-400/60"
                : "border-gray-400/40"
            }`}
          />
          <CheckIcon
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 transition-opacity duration-200 ${
              selectAll
                ? "opacity-100"
                : hoveringRow === "all"
                ? "opacity-60"
                : "opacity-0"
            }`}
            color={selectAll ? "#E3E3E3" : "#878787"}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-b-1 w-full border-[#CDCDCD] self-center my-4" />

      {/* List of the pages or options using reduce and array format since we are deriving it from just a number easier if done using a premade object with names */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: NUMBER_OF_OPTIONS }, (_, index) => {
          const optionKey = `option${index + 1}`;
          return (
            <div
              key={optionKey}
              className="flex flex-row justify-between text-lg font-thin hover:cursor-pointer"
              onClick={() =>
                handleOptionChange(optionKey, !selectedOptions[optionKey])
              }
              onMouseEnter={() => setHoveringRow(optionKey)}
              onMouseLeave={() => setHoveringRow(null)}
            >
              <span className="">Page {index + 1}</span>
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedOptions[optionKey]}
                  className={`appearance-none w-6 h-6 border-2 rounded-[6px] transition-all duration-200 bg-transparent ${
                    selectedOptions[optionKey]
                      ? "border-gray-200 checked:bg-[#2469F6]"
                      : hoveringRow === optionKey
                      ? "border-gray-400/60"
                      : "border-gray-400/40"
                  }`}
                />
                <CheckIcon
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 transition-opacity duration-200 ${
                    selectedOptions[optionKey]
                      ? "opacity-100 checked:text-white"
                      : hoveringRow === optionKey
                      ? "opacity-60"
                      : "opacity-0"
                  }`}
                  color={selectedOptions[optionKey] ? "#E3E3E3" : "#878787"}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-b-1 w-full border-[#CDCDCD] self-center my-4" />

      {/* Submit button can add funtionality to remove the checkboxes or some other functionality */}
      <button className="w-full rounded-[4px] bg-[#FFCE22] active:bg-[#FFCE22] hover:bg-[#FFD84D] cursor-pointer active:translate-y-[1px] active:translate-x-[0.6px] active:cursor-default shadow-lg p-2 mt-2">
        Done
      </button>
    </div>
  );
};

export default PageSelector;
