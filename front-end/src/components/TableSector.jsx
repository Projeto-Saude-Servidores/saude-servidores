// import * as React from "react";

// import { useEffect, useState } from "react";

// export default function TableSector({ sector }) {
//   const [painData, setPainData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:5000/api/setores/${sector}`
//         );
//         if (!response.ok) {
//           throw new Error("Erro ao buscar os dados");
//         }
//         const data = await response.json();
//         console.log("Dados recebidos:", data); // Verifique os dados recebidos no console
//         setPainData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Erro ao buscar os dados:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [sector]);

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   const bodyPartNames = painData["nível 0"].map((item) => Object.keys(item)[0]);

//   //Quantidade de pessoas entrevistadas
//   let soma = 0;

//   for (let index = 0; index < 6; index++) {
//     const qtdEntrevistado =
//       painData[`nível ${index}`][0][
//         Object.keys(painData[`nível ${index}`][0])[0]
//       ];
//     soma += qtdEntrevistado;
//   }
//   console.log("quatnas pessoas fizeram a entrevista", soma);

//   //pegar onde tem a maior frequencia de respostas e apresentar a porcentagem

//   let porcentagem = [];
//   let maior = [];

//   for (let index = 0; index < 6; index++) {
//     const values = painData[`nível ${index}`].map(
//       (item) => Object.values(item)[0]
//     );

//     let nivelPorcentagem = values.map((valor) =>
//       ((valor / soma) * 100).toFixed(2)
//     );
//     porcentagem.push(nivelPorcentagem);
//     let sum = 0;
//     for (let i = 0; i < values.length; i++) {
//       sum += values[i];
//     }
//     maior.push(sum);
//   }

//   let pos = 0;
//   let maxValue = maior[0];

//   for (let i = 1; i < maior.length; i++) {
//     if (maior[i] > maxValue) {
//       maxValue = maior[i];
//       pos = i;
//     }
//   }
//   console.log(`O maior valor é no nível ${pos}`);
//   console.log(porcentagem[pos]);

//   return (
//     <div>
//       <ul>
//         {`O total de pessoas entrevistadas foram: ${soma}, tendo como amaior frequecia de dor no nível ${pos},  tendo como porcentagens para cada dor: ${porcentagem[pos]}`}
//       </ul>
//     </div>
//   );
// }

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

export default function TableSector({ sector }) {
  const [painData, setPainData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/setores/${sector}`
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
  }, [sector]);

  if (loading) {
    return <p>Carregando...</p>;
  }

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
  let maior = [];

  for (let index = 0; index < 6; index++) {
    const values = painData[`nível ${index}`]
      ? painData[`nível ${index}`].map((item) => Object.values(item)[0])
      : [];

    let nivelPorcentagem = values.map((valor) =>
      ((valor / soma) * 100).toFixed(2)
    );
    porcentagem.push(nivelPorcentagem);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
      sum += values[i];
    }
    maior.push(sum);
  }

  let pos = 0;
  let maxValue = maior[0];

  for (let i = 1; i < maior.length; i++) {
    if (maior[i] > maxValue) {
      maxValue = maior[i];
      pos = i;
    }
  }

  return (
    <div>
      <section className=" px-2">
        <h2>
          Porcentagem com base na quantidade de entrevistados:
          <span className=" font-extrabold"> {soma} </span>
        </h2>
        <select></select>
      </section>
      <section>
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
                    {porcentagem[pos][index]}%
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
