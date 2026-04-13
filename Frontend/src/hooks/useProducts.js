import { useQuery } from "react-query";
import { fetchProducts, fetchTargetProduct, URLS } from "../config/api";

const queryConfig = { staleTime: 1000 * 60 * 5 };

export const useLatest = () =>
  useQuery("latest", () => fetchProducts(URLS.latest), queryConfig);
export const useMostPopular = () =>
  useQuery("mostPopular", () => fetchProducts(URLS.mostPopular), queryConfig);
export const useMostSold = () =>
  useQuery("mostSold", () => fetchProducts(URLS.mostSold), queryConfig);
export const useBudget = () =>
  useQuery("budget", () => fetchProducts(URLS.budget), queryConfig);
export const useMidrange = () =>
  useQuery("midrange", () => fetchProducts(URLS.midrange), queryConfig);
export const useFlagship = () =>
  useQuery("flagship", () => fetchProducts(URLS.flagship), queryConfig);
export const useRecommended = () =>
  useQuery("recommended", () => fetchProducts(URLS.recommended), queryConfig);

// for phones/gaming route: useProducts("gaming")
export const useProducts = (key) =>
  useQuery(key, () => fetchProducts(URLS[key]), queryConfig);

export const useTargetProduct = (type, name, navigate) =>
  useQuery(
    ["product", type, name],
    () => fetchTargetProduct(type, name, navigate),
    { staleTime: 1000 * 60 * 5, enabled: !!name },
  );
