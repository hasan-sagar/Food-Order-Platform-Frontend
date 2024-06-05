import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

export default function CuisineSection() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2>Cuisines Section</h2>
        <FormDescription>
          Select cuisines that suits your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox
                  key={cuisineItem}
                  cuisine={cuisineItem}
                  field={field}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
