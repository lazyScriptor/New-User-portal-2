import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend,
} from "chart.js";
import { Paper, Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EquipmentRevenueDoughnut({ startDate, endDate }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const params = {};
    if (startDate) params.startDate = new Date(startDate).toISOString();
    if (endDate) params.endDate = new Date(endDate).toISOString();
    axios
      .get("http://localhost:8085/reports/getEquipmentRevenueDetails", { params })
      .then((res) => setRows(res.data.response || []))
      .catch(() => setRows([]));
  }, [startDate, endDate]);

  const data = {
    labels: rows.map((x) => x.eq_name),
    datasets: [{ data: rows.map((x) => Number(x.total_revenue || 0)) }],
  };
  const options = {
    responsive: true,
    plugins: { legend: { position: "left" }, tooltip: { callbacks: {
      label: (ctx)=> `Rs. ${Number(ctx.raw).toLocaleString()}`
    }}},
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Revenue by Equipment
      </Typography>
      <Box sx={{ height: 300 }}>
        <Doughnut data={data} options={options} />
      </Box>
    </Paper>
  );
}