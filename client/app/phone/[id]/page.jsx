import SideBar from "@/components/Common/SideBar/SideBar";
import PhoneBlog from "@/components/Phones/PhoneBlog";
import fetchPhoneData from "@/components/SSR/fetchSingleData/fetchPhoneData";
import fetchSidebarData from "@/components/SSR/SidebarData/fetchSidebarData";

const page = async ({ params }) => {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_TARGET_PHONE}/${id}`;
  const sidebarData = await fetchSidebarData();
  const data = await fetchPhoneData(url);

  return (
    <div className="flex">
      <SideBar {...sidebarData} />
      <PhoneBlog {...data} />
    </div>
  );
};

export default page;
