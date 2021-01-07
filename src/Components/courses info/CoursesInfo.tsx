import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

interface iCourse {
  Doctor_name: string;
  Doctor_id: number;
  Activated_course_id: number;
  course_code: string;
  course_name: string;
  semester: string;
  year: number; //string
  description: string | null;
  missing_file: string;
  file_id: null;
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
  return stabilizedThis.map((el) => el[0]);
}

export default function CoursesInfo() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("code");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [allData, setAllData] = useState<iCourse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [code, setCode] = useState("");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const arr = allData.filter((a) => a.year === currentYear);
  const [rows, setRows] = useState<iCourse[]>(arr);
  let history = useHistory();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const filterByCode = (val: string) => {
    setCode(val);
    const arr = allData.filter(
      (a) => a.course_code.includes(val) && a.year === year
    );
    setRows(arr);
  };
  const filterByYear = (event: React.ChangeEvent<{ value: unknown }>) => {
    const y = event.target.value as string;
    setYear(parseInt(y));
    const arr = allData.filter((a) => a.year.toString() === y);
    setRows(arr);
  };
  function goToForms(id: Number) {
    history.push("/FormsInfo/" + id);
  }
  function goToStat(idDoctor: Number, id: number) {
    history.push("/CourseReport/" + idDoctor + "/" + id);
  }
  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Admin/courseinfo`, token)
      .then((response) => {
        setAllData(response.data);
        setRows(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          localStorage.removeItem("AQUA_token");
          localStorage.removeItem("AQUA_UserType");
          toastr.clear();
          toastr.error(
            `you're not authorized please login again with the right role`
          );
          history.push("/login");
        }
      });
  }, [history]);
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={orderBy === "course_code" ? order : false}
                style={{ width: "150px" }}
              >
                <TextField
                  style={{ width: 120 }}
                  id="course_code"
                  autoComplete="off"
                  size="small"
                  label="Course Code"
                  variant="outlined"
                  value={code}
                  onChange={(e) => {
                    filterByCode(e.target.value);
                  }}
                />
                <TableSortLabel
                  active={orderBy === "course_code"}
                  direction={orderBy === "course_code" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "course_code");
                  }}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "course_name"}
                  direction={orderBy === "course_name" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "course_name");
                  }}
                >
                  Course name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "description"}
                  direction={orderBy === "description" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "description");
                  }}
                >
                  Course description
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "missing_file"}
                  direction={orderBy === "missing_file" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "missing_file");
                  }}
                >
                  Missing Files
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Doctor_name"}
                  direction={orderBy === "Doctor_name" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "Doctor_name");
                  }}
                >
                  doctor
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ width: 120 }}>
                <FormControl variant="outlined" size="small">
                  <Select native value={year} onChange={filterByYear}>
                    <option value={2020}>2020</option>
                    <option value={2019}>2019</option>
                    <option value={2019}>2018</option>
                  </Select>
                </FormControl>
                <TableSortLabel
                  active={orderBy === "year"}
                  direction={orderBy === "year" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "year");
                  }}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "semester"}
                  direction={orderBy === "semester" ? order : "asc"}
                  onClick={(ev) => {
                    handleRequestSort(ev, "semester");
                  }}
                >
                  semester
                </TableSortLabel>
              </TableCell>
              <TableCell>forms info</TableCell>
              <TableCell>report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.course_code}</TableCell>
                  <TableCell>{row.course_name}</TableCell>
                  <TableCell>
                    <details>
                      <summary className="summary">{row.description}</summary>
                      <p>{row.description}</p>
                    </details>
                  </TableCell>
                  <TableCell
                    style={{
                      color: `${
                        row.missing_file === "No" ? " #26a69a" : "#d84315"
                      }`,
                    }}
                  >
                    {row.missing_file === "yes" ? "missing" : "full"}
                  </TableCell>
                  <TableCell>{row.Doctor_name}</TableCell>
                  <TableCell>{row.year}</TableCell>

                  <TableCell>{row.semester}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "#fff",
                      }}
                      onClick={() => {
                        goToForms(row.Activated_course_id);
                      }}
                    >
                      Show
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "#fff",
                      }}
                      onClick={() => {
                        goToStat(row.Doctor_id, row.Activated_course_id);
                      }}
                    >
                      Result
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
