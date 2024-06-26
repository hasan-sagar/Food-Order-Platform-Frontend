import { cuisineList } from "@/config/restaurant-options";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  selectedCuisines: string[];
  isExpand: boolean;
  onChange: (cuisines: string[]) => void;
  onExpandClick: () => void;
};
export default function CuisineFilter({
  isExpand,
  selectedCuisines,
  onChange,
  onExpandClick,
}: Props) {
  const handleCuisinesReset = () => onChange([]);

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
    console.log(newCuisinesList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="font-semibold mb-2">Filter by Cuisines</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2  cursor-pointer text-red-500"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpand ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-sm px-4 py-2 font-semibold hover:bg-green-600 transition-all hover:text-white ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button onClick={onExpandClick} variant="link" className="mt-4 flex-1">
          {isExpand ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp size={15} />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown size={15} />
            </span>
          )}
        </Button>
      </div>
    </>
  );
}
