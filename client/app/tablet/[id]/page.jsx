import SideBar from "@/components/Common/SideBar/SideBar";
import TabletBlog from "@/components/Tablets/TabletBlog";
import fetchTabletData from "@/components/SSR/fetchSingleData/fetchTabletData";
import fetchSidebarData from "@/components/SSR/SidebarData/fetchSidebarData";
import API_BASE_URL from "@/lib/apiBaseUrl";

const page = async ({ params }) => {
  const { id } = await params;
  const url = `${API_BASE_URL}/api/products/tablet/${id}`;
  const sidebarData = await fetchSidebarData();
  const data = await fetchTabletData(url);

  return (
    <div className="flex">
      <SideBar {...sidebarData} />
      <TabletBlog {...data} />
    </div>
  );
};

export default page;
