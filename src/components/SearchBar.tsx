import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Check, Delete, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQueryKeywords: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQueryKeywords?: string;
};

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQueryKeywords,
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQueryKeywords,
    },
  });

  //reset
  const handleReset = () => {
    form.reset({
      searchQueryKeywords: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row  p-3 mx-5 ${
          form.formState.errors.searchQueryKeywords && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={1.5}
          size={25}
          className="ml-1 text-black hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQueryKeywords"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="p-5 border-dashed border-neutral-300 shadow-none text-xl focus-visible:ring-0 rounded-xl"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-sm bg-red-500 text-white me-1"
          >
            <Delete />
          </Button>
          <Button type="submit" className="rounded-sm bg-[#75A107]">
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
