import EditProductClient from "@/components/Admin/EditProductClient";

export default async function EditLaptopPage({ params }) {
  const { id } = await params;
  return <EditProductClient id={id} forcedType="laptop" />;
}
