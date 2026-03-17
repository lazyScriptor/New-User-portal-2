import React, { useContext, useEffect } from "react";
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
import KPICards from "./Dashboard/KPICards";
import { AppCustomContext } from "../../App";

export default function CustomerDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { usernamee, rolee, show, setShow } = useContext(AppCustomContext);

  useEffect(() => {
    setShow(false);
  }, []);

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
      path: "/Reports",
    },
    {
      title: "User Management",
      desc: "Manage roles, passwords, and system access",
      icon: faUserAstronaut,
      path: "/userManagement",
    },
  ];

  return (
    <Container maxWidth="2xl" sx={{ py: 4, minHeight: "100vh" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: theme.palette.primary[900], mb: 1 }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Welcome back! Here is a quick summary of your operations.
        </Typography>
      </Box>

      {/* Reused KPI Section */}
      <Box sx={{ mb: 6 }}>
        <KPICards />
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: theme.palette.primary[800], mb: 3 }}
      >
        Quick Navigation
      </Typography>

      {/* Large Navigation Buttons Grid */}
      <Grid container spacing={4}>
        {navCards.map((card, index) => (
          <Fade in={true} timeout={(index + 1) * 400} key={card.title}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                onClick={() => navigate(card.path)}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  minHeight: "220px",
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
                    width: 72,
                    height: 72,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.primary[50],
                    color: theme.palette.primary[600],
                    mb: 3,
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon icon={card.icon} size="2xl" />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: theme.palette.primary[900],
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                  }}
                >
                  {card.desc}
                </Typography>
              </Paper>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}
