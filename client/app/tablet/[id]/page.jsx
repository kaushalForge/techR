import SideBar from "@/components/Common/SideBar/SideBar";
import TabletBlog from "@/components/Tablets/TabletBlog";
import fetchTabletData from "@/components/SSR/fetchSingleData/fetchTabletData";
import fetchSidebarData from "@/components/SSR/SidebarData/fetchSidebarData";

const page = async ({ params }) => {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_TARGET_TABLET}/${id}`;
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
