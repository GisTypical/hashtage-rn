import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../components/providers/AuthProvider";
import { getPosts } from "../utils/Posts";

const useFeed = () => {
  const { following } = useContext(AuthContext);

  return useQuery(["tweets"], () =>
    following ? getPosts({ timeline: true }) : getPosts({ timeline: false })
  );
};

export default useFeed;
