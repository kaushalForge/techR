import SideBar from "@/components/Common/SideBar/SideBar";
import LaptopBlog from "@/components/Laptops/LaptopBlog";
import fetchLaptopData from "@/components/SSR/fetchSingleData/fetchLaptopData";
import fetchSidebarData from "@/components/SSR/SidebarData/fetchSidebarData";

const page = async ({ params }) => {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_TARGET_LAPTOP}/${id}`;
  const sidebarData = await fetchSidebarData();
  const data = await fetchLaptopData(url);

  return (
    <div className="flex">
      <SideBar {...sidebarData} />
      <LaptopBlog {...data} />
    </div>
  );
};

export default page;
