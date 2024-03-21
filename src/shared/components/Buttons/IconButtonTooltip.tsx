import { SvgIconComponent } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export interface IconButtonTooltipProps {
  Icon: SvgIconComponent;
  variant?: string;
  hover?: string;
  tooltip?: string;
  textVariant?: string;
}

const IconButtonTooltip = ({
  Icon,
  variant,
  hover,
  tooltip,
  textVariant,
}: IconButtonTooltipProps) => {
  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        sx={{
          ...(variant && {
            color: (theme) =>
              theme.palette.getContrastText(textVariant || variant),
            backgroundColor: variant,
            "&:hover": {
              backgroundColor: hover,
            },
          }),
        }}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonTooltip;
