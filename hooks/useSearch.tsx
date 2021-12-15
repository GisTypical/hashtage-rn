import { useQuery } from "react-query";
import { searchPost } from "../utils/Posts";

interface Props {
  search: string;
}

const useSearch = ({ search }: Props) => {
  return useQuery("search", () => searchPost(search), {
    enabled: false,
  });
};

export default useSearch;
