import SideBar from "@/components/Common/SideBar/SideBar";
import LaptopBlog from "@/components/Laptops/LaptopBlog";
import fetchLaptopData from "@/components/SSR/fetchSingleData/fetchLaptopData";
import fetchSidebarData from "@/components/SSR/SidebarData/fetchSidebarData";
import API_BASE_URL from "@/lib/apiBaseUrl";

const page = async ({ params }) => {
  const { id } = await params;
  const url = `${API_BASE_URL}/api/products/laptop/${id}`;
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
