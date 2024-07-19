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
import CircularProgress from "@mui/material/CircularProgress";

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

const satisfaction_columns = [
  "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Em muitos campos a minha vida está próxima do meu ideal.]",
  "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [As minhas condições de vida são excelentes]",
  "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Estou satisfeito com a minha vida]",
  "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Até o presente momento tenho alcançado as coisas importantes que quero para a minha vida]",
  "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Se pudesse viver a minha vida de novo não mudaria quase nada]"
];

const shortenedSatisfactionColumns = satisfaction_columns.map((column) => {
  const matches = column.match(/\[(.*?)\]/);
  return matches ? matches[1] : '';
});

const TabelaSatisfacao = ({ sector }) => {
  const [satisfactionData, setSatisfactionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/satisfacao/${sector}`
        );
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        setSatisfactionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro na requisição de satisfação para o setor ${sector}:`, error);
        setLoading(false);
      }
    };

    if (sector) {
      fetchData();
    }
  }, [sector]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!satisfactionData || Object.keys(satisfactionData).length === 0) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const chartData = [];

  Object.entries(satisfactionData).forEach(([question, counts]) => {
    const seriesData = { name: question };
    for (let i = 1; i <= 7; i++) {
      seriesData[`data${i}`] = counts[i] || 0;
    }
    chartData.push(seriesData);
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
                <StyledTableCell align="right">1</StyledTableCell>
                <StyledTableCell align="right">2</StyledTableCell>
                <StyledTableCell align="right">3</StyledTableCell>
                <StyledTableCell align="right">4</StyledTableCell>
                <StyledTableCell align="right">5</StyledTableCell>
                <StyledTableCell align="right">6</StyledTableCell>
                <StyledTableCell align="right">7</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {shortenedSatisfactionColumns[index]} {/* Exibe a versão resumida da pergunta */}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.data1}</StyledTableCell>
                  <StyledTableCell align="right">{row.data2}</StyledTableCell>
                  <StyledTableCell align="right">{row.data3}</StyledTableCell>
                  <StyledTableCell align="right">{row.data4}</StyledTableCell>
                  <StyledTableCell align="right">{row.data5}</StyledTableCell>
                  <StyledTableCell align="right">{row.data6}</StyledTableCell>
                  <StyledTableCell align="right">{row.data7}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default TabelaSatisfacao;
