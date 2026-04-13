import EditProductClient from "@/components/Admin/EditProductClient";

export default async function EditGenericProductPage({ params }) {
  const { id } = await params;
  return <EditProductClient id={id} />;
}
