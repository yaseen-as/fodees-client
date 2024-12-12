import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({ required_error: "Restourent Name is Required" }),
});
export type SearchForm = z.infer<typeof formSchema>;
type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

function SearchBar({ onSubmit, placeHolder, onReset, searchQuery }: Props) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });
  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);
  const handleReset = () => {
    form.reset({ searchQuery: "" });
    if (onReset) {
      onReset();
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${
            form.formState.errors.searchQuery && "border-red-500"
          }`}
        >
          <Search
            strokeWidth={2.5}
            size={30}
            className="ml-2 text-orange-500 hidden md:block"
          />
          <FormField
            name="searchQuery"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none shadow-none text-xl focus-visible:ring-0"
                    placeholder={placeHolder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onSubmit={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchBar;
