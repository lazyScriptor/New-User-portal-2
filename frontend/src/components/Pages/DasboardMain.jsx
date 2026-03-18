import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  Fade,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faUser,
  faToolbox,
  faNewspaper,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import "../Stylings/rootstyles.css";

// Filters
import DashboardFilters from "./Dashboard/DashboardFilters";

// Charts
import EquipmentRevenueDoughnut from "./Dashboard/Chart1";
import Chart2 from "./Dashboard/Chart2";
import Chart3 from "./Dashboard/Chart3";
import Chart4 from "./Dashboard/Chart4";
import RevenueVsIncomeChart from "./Dashboard/RevenueVsIncomeChart";
import EquipmentUtilizationBar from "./Dashboard/EquipmentUtilizationBar";

/**
 * Refactored Dashboard main layout with a responsive grid and date-range filter.
 * Passes the applied range to children via props: { startDate, endDate }.
 */
export default function DasboardMain() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Define the navigation options mapping to your existing routes
  const navCards = [
    {
      title: "Invoices",
      desc: "Manage billing, create new invoices, and view receipts",
      icon: faLayerGroup,
      path: "/Invoice",
    },
    {
      title: "Customers",
      desc: "View and manage your customer database",
      icon: faUser,
      path: "/customers",
    },
    {
      title: "Equipment",
      desc: "Track inventory, rentals, and machine statuses",
      icon: faToolbox,
      path: "/Equipment",
    },
    {
      title: "Reports",
      desc: "Analyze business metrics, logs, and general reports",
      icon: faNewspaper,
      path: "/Reports-invoices",
    },
    {
      title: "User Management",
      desc: "Manage roles, passwords, and system access",
      icon: faUserAstronaut,
      path: "/userManagement",
    },
  ];

  const [range, setRange] = useState({
    startDate: "",
    endDate: "",
    appliedStart: "",
    appliedEnd: "",
  });

  const onChange = (field, value) =>
    setRange((r) => ({ ...r, [field]: value }));
  const onApply = () =>
    setRange((r) => ({
      ...r,
      appliedStart: r.startDate || "",
      appliedEnd: r.endDate || "",
    }));
  const onReset = () =>
    setRange({ startDate: "", endDate: "", appliedStart: "", appliedEnd: "" });

  const filters = useMemo(
    () => ({ startDate: range.appliedStart, endDate: range.appliedEnd }),
    [range.appliedStart, range.appliedEnd],
  );

  // Premium card styling for charts
  const chartCardStyle = {
    p: 3,
    borderRadius: 4,
    height: "100%",
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${theme.palette.primary[50]}`,
    backgroundColor: "#ffffff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: `0px 15px 35px ${theme.palette.primary[100]}`,
    },
  };

  return (
    <Container maxWidth="2xl" sx={{ py: 4, minHeight: "100vh" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: theme.palette.primary[900], mb: 1 }}
        >
          Administration Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Your central hub for operations, navigation, and analytics.
        </Typography>
      </Box>

      {/* Navigation Buttons Row */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          {navCards.map((card, index) => (
            <Fade in={true} timeout={(index + 1) * 300} key={card.title}>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <Paper
                  elevation={0}
                  onClick={() => navigate(card.path)}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    minHeight: "180px",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: theme.palette.primary[100],
                    backgroundColor: "#ffffff",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 30px -10px ${theme.palette.primary[200]}`,
                      borderColor: theme.palette.primary[300],
                      "& .icon-box": {
                        backgroundColor: theme.palette.primary[500],
                        color: "#ffffff",
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.palette.primary[50],
                      color: theme.palette.primary[600],
                      mb: 2,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <FontAwesomeIcon icon={card.icon} size="lg" />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: theme.palette.primary[900],
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", lineHeight: 1.4 }}
                  >
                    {card.desc}
                  </Typography>
                </Paper>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Box>

      {/* Filters Row */}
      <Box sx={{ mb: 4 }}>
        <DashboardFilters
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={onChange}
          onApply={onApply}
          onReset={onReset}
        />
      </Box>

      {/* Charts Display */}
      <Grid container spacing={3}>
        {/* Row 1: 3-column layout */}
        <Grid item xs={12} md={4}>
          <Paper sx={chartCardStyle}>
            <EquipmentRevenueDoughnut {...filters} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={chartCardStyle}>
            <RevenueVsIncomeChart {...filters} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={chartCardStyle}>
            <Chart4 />
          </Paper>
        </Grid>

        {/* Row 2: 2-column layout */}
        <Grid item xs={12} md={6}>
          <Paper sx={chartCardStyle}>
            <Chart2 {...filters} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={chartCardStyle}>
            <Chart3 {...filters} />
          </Paper>
        </Grid>

        {/* Row 3: Full width layout */}
        <Grid item xs={12}>
          <Paper sx={{ ...chartCardStyle, minHeight: "450px" }}>
            <EquipmentUtilizationBar {...filters} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
