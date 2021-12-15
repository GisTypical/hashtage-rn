import { useQuery } from "react-query";
import { getPosts } from "../utils/Posts";

const useFeed = () => {
  return useQuery(["tweets"], getPosts);
};

export default useFeed;
