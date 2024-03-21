import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useLangStyle, useScreenSizeStyle } from "../../shared/hooks/useStyle";
import useGetAllUsersParamsStore from "../user-manager/user/users/store/useGetAllUsersParams.store";
import { PaginationDetails } from "../../api/types/response.types";

export default function CustomPagination({
  paginationDetails,
}: {
  paginationDetails: PaginationDetails;
}) {
  const { pagination, handlePagination } = useGetAllUsersParamsStore();
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);

  // console.log(query);

  // const paginateTo = () => {};
  return (
    <Pagination
      sx={{
        "& .MuiPagination-ul": {
          flexDirection: useLangStyle("row-reverse", "row"),
        },
      }}
      page={pagination.page}
      count={paginationDetails.numOfPages}
      variant="outlined"
      color="primary"
      size={useScreenSizeStyle("medium", "small", "down", "sm")}
      showFirstButton
      showLastButton
      siblingCount={useScreenSizeStyle(0, 1)}
      boundaryCount={useScreenSizeStyle(2, 1, "down", "sm")}
      renderItem={({ onClick, ...item }) => (
        <PaginationItem
          component="span"
          onClick={(e) => {
            onClick(e);
            handlePagination(item.page!);
          }}
          {...item}
        />
      )}
    />
  );
}
