import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "2px 16px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "default",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableOld({ old }) {
  const [painData, setPainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("nivel-0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/idades/${old}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        console.log("Dados recebidos:", data); // Verifique os dados recebidos no console
        setPainData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [old]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };
  const bodyPartNames = painData["nível 0"]
    ? painData["nível 0"].map((item) => Object.keys(item)[0])
    : [];

  //Quantidade de pessoas entrevistadas
  let soma = 0;

  for (let index = 0; index < 6; index++) {
    const qtdEntrevistado =
      painData[`nível ${index}`] &&
      painData[`nível ${index}`][0] &&
      painData[`nível ${index}`][0][
        Object.keys(painData[`nível ${index}`][0])[0]
      ];

    soma += qtdEntrevistado;
  }
  console.log("quatnas pessoas fizeram a entrevista", soma);

  //pegar onde tem a maior frequencia de respostas e apresentar a porcentagem

  let porcentagem = [];

  for (let index = 0; index < 6; index++) {
    const values = painData[`nível ${index}`]
      ? painData[`nível ${index}`].map((item) => Object.values(item)[0])
      : [];

    let nivelPorcentagem = values.map((valor) =>
      ((valor / soma) * 100).toFixed(2)
    );
    porcentagem.push(nivelPorcentagem);
  }

  return (
    <div className=" w-full">
      <section className=" px-2">
        <h2>
          Porcentagem com base na quantidade de entrevistados:
          <span className=" font-extrabold"> {soma} </span>
        </h2>
        <FormControl
          variant="outlined"
          className="ml-2 mt-2 mb-2"
          sx={{ minWidth: 120 }}
          size="small"
        >
          <InputLabel>Nível de dor</InputLabel>
          <Select
            value={chartType}
            onChange={handleChartTypeChange}
            label="Nível de dor"
            MenuProps={{
              PaperProps: {
                style: {
                  textAlign: "center",
                },
              },
            }}
          >
            <MenuItem value="nivel-0">nivel 0</MenuItem>
            <MenuItem value="nivel-1">nivel 1</MenuItem>
            <MenuItem value="nivel-2">nivel 2</MenuItem>
            <MenuItem value="nivel-3">nivel 3</MenuItem>
            <MenuItem value="nivel-4">nivel 4</MenuItem>
            <MenuItem value="nivel-5">nivel 5</MenuItem>
          </Select>
        </FormControl>
      </section>
      <section className=" w-full">
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dor</StyledTableCell>
                <StyledTableCell align="right">Porcentagem</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bodyPartNames.map((valor, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {valor}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {chartType === "nivel-0" && porcentagem[0][index]}
                    {chartType === "nivel-1" && porcentagem[1][index]}
                    {chartType === "nivel-2" && porcentagem[2][index]}
                    {chartType === "nivel-3" && porcentagem[3][index]}
                    {chartType === "nivel-4" && porcentagem[4][index]}
                    {chartType === "nivel-5" && porcentagem[5][index]}%
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}
