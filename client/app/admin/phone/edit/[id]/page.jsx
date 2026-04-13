import EditProductClient from "@/components/Admin/EditProductClient";

export default async function EditPhonePage({ params }) {
  const { id } = await params;
  return <EditProductClient id={id} forcedType="phone" />;
}
