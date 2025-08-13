import Landing from "./Landing";
import fetchHomeData from "../../SSR/fetchHomeData/fetchHomeData";

const Home = async () => {
  const data = await fetchHomeData();
  return <Landing {...data} />;
};

export default Home;
