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
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const workplaceColumns = [
  "12. Como é o seu relacionamento com colegas do setor?",
  "13. Como é o seu relacionamento com a sua chefia?",
  "14. Você classifica o seu trabalho como monótono?",
  "15. Você se sente estressado durante o seu trabalho?",
  "16. O seu trabalho exige esforço mental?",
  "17. Você possui conhecimento em relação a ergonomia?",
  "18. Como você classifica o ruído no seu ambiente de trabalho?",
  "19. Como você classifica a temperatura no seu ambiente de trabalho?",
];

const abreviatedColumns = [
  "Relacionamento com colegas",
  "Relacionamento com chefe",
  "Trabalho considerado monótono",
  "Sente estressado no trabalho",
  "Trabalho exige esforço mental",
  "Conhecimento sobre ergonomia",
  "Ruído no ambiente de trabalho",
  "Temperatura do ambiente de trabalho",
  "Iluminação atrapalha seu trabalho",
];

const WorkplaceTable = ({ sector }) => {
  const [workplaceData, setWorkplaceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/ambiente/${sector}`);
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        setWorkplaceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro na requisição de ambiente para o setor ${sector}:`, error);
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

  if (!workplaceData || Object.keys(workplaceData).length === 0) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const yesNoQuestions = workplaceColumns.filter((column, index) => {
    return [
      "14. Você classifica o seu trabalho como monótono?",
      "15. Você se sente estressado durante o seu trabalho?",
      "16. O seu trabalho exige esforço mental?",
      "17. Você possui conhecimento em relação a ergonomia?",
      "20. A iluminação incomoda na realização do seu trabalho?",
    ].includes(column);
  }).map((column, index) => {
    const questionData = workplaceData[column] || {};
    return {
      name: abreviatedColumns[index],
      Sim: questionData["Sim"] || 0,
      Não: questionData["Não"] || 0,
    };
  });

  const variedQuestions = workplaceColumns.filter((column) => {
    return [
      "12. Como é o seu relacionamento com colegas do setor?",
      "13. Como é o seu relacionamento com a sua chefia?",
      "18. Como você classifica o ruído no seu ambiente de trabalho?",
      "19. Como você classifica a temperatura no seu ambiente de trabalho?",
    ].includes(column);
  }).map((column, index) => {
    const questionData = workplaceData[column] || {};
    return {
      name: abreviatedColumns[index + 5],
      Bom: questionData["Bom"] || 0,
      Ótimo: questionData["Ótimo"] || 0,
      Razoável: questionData["Razoável"] || 0,
      Alto: questionData["Alto"] || 0,
      Baixo: questionData["Baixo"] || 0,
      Médio: questionData["Médio"] || 0,
    };
  });

  return (
    <div className="w-full">
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Pergunta</StyledTableCell>
              <StyledTableCell align="right">Sim</StyledTableCell>
              <StyledTableCell align="right">Não</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yesNoQuestions.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Sim}</StyledTableCell>
                <StyledTableCell align="right">{row.Não}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Pergunta</StyledTableCell>
              <StyledTableCell align="right">Bom</StyledTableCell>
              <StyledTableCell align="right">Ótimo</StyledTableCell>
              <StyledTableCell align="right">Razoável</StyledTableCell>
              <StyledTableCell align="right">Alto</StyledTableCell>
              <StyledTableCell align="right">Baixo</StyledTableCell>
              <StyledTableCell align="right">Médio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variedQuestions.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Bom}</StyledTableCell>
                <StyledTableCell align="right">{row.Ótimo}</StyledTableCell>
                <StyledTableCell align="right">{row.Razoável}</StyledTableCell>
                <StyledTableCell align="right">{row.Alto}</StyledTableCell>
                <StyledTableCell align="right">{row.Baixo}</StyledTableCell>
                <StyledTableCell align="right">{row.Médio}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkplaceTable;
