import { useQuery } from "react-query";
import { getThread } from "../utils/Posts";

interface Props {
  route: {
    params: string;
  };
}

const useThread = ({ route }: Props) => {
  return useQuery(["tweets", "thread", route.params], () =>
    getThread(route.params)
  );
};

export default useThread;
