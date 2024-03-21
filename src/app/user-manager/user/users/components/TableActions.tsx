import { Stack } from "@mui/material";
import { Add, FileDownload } from "@mui/icons-material";
import { blue, green } from "@mui/material/colors";
import IconButtonTooltip from "../../../../../shared/components/Buttons/IconButtonTooltip";

const TableActions = () => {
  return (
    <Stack direction={"row"} justifyContent={"end"} gap={1} my={2}>
      <IconButtonTooltip
        tooltip="Export"
        Icon={FileDownload}
        variant={blue[500]}
        hover={blue[700]}
      />
      <IconButtonTooltip
        tooltip="Add"
        Icon={Add}
        variant={green[500]}
        textVariant={green[900]}
        hover={green[700]}
      />
    </Stack>
  );
};

export default TableActions;
