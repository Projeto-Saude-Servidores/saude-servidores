import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const postureColumns = [
  "21. Quando sentado na sua cadeira, sua mesa de trabalho fica na altura do seu cotovelo?",
  "22. Ao trabalhar sentado na cadeira, você apoia seus pés no chão ou em algum suporte?",
  "23. Sua cadeira possui altura ajustável do assento?",
  "24. Com relação a cadeira, ela possui encosto com a forma levemente adaptada ao corpo para proteção da região lombar?",
  "25. A mesa de trabalho ou cadeira proporciona espaço ou suporte para apoiar os antebraços?",
  "26. Ao utilizar o computador durante o trabalho, você utiliza:",
  "27. Ao utilizar o computador durante o trabalho, você utiliza:",
  "28. A borda superior da tela do seu computador está na altura dos seus olhos?"
];

const shortenedColumns = [
  "Sua mesa de trabalho fica na altura do seu cotovelo?",
  "Ao trabalhar sentado na cadeira, você apoia seus pés no chão ou em algum suporte?",
  "Sua cadeira possui altura ajustável do assento?",
  "A cadeira, ela possui encosto com a forma levemente adaptada ao corpo para proteção da região lombar?",
  "A mesa de trabalho ou cadeira proporciona espaço ou suporte para apoiar os antebraços?",
  "Ao utilizar o computador durante o trabalho, você utiliza:",
  "Ao utilizar o computador durante o trabalho, você utiliza:",
  "A borda superior da tela do seu computador está na altura dos seus olhos?"
];

export default function TablePosture({ sector }) {
  const [postureData, setPostureData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/postura/${sector}`);
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        setPostureData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro na requisição de postura para o setor ${sector}:`, error);
        setLoading(false);
      }
    };

    if (sector) {
      fetchData();
    }
  }, [sector]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  const chartData = postureColumns.map((column, index) => {
    const questionData = postureData[column] || {};
    return {
      name: shortenedColumns[index],
      Sim: questionData['Sim'] || 0,
      Nao: questionData['Não'] || 0,
      "Teclado integrado": questionData['Teclado integrado'] || 0,
      "Touchpad": questionData['Touchpad'] || 0,
      "Mouse": questionData['Mouse'] || 0,
      "Teclado externo": questionData['Teclado externo'] || 0,
    };
  });

  return (
    <div className="w-full">
      <section className="px-2"></section>
      <section className="w-full">
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pergunta</StyledTableCell>
                <StyledTableCell align="right">Sim</StyledTableCell>
                <StyledTableCell align="right">Não</StyledTableCell>
                <StyledTableCell align="right">Teclado integrado</StyledTableCell>
                <StyledTableCell align="right">Touchpad</StyledTableCell>
                <StyledTableCell align="right">Mouse</StyledTableCell>
                <StyledTableCell align="right">Teclado externo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Sim}</StyledTableCell>
                  <StyledTableCell align="right">{row.Nao}</StyledTableCell>
                  <StyledTableCell align="right">{row["Teclado integrado"]}</StyledTableCell>
                  <StyledTableCell align="right">{row.Touchpad}</StyledTableCell>
                  <StyledTableCell align="right">{row.Mouse}</StyledTableCell>
                  <StyledTableCell align="right">{row["Teclado externo"]}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}
