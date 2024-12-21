import {
  useCreateMyRestourent,
  useGetMyRestourent,
  useGetMyRestourentOrders,
  useUpdateMyRestourent,
} from "@/api/MyRestourentApi";
import ManageRestourantForm from "@/forms/manage-restourant-form/ManageRestourantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";

export default function ManageRestourantPage() {
  const { createRestourent, isPending: isLoadingCreate } =
    useCreateMyRestourent();
  const { restourent } = useGetMyRestourent();
  const { isPending: isLoadingUpdate, updateRestourent } =
    useUpdateMyRestourent();
  const { orders } = useGetMyRestourentOrders();
  const isEditing = !!restourent;
  return (
    <div>
      <Tabs defaultValue="orders" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 pg-10 rounded-lg"
        >
          <h2>{orders?.length} active Orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestourantForm
            restourent={restourent}
            onSave={isEditing ? updateRestourent : createRestourent}
            isLoading={isLoadingCreate || isLoadingUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
