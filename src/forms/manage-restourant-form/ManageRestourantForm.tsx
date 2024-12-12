import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailesSection from "./DetailesSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSession from "./MenuSession";
import ImageSession from "./ImageSession";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restourent } from "@/types";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "resturent name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "contry is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: " delivery time  is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "plese selecr atleast one",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name req"),
        price: z.coerce.number().min(1, "price req"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image req" }).optional(),
  })
  .refine((data) => data.imageFile || data.imageUrl, {
    message: "either image url or imageFile is required",
    path: ["imageFile"],
  });
type RestaurantFormData = z.infer<typeof formSchema>;
type Props = {
  restourent: Restourent | undefined;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestourantForm = ({ onSave, isLoading, restourent }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restourent) {
      return;
    }
    const deliveryPriceFormatted = parseInt(
      (restourent.deliveryPrice / 100).toFixed(2)
    );
    const menuItemFormatted = restourent.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));
    const updatedRestourent = {
      ...restourent,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemFormatted,
    };
    form.reset(updatedRestourent);
  }, [form, restourent]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisine[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItem[${index}]`, menuItem.name);
      formData.append(`menuItem[${index}]`, (menuItem.price * 100).toString());
    });
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    onSave(formData);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-50 p-10 rounded-lg"
        >
          <DetailesSection />
          <Separator />
          <CuisinesSection />
          <Separator />
          <MenuSession />
          <Separator />
          <ImageSession />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ManageRestourantForm;
