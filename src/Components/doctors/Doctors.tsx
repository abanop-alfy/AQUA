import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
interface iDuties {
  duties: string;
  doctor_id: number;
}
interface iCourse {
  id: number;
  name: string;
  email: string;
  duties: iDuties[] | any;
  teaching_hours: number;
  is_working: number;
  speciality: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator(
  order: Order,
  orderBy: string
): (a: any, b: any) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<iCourse>(
  array: iCourse[],
  comparator: (a: iCourse, b: iCourse) => number
) {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [iCourse, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default function Doctors() {
  const [allData, setAllData] = useState<iCourse[]>([]);
  const [rows, setRows] = useState<iCourse[]>();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("code");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [duties, setDuties] = useState("");
  let history = useHistory();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const filterByCode = (val: string) => {
    setName(val);
    const arr = allData.filter(a =>
      a.name.toLowerCase().includes(val.toLowerCase())
    );
    setRows(arr);
  };
  const filterBySpeciality = (val: string) => {
    setSpeciality(val);
    const arr = allData.filter(
      a =>
        a.speciality && a.speciality.toLowerCase().includes(val.toLowerCase())
    );
    setRows(arr);
  };
  const filterByDuties = (val: string) => {
    setDuties(val);
    const arr = allData.filter(a =>
      getSkills(a)
        .toLowerCase()
        .includes(val.toLowerCase())
    );
    setRows(arr);
  };
  const getSkills = (row: iCourse) => {
    return typeof row.duties === "string"
      ? row.duties
      : row.duties.map((a: iDuties) => a.duties).join(", ");
  };
 
  useEffect(() => {
    const token = {
      headers: { 
        Authorization: `Bearer `+ localStorage.getItem("AQUA_token")
       }
    }
    axios
      .get(`http://127.0.0.1:8000/api/Admin/doctor`,token)
      .then(response => {
        setAllData(response.data.data);
        setRows(response.data.data);
        console.log(response.data.data.filter((a: any) => !a.speciality));
      })
      .catch(err => {
        if(err.message === 'Request failed with status code 401') {
          localStorage.removeItem('AQUA_token');
          localStorage.removeItem('AQUA_UserType');
          toastr.clear();
          toastr.error(`you're not authorized please login again with the right role`);
          history.push('/login');
        }
      });
  }, [history]);

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{width:150}} sortDirection={orderBy === "name" ? order : false}>
                <TextField style={{width:120}}
                  id="name"
                  autoComplete="off"
                  size="small"
                  label=" name"
                  variant="outlined"
                  value={name}
                  onChange={e => {
                    filterByCode(e.target.value);
                  }}
                />
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={ev => {
                    handleRequestSort(ev, "name");
                  }}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={ev => {
                    handleRequestSort(ev, "email");
                  }}
                >
                  email
                </TableSortLabel>
              </TableCell>
              <TableCell style={{width:150}}
                sortDirection={orderBy === "speciality" ? order : false}
              >
                <TextField style={{width:120}}
                  id="speciality"
                  autoComplete="off"
                  size="small"
                  label=" speciality"
                  variant="outlined"
                  value={speciality}
                  onChange={e => {
                    filterBySpeciality(e.target.value);
                  }}
                />
                <TableSortLabel
                  active={orderBy === "speciality"}
                  direction={orderBy === "speciality" ? order : "asc"}
                  onClick={ev => {
                    handleRequestSort(ev, "speciality");
                  }}
                ></TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "teaching_hours"}
                  direction={orderBy === "teaching_hours" ? order : "asc"}
                  onClick={ev => {
                    handleRequestSort(ev, "teaching_hours");
                  }}
                >
                  teaching_hours
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "is_working"}
                  direction={orderBy === "is_working" ? order : "asc"}
                  onClick={ev => {
                    handleRequestSort(ev, "is_working");
                  }}
                >
                  is_working
                </TableSortLabel>
              </TableCell>
              <TableCell style={{width:130}} sortDirection={orderBy === "duties" ? order : false} >
                <TextField style={{width:100}}
                  id="duties"
                  autoComplete="off"
                  size="small"
                  label=" duties"
                  variant="outlined"
                  value={duties}
                  onChange={e => {
                    filterByDuties(e.target.value);
                  }}
                />
                <TableSortLabel
                  active={orderBy === "duties"}
                  direction={orderBy === "duties" ? order : "asc"}
                  onClick={ev => {
                    handleRequestSort(ev, "duties");
                  }}
                ></TableSortLabel>
              </TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: iCourse) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.speciality}</TableCell>
                    <TableCell>{row.teaching_hours}</TableCell>
                    <TableCell>{row.is_working ? "yes" : "no"}</TableCell>
                    <TableCell>{getSkills(row)}</TableCell>
                    {/* <TableCell>
                      <Button variant="contained" color="secondary">
                        Edit
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
