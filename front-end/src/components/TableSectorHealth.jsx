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

const shortenedHealthColumns = [
  "Atividade física regular",
  "Problemas de saúde",
  "Deficiências"
];

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

const healthColumns = [
  "9. Você pratica alguma atividade física regularmente (mínimo 3 vezes por semana)?",
  "10. Você possuí algum problema de saúde? Liste abaixo:",
  "11. Tem alguma deficiência, se sim qual(ais)"
];

const HealthTable = ({ sector }) => {
  const [healthData, setHealthData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/saude/${sector}`);
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        setHealthData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro na requisição de saúde para o setor ${sector}:`, error);
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

  if (!healthData || Object.keys(healthData).length === 0) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const chartData = healthColumns.map((column, index) => {
    const questionData = healthData[column] || {};
    return {
      name: shortenedHealthColumns[index], // Usar versão resumida das perguntas
      Visual: questionData['Visual'] || 0,
      Nenhuma: questionData['Nenhuma'] || 0,
      Auditiva: questionData['Auditiva'] || 0,
      Sim: questionData['Sim'] || 0,
      Não: questionData['Não'] || 0,
      diabetes: questionData['diabetes'] || 0,
      asma: questionData['asma'] || 0,
      nenhum: questionData['nenhum'] || 0,
      hipertensão: questionData['hipertensão'] || 0,
      Médio: questionData['Médio'] || 0,
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
                <StyledTableCell align="right">Visual</StyledTableCell>
                <StyledTableCell align="right">Nenhuma</StyledTableCell>
                <StyledTableCell align="right">Auditiva</StyledTableCell>
                <StyledTableCell align="right">Sim</StyledTableCell>
                <StyledTableCell align="right">Não</StyledTableCell>
                <StyledTableCell align="right">Diabetes</StyledTableCell>
                <StyledTableCell align="right">Asma</StyledTableCell>
                <StyledTableCell align="right">Nenhum</StyledTableCell>
                <StyledTableCell align="right">Hipertensão</StyledTableCell>
                <StyledTableCell align="right">Médio</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Visual}</StyledTableCell>
                  <StyledTableCell align="right">{row.Nenhuma}</StyledTableCell>
                  <StyledTableCell align="right">{row.Auditiva}</StyledTableCell>
                  <StyledTableCell align="right">{row.Sim}</StyledTableCell>
                  <StyledTableCell align="right">{row.Não}</StyledTableCell>
                  <StyledTableCell align="right">{row.diabetes}</StyledTableCell>
                  <StyledTableCell align="right">{row.asma}</StyledTableCell>
                  <StyledTableCell align="right">{row.nenhum}</StyledTableCell>
                  <StyledTableCell align="right">{row.hipertensão}</StyledTableCell>
                  <StyledTableCell align="right">{row.Médio}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default HealthTable;
