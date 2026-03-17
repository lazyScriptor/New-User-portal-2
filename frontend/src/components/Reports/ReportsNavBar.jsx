import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import PremiumFeatureTooltip from "../SubComponents/PremiumFeatureTooltip";

function ReportsNavBar() {
  const navigate = useNavigate();
  const theme = useTheme();

  const activeButtonStyle = {
    width: "20vw",
    height: "100px",
    backgroundColor: theme.palette.primary[500],
    borderRadius: "20px",
    marginBottom: "10px",
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary[600],
    },
  };

  const disabledButtonStyle = {
    width: "20vw",
    height: "100px",
    borderRadius: "20px",
    marginBottom: "10px",
    "&.Mui-disabled": {
      backgroundColor: theme.palette.primary[50],
      color: theme.palette.primary[200],
    },
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      gap={4}
    >
      <Box sx={{ width: "fit-content" }}>
        <PremiumFeatureTooltip title="Premium Feature: Unlock to view equipment reports">
          <Button variant="contained" sx={disabledButtonStyle} disabled={true}>
            <ConstructionIcon sx={{ fontSize: 80 }} />
          </Button>
        </PremiumFeatureTooltip>
      </Box>

      <Box sx={{ width: "fit-content" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/Reports-invoices")}
          sx={activeButtonStyle}
        >
          <DescriptionOutlinedIcon sx={{ fontSize: 80 }} />
        </Button>
      </Box>

      <Box sx={{ width: "fit-content" }}>
        <PremiumFeatureTooltip title="Premium Feature: Unlock to view customer reports">
          <Button variant="contained" sx={disabledButtonStyle} disabled={true}>
            <PersonSearchIcon sx={{ fontSize: 80 }} />
          </Button>
        </PremiumFeatureTooltip>
      </Box>
    </Box>
  );
}

export default ReportsNavBar;
