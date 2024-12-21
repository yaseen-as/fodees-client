import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is requered"),
  adressLine: z.string().min(1, "adressLine is requered"),
  city: z.string().min(1, "city is requered"),
  country: z.string().min(1, "country is requered"),
});
export type UserFormData = z.infer<typeof formSchema>;
type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  userData:User ;
  title?:string;
  buttonText?:string;
};

const UserProfileForm = ({ onSave, isLoading,userData,buttonText='Submit',title="User profile" }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });
  useEffect(()=>{
    form.reset(userData);
  },[userData,form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="px-2 container space-y-4 bg-gray-50 rounded-lg md:p-10"
        noValidate
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            view and change your profile info heare
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="adressLine"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>AdressLine</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                {/* <FormMessage/> */}
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};
export default UserProfileForm;
