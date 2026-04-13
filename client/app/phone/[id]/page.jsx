import SideBar from "@/components/Common/SideBar/SideBar";
import PhoneBlog from "@/components/Phones/PhoneBlog";
import fetchPhoneData from "@/components/SSR/fetchSingleData/fetchPhoneData";
import fetchSidebarData from "@/components/SSR/SidebarData/fetchSidebarData";
import API_BASE_URL from "@/lib/apiBaseUrl";

const page = async ({ params }) => {
  const { id } = await params;
  const url = `${API_BASE_URL}/api/products/phone/${id}`;
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
