import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};
export default function MenuItemInput({ index, removeMenuItem }: Props) {
  const { control } = useFormContext();
  return (
    <div className="flex gap-2 items-end">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem className="flex-1 max-w-[25%]">
            <FormLabel className="flex items-center gap-1">
              Price <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="button" onClick={removeMenuItem} variant="destructive">
        Remove
      </Button>
    </div>
  );
}
