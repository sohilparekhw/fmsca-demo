import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography
} from "@mui/material";
import "./App.css"; 

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const getPlaceholder = (field) => {
  const placeholders = {
    Created_DT: "Created Date",
    Modifed_DT: "Modified Date",
    Entity: "Entity",
    operating_status: "Operating Status",
    legal_name: "Legal Name",
    dba_name: "DBA Name",
    physical_address: "Physical Address",
    phone: "Phone",
    usdot_number: "DOT",
    mc_mx_ff_number: "MC/MX/FF",
    power_units: "Power Units",
    out_of_service_date: "Out of Service Date",
  };
  return placeholders[field] || "";
};

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    Created_DT: "",
    Modifed_DT: "",
    Entity: "",
    operating_status: "",
    legal_name: "",
    dba_name: "",
    physical_address: "",
    phone: "",
    usdot_number: "",
    mc_mx_ff_number: "",
    power_units: "",
    out_of_service_date: "",
  });

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/data.json`)
      .then((response) => {
       // console.log("Fetched data:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (event, field) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const filteredData = data.filter((row) => {
    return Object.keys(filters).every((field) => {
      if (!filters[field]) return true;
      return row[field]
        ?.toString()
        .toLowerCase()
        .includes(filters[field].toLowerCase());
    });
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUniqueOptions = (field) => {
    const uniqueValues = [...new Set(data.map(row => row[field]))];
    return uniqueValues.filter(value => value).map(value => ({
      label: value || "Unknown",
      value
    }));
  };

  return (
    <Paper className="table-container">
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        FMSCA Center
      </Typography>
      <div className="table-wrapper">
        <div className="table-scroll">
          <TableContainer>
            <Table className="table">
              <TableHead>
                <TableRow>
                  {[
                    "Created_DT",
                    "Modifed_DT",
                    "Entity",
                    "operating_status",
                    "legal_name",
                    "dba_name",
                    "physical_address",
                    "phone",
                    "usdot_number",
                    "mc_mx_ff_number",
                    "power_units",
                    "out_of_service_date"
                  ].map((field) => (
                    <TableCell key={field} sx={{ fontWeight: "bold" }} className="header-cell">
                      <FormControl fullWidth size="small">
                        <InputLabel>{getPlaceholder(field)}</InputLabel>
                        <Select
                          value={filters[field] || ""}
                          onChange={(event) => handleFilterChange(event, field)}
                          renderValue={(selected) => selected || "All"}
                          label={getPlaceholder(field)}
                        >
                          <MenuItem value="">
                            <em>All</em>
                          </MenuItem>
                          {getUniqueOptions(field).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Created Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Modified Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Entity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Operating Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Legal Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    DBA Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Physical Address
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Phone
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    DOT
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    MC/MX/FF
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Power Units
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} className="header-cell">
                    Out of Service Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell  className="table-cell">
                        {row.Created_DT}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.Modifed_DT}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.Entity}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.operating_status}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.legal_name}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.dba_name}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.physical_address}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.phone}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.usdot_number}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.mc_mx_ff_number}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.power_units}
                      </TableCell>
                      <TableCell  className="table-cell">
                        {row.out_of_service_date}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ marginTop: 2 }}
          className="pagination"
        />
      </div>
    </Paper>
  );
};

export default App;
