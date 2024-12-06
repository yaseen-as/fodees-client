import {
  useCreateMyRestourent,
  useGetMyRestourent,
  useUpdateMyRestourent,
} from "@/api/MyRestourentApi";
import ManageRestourantForm from "@/forms/manage-restourant-form/ManageRestourantForm";

export default function ManageRestourantPage() {
  const { createRestourent, isPending: isLoadingCreate } =
    useCreateMyRestourent();
  const { restourent } = useGetMyRestourent();
  const { isPending: isLoadingUpdate, updateRestourent } =
    useUpdateMyRestourent();
  const isEditing = !!restourent;
  return (
    <div>
      <ManageRestourantForm
        restourent={restourent}
        onSave={isEditing? updateRestourent:createRestourent}
        isLoading={isLoadingCreate || isLoadingUpdate}
      />
    </div>
  );
}
