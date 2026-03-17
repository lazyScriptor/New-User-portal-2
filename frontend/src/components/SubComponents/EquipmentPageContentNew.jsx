import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCustomerForm from "../Pages/NewCustomerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Card,
  CardContent,
  Divider,
  InputAdornment,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewEquipmentForm } from "./NewEquipmentForm";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Row(props) {
  const { row, searchValue, setData } = props;
  const [open, setOpen] = useState(false);

  const cellStyles = {
    padding: "10px 14px",
    height: "auto",
    width: "auto",
    textAlign: "center",
    fontSize: "0.875rem",
  };

  const highlightText = (text, highlight) => {
    const str = text !== undefined && text !== null ? String(text) : "";
    if (!highlight) return str;
    const parts = str.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const dateFormat = (value) => {
    return value ? dayjs(value).format("YYYY-MM-DD") : "";
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete equipment: ${row.eq_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8085/deleteEquipmentbyId/${row.eq_id}`,
        );
        if (response.status === 200) {
          Swal.fire("Deleted!", "Equipment has been deleted.", "success");
          // Immediate reflection by filtering the deleted row from current state
          setData((prevData) =>
            prevData.filter((item) => item.eq_id !== row.eq_id),
          );
        }
      } catch (error) {
        console.error("Error deleting equipment:", error);
        Swal.fire("Error!", "Failed to delete equipment.", "error");
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={cellStyles}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={cellStyles} component="th" scope="row">
          {highlightText(row.eq_id, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(`${row.eq_name ?? ""}`, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(
            `${row.eq_name_eng ?? row.eq_name ?? ""}`,
            searchValue,
          )}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(`${row.eqcat_name ?? ""}`, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(`${row.eq_rental ?? ""}`, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(dateFormat(row.eq_dofpurchase), searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(dateFormat(row.eq_warranty_expire), searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_cost ?? "", searchValue)}
        </TableCell>

        <TableCell sx={cellStyles}>
          {highlightText(row.eq_description ?? "", searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_defected_status ?? "", searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_completestock ?? "", searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          <IconButton
            size="small"
            color="error"
            onClick={handleDelete}
            title="Delete Equipment"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <NewEquipmentForm
                eq_id={row.eq_id}
                onUpdate={() => {
                  axios
                    .get("http://localhost:8085/equipment")
                    .then((res) => setData(res.data));
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EquipmentTableNew() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // New filter states
  const [categoryFilter, setCategoryFilter] = useState("");
  const [warrantyFilter, setWarrantyFilter] = useState(""); // "active" | "expired" | ""
  const [minStock, setMinStock] = useState("");
  const [rentalMin, setRentalMin] = useState("");
  const [rentalMax, setRentalMax] = useState("");

  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = React.useRef(null);

  const parseCSV = (text) => {
    const result = [];
    let row = [];
    let inQuotes = false;
    let value = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        value += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(value);
        value = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        row.push(value);
        if (row.some((val) => val.trim() !== "")) {
          result.push(row);
        }
        row = [];
        value = "";
      } else {
        value += char;
      }
    }
    if (value || row.length > 0) {
      row.push(value);
      if (row.some((val) => val.trim() !== "")) {
        result.push(row);
      }
    }
    return result;
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadTemplate = () => {
    const headers =
      "eq_name,eq_name_eng,eq_rental,eq_description,eq_dofpurchase,eq_warranty_expire,eq_cost,eq_completestock,eq_catid\n";
    const sample =
      "Drill-1,Drill-1,250,Sample description,2025-01-01,2026-01-01,15000,5,1\n";
    const blob = new Blob([headers + sample], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Equipment_Import_Template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rows = parseCSV(text);
      if (rows.length < 2) {
        Swal.fire("Error", "CSV file is empty or invalid", "error");
        e.target.value = null;
        return;
      }

      const headers = rows[0].map((h) => h.trim());
      const expectedHeaders = [
        "eq_name",
        "eq_name_eng",
        "eq_rental",
        "eq_description",
        "eq_dofpurchase",
        "eq_warranty_expire",
        "eq_cost",
        "eq_completestock",
        "eq_catid",
      ];

      const missingHeaders = expectedHeaders.filter(
        (h) => !headers.includes(h),
      );
      if (missingHeaders.length > 0) {
        Swal.fire(
          "Error",
          `Missing expected columns: ${missingHeaders.join(", ")}`,
          "error",
        );
        e.target.value = null;
        return;
      }

      const parsedData = [];
      for (let i = 1; i < rows.length; i++) {
        if (rows[i].length === 1 && rows[i][0].trim() === "") continue;
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] =
            rows[i][index] !== undefined ? rows[i][index].trim() : null;
        });
        if (Object.values(obj).some((val) => val !== null && val !== "")) {
          parsedData.push(obj);
        }
      }

      if (parsedData.length === 0) {
        Swal.fire("Error", "No valid data found in CSV", "error");
        e.target.value = null;
        return;
      }

      const confirm = await Swal.fire({
        title: "Confirm Import",
        text: `Are you sure you want to import ${parsedData.length} equipment items?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, import!",
      });

      if (confirm.isConfirmed) {
        setIsImporting(true);
        try {
          const response = await axios.post(
            "http://localhost:8085/importEquipment",
            {
              equipments: parsedData,
            },
          );
          if (response.data.success) {
            Swal.fire("Success", response.data.message, "success").then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire(
              "Error",
              response.data.message || "Failed to import",
              "error",
            );
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Server error during import", "error");
        } finally {
          setIsImporting(false);
        }
      }
      e.target.value = null;
    };
    reader.onerror = () => {
      Swal.fire("Error", "Failed to read file", "error");
      e.target.value = null;
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8085/equipment");
        setData(res.data);
      } catch (error) {
        console.error("error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const categories = React.useMemo(
    () =>
      Array.from(
        new Set((data || []).map((r) => r.eqcat_name).filter(Boolean)),
      ),
    [data],
  );

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(column);

    const isDateColumn = ["eq_dofpurchase", "eq_warranty_expire"].includes(
      column,
    );
    const isNumericColumn = [
      "eq_id",
      "eq_rental",
      "eq_cost",
      "eq_defected_status",
      "eq_completestock",
    ].includes(column);

    const sortedData = [...data].sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      if (isDateColumn) {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      } else if (isNumericColumn) {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = String(aVal ?? "").toLowerCase();
        bVal = String(bVal ?? "").toLowerCase();
      }

      if (aVal < bVal) return newOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const headerStyles = {
    cursor: "pointer",
    backgroundColor: (theme) => theme.palette.primary?.main || "#1976d2",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: (theme) => theme.palette.primary?.dark || "#1565c0",
    },
    transition: "background-color 0.3s ease",
  };

  const staticHeaderStyles = {
    backgroundColor: (theme) => theme.palette.primary?.main || "#1976d2",
    color: "white",
    fontWeight: "bold",
  };

  // Multi-field search + filters
  const filteredData = data.filter((row) => {
    const q = (searchValue || "").trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      [
        row.eq_id,
        row.eq_name,
        row.eq_name_eng,
        row.eq_description,
        row.eqcat_name,
      ]
        .map((v) => (v ?? "").toString().toLowerCase())
        .some((v) => v.includes(q));

    const matchesCategory =
      !categoryFilter || row.eqcat_name === categoryFilter;

    const warrantyDate = row.eq_warranty_expire
      ? new Date(row.eq_warranty_expire)
      : null;
    const now = new Date();
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();
    const isWarrantyActive = warrantyDate
      ? warrantyDate.getTime() >= todayMidnight
      : false;

    const matchesWarranty =
      !warrantyFilter ||
      (warrantyFilter === "active" && isWarrantyActive) ||
      (warrantyFilter === "expired" && !isWarrantyActive);

    const matchesMinStock =
      minStock === "" || Number(row.eq_completestock ?? 0) >= Number(minStock);
    const rental = Number(row.eq_rental ?? 0);
    const matchesRentalMin = rentalMin === "" || rental >= Number(rentalMin);
    const matchesRentalMax = rentalMax === "" || rental <= Number(rentalMax);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesWarranty &&
      matchesMinStock &&
      matchesRentalMin &&
      matchesRentalMax
    );
  });

  return (
    <>
      <CustomerPageUpper />

      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              size="small"
              placeholder="Search by ID, Name, Eng, Desc, Category..."
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                flexGrow: 1,
                maxWidth: 600,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadTemplate}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Template
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FileUploadIcon />}
                onClick={handleImportClick}
                disabled={isImporting}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                }}
              >
                {isImporting ? "Importing..." : "Import CSV"}
              </Button>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FilterListIcon fontSize="small" /> Filters:
            </Typography>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Warranty</InputLabel>
              <Select
                value={warrantyFilter}
                label="Warranty"
                onChange={(e) => setWarrantyFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Min Stock"
              type="number"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              sx={{
                width: 120,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />

            <TextField
              size="small"
              label="Min Rental (LKR)"
              type="number"
              value={rentalMin}
              onChange={(e) => setRentalMin(e.target.value)}
              sx={{
                width: 140,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />

            <TextField
              size="small"
              label="Max Rental (LKR)"
              type="number"
              value={rentalMax}
              onChange={(e) => setRentalMax(e.target.value)}
              sx={{
                width: 140,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />

            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                setSearchValue("");
                setCategoryFilter("");
                setWarrantyFilter("");
                setMinStock("");
                setRentalMin("");
                setRentalMax("");
              }}
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Clear Filters
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: "calc(100vh - 280px)",
          overflow: "auto",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={staticHeaderStyles} />
              <TableCell
                align="center"
                onClick={() => handleSort("eq_id")}
                sx={headerStyles}
              >
                Id {orderBy === "eq_id" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_name")}
                sx={headerStyles}
              >
                Machine Name{" "}
                {orderBy === "eq_name" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_name_eng")}
                sx={headerStyles}
              >
                Machine Name English{" "}
                {orderBy === "eq_name_eng" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eqcat_name")}
                sx={headerStyles}
              >
                Category Name{" "}
                {orderBy === "eqcat_name" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_rental")}
                sx={headerStyles}
              >
                Rental{" "}
                {orderBy === "eq_rental" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_dofpurchase")}
                sx={headerStyles}
              >
                DOP{" "}
                {orderBy === "eq_dofpurchase" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_warranty_expire")}
                sx={headerStyles}
              >
                Warranty Due{" "}
                {orderBy === "eq_warranty_expire" &&
                  (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_cost")}
                sx={headerStyles}
              >
                Machine Cost{" "}
                {orderBy === "eq_cost" && (order === "asc" ? "↑" : "↓")}
              </TableCell>

              <TableCell
                align="center"
                onClick={() => handleSort("eq_description")}
                sx={headerStyles}
              >
                Description{" "}
                {orderBy === "eq_description" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_defected_status")}
                sx={headerStyles}
              >
                Defected Qty{" "}
                {orderBy === "eq_defected_status" &&
                  (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("eq_completestock")}
                sx={headerStyles}
              >
                Stock remaining{" "}
                {orderBy === "eq_completestock" &&
                  (order === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell align="center" sx={staticHeaderStyles}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <Row
                key={row.eq_id}
                row={row}
                searchValue={searchValue}
                setData={setData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function CustomerPageUpper() {
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Accordion
        elevation={0}
        sx={{
          borderRadius: 2,
          "&:before": { display: "none" },
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: "#f8fafc" }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            <AddBoxIcon color="primary" /> Add New Equipment
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, backgroundColor: "#ffffff" }}>
          <CustomerPageMiddle />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function CustomerPageMiddle() {
  const [dbCustomerFound, setDbCustomerFound] = useState("");

  const textFieldStyle = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  };

  const searchById = (id) => {
    try {
      axios.get(`http://localhost:8085/getCustomerById/${id}`).then((res) => {
        setDbCustomerFound(res.data);
      });
    } catch (error) {
      console.error("error occurred in the try catch block", error);
    }
  };

  const validationSchema = yup.object().shape({
    eq_name: yup.string().required("Machine Name is required"),
    eq_name_eng: yup.string(),
    eq_catid: yup.number().required("Category is required"),
    eq_dofpurchase: yup
      .date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .notRequired(),

    eq_warranty_expire: yup
      .date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .notRequired(),
    eq_cost: yup
      .number()
      .typeError("Machine cost must be a number")
      .required("Machine cost is required")
      .positive("Machine cost must be positive"),
    eq_rental: yup
      .number()
      .typeError("Rental must be a number")
      .required("Rental is required")
      .positive("Rental must be positive"),
    eq_description: yup.string(),
    eq_completestock: yup
      .number()
      .typeError("Complete stock must be a number")
      .required("Complete stock is required")
      .positive("Complete stock must be positive"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClear = () => {
    reset();
    setValue("eq_name", "");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8085/addEquipment",
        data,
      );
      window.location.reload();
      Swal.fire("Success", "Machine added successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to add machine", "error");
    }
  };

  const fetchData = async () => {
    try {
      await axios.get("http://localhost:8085/equipment");
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            p: 2,
            mb: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
          >
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <FormControl sx={{ gap: "20px", width: "100%" }}>
                  <Box>
                    <TextField
                      label="Machine Name (Sinhala/Default)"
                      size="small"
                      variant="outlined"
                      sx={textFieldStyle}
                      {...register("eq_name")}
                      error={!!errors.eq_name}
                      helperText={errors.eq_name?.message}
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Machine Name (English)"
                      size="small"
                      variant="outlined"
                      sx={textFieldStyle}
                      {...register("eq_name_eng")}
                      error={!!errors.eq_name_eng}
                      helperText={errors.eq_name_eng?.message}
                    />
                  </Box>
                  <Box>
                    <FormControl fullWidth size="small" sx={textFieldStyle}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        {...register("eq_catid")}
                        error={!!errors.eq_catid}
                        value={getValues("eq_catid") || ""}
                        onChange={(e) =>
                          setValue("eq_catid", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <MenuItem value={1}>1 Day machine</MenuItem>
                        <MenuItem value={2}>5 Day machine</MenuItem>
                        <MenuItem value={3}>4 Day machine</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      label="Rental Rate (LKR)"
                      size="small"
                      variant="outlined"
                      sx={textFieldStyle}
                      {...register("eq_rental")}
                      error={!!errors.eq_rental}
                      helperText={errors.eq_rental?.message}
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Machine Cost (LKR)"
                      size="small"
                      variant="outlined"
                      sx={textFieldStyle}
                      {...register("eq_cost")}
                      error={!!errors.eq_cost}
                      helperText={errors.eq_cost?.message}
                    />
                  </Box>
                </FormControl>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <FormControl sx={{ gap: "20px", width: "100%" }}>
                  <Box>
                    <TextField
                      label="Complete Stock"
                      size="small"
                      variant="outlined"
                      sx={textFieldStyle}
                      {...register("eq_completestock")}
                      error={!!errors.eq_completestock}
                      helperText={errors.eq_completestock?.message}
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Description"
                      size="small"
                      variant="outlined"
                      sx={textFieldStyle}
                      {...register("eq_description")}
                      error={!!errors.eq_description}
                      helperText={errors.eq_description?.message}
                    />
                  </Box>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Purchase"
                        {...register("eq_dofpurchase")}
                        value={getValues("eq_dofpurchase") || null}
                        onChange={(date) =>
                          setValue("eq_dofpurchase", date, {
                            shouldValidate: true,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={textFieldStyle}
                            error={!!errors.eq_dofpurchase}
                            helperText={errors.eq_dofpurchase?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Warranty Expiration Date"
                        {...register("eq_warranty_expire")}
                        value={getValues("eq_warranty_expire") || null}
                        onChange={(date) =>
                          setValue("eq_warranty_expire", date, {
                            shouldValidate: true,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={textFieldStyle}
                            error={!!errors.eq_warranty_expire}
                            helperText={errors.eq_warranty_expire?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "30px",
                gap: "20px",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClear}
                sx={{
                  minWidth: "120px",
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  minWidth: "140px",
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Save Equipment
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
