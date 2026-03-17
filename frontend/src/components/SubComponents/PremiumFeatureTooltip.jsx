import React, { forwardRef } from "react";
import { Tooltip, Box, Typography, Zoom } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

// A subtle continuous shine/pulse animation for the premium icon
const shimmer = keyframes`
  0% { opacity: 0.8; transform: scale(1); text-shadow: 0 0 0px transparent; }
  50% { opacity: 1; transform: scale(1.1); text-shadow: 0 0 10px #FFD700; }
  100% { opacity: 0.8; transform: scale(1); text-shadow: 0 0 0px transparent; }
`;

const PremiumFeatureTooltip = forwardRef((props, ref) => {
  const { children, title = "Premium Feature", ...rest } = props;

  return (
    <Tooltip
      title={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 0.5 }}>
          <WorkspacePremiumIcon
            sx={{
              color: "#FFD700",
              fontSize: "1.5rem",
              animation: `${shimmer} 2s infinite ease-in-out`,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#f3d37a", letterSpacing: 0.5 }}
          >
            {title}
          </Typography>
        </Box>
      }
      placement="right"
      TransitionComponent={Zoom}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            background: "linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)",
            border: "1px solid #c5a059",
            boxShadow: "0px 8px 24px rgba(197, 160, 89, 0.25)",
            borderRadius: "8px",
            padding: "8px 14px",
          },
        },
        arrow: {
          sx: {
            color: "#1e1e1e",
            "&::before": { border: "1px solid #c5a059" },
          },
        },
      }}
    >
      {/* Wrapper to intercept hover actions on a disabled child component */}
      <Box
        component="div"
        sx={{
          cursor: "not-allowed",
          display: "flex",
          width: "100%",
          "& > *": { pointerEvents: "none !important" },
        }}
      >
        {React.cloneElement(children, {
          ...rest, // Forward all injected props (like value, onChange) from <Tabs /> to the <Tab />
          ref,
        })}
      </Box>
    </Tooltip>
  );
});

PremiumFeatureTooltip.displayName = "PremiumFeatureTooltip";

export default PremiumFeatureTooltip;
