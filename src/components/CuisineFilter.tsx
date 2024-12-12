import { cuisinesList } from "@/config/restourent-options-config";
import { FormLabel } from "./ui/form";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (Cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

function CuisineFilter({
  isExpanded,
  onChange,
  onExpandedClick,
  selectedCuisines,
}: Props) {
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisines) => cuisines !== clickedCuisine);
    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => onChange([]);
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2"> Filter By Cuisines</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold underline cursor-pointer text-blue-500 "
        >
          Reset Filter
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisinesList
          .slice(0, isExpanded ? cuisinesList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine-${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <FormLabel
                  htmlFor={`cuisine-${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-500 text-green-500"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </FormLabel>
              </div>
            );
          })}
        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              view Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              view more <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
}

export default CuisineFilter;
