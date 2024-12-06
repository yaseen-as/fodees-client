import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisinesList } from "@/config/restourent-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheackbox from "./CuisineCheackbox";

export default function CuisinesSection() {
  const {control}=useFormContext()
  return (
    <div className="space-y-2">
     <div >
      <h2 className="text-2xl font-bold">Cuisines</h2>
       <FormDescription>
        select the cuisines that your restourant serves
       </FormDescription>
     </div>
      <FormField name="cuisines" control={control} render={({field})=>(
        <FormItem>
          <div className="grid md:grid-cols-5 gap-1">{cuisinesList.map((cuisineItem)=><CuisineCheackbox cuisine={cuisineItem} field={field}/>)}</div>
          <FormMessage/>
        </FormItem>
      )}/>
    </div>
  )
}
