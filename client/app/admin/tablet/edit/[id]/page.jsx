import EditProductClient from "@/components/Admin/EditProductClient";

export default async function EditTabletPage({ params }) {
  const { id } = await params;
  return <EditProductClient id={id} forcedType="tablet" />;
}
