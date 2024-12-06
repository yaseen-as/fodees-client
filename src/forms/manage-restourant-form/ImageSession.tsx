import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

export default function ImageSession() {
  const { control, watch } = useFormContext();
  const existingImageUrl = watch("imageUrl");
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that willbe displayed on your restourent listing in the
          serch Result.Ading a new image will overwrite the existing image
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (<AspectRatio ratio={16 / 9}>
          <img src={existingImageUrl} alt="Image" className="rounded-md object-cover h-full w-full"></img>
        </AspectRatio>)}
      </div>

      <div className="flex flex-col gap-8 w-[50%]">
        <FormField
          name="imageFile"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
