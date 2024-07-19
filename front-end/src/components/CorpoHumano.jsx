import React from "react";
import { useState, useEffect } from "react";

const CorpoHumano = ({ sector }) => {
  const cores = {
    cor1: "#c0c0c0", //cinza 0-20
    cor2: "#ffa500", //amarelo 20-40
    cor3: "#800080", //purple 40-60
    cor4: "#000080", //azul 60-80
    cor5: "#ff0000", //vermelho 80-100
  };

  const [painData, setPainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);

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

  //Quantidade de pessoas entrevistadas
  let soma = 0;

  for (let index = 0; index < 6; index++) {
    const qtdEntrevistado =
      painData[`nível ${index}`] &&
      painData[`nível ${index}`][0] &&
      painData[`nível ${index}`][0][
        Object.keys(painData[`nível ${index}`][0])[0]
      ];

    soma += qtdEntrevistado || 0; // Certifique-se de tratar valores undefined/null
  }

  console.log("Quantidade total de pessoas entrevistadas:", soma);

  // Array para armazenar as somas das posições de cada nível
  let somaNiveis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Itera sobre os níveis de 0 a 5
  for (let i = 0; i < 6; i++) {
    const values =
      painData[`nível ${i}`]?.map((item) => Object.values(item)[0]) || [];

    // Multiplicador baseado no índice + 1
    const multiplicador = i + 1;
    console.log(values);
    // Calcula a soma ponderada de cada posição
    for (let j = 0; j < values.length; j++) {
      const valor = values[j];
      if (somaNiveis[j] === undefined) {
        somaNiveis[j] = valor * multiplicador;
      } else {
        somaNiveis[j] += valor * multiplicador;
      }
    }
  }

  // Calcula a porcentagem para cada posição
  const porcentagem = somaNiveis.map((element) => (element / (soma * 6)) * 100);

  // console.log("Somas dos níveis:", somaNiveis);
  // console.log("Porcentagem:", porcentagem);
  for (let index = 0; index < porcentagem.length; index++) {
    const element = porcentagem[index];
    if (element <= 20) {
      porcentagem[index] = cores.cor1;
    }
    if (element > 20 && element <= 40) {
      porcentagem[index] = cores.cor2;
    }
    if (element > 40 && element <= 60) {
      porcentagem[index] = cores.cor3;
    }
    if (element > 60 && element <= 80) {
      porcentagem[index] = cores.cor4;
    }
    if (element > 80) {
      porcentagem[index] = cores.cor5;
    }
  }

  return (
    <div className=" w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1100 1100"
        className="w-full h-full"
      >
        <path
          style={{
            fill: "#ffdeb6",
            filter: isHovered
              ? "drop-shadow(4px 4px 6px rgba(255, 0, 0, 0.7))"
              : "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
            transition: "filter 0.3s ease",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          d="m 384.21996,1077.9177 c -2.21735,0 -4.14372,-1.1101 -5.571,-3.2125 l -0.53559,-0.7875 c -4.39032,-6.4478 -11.01969,-16.1881 -14.12871,-25.6297 -1.22507,-3.7131 -1.74193,-5.8739 -2.08222,-7.3025 -0.55138,-2.3072 -0.68356,-2.8563 -2.76676,-5.6721 -2.50241,-3.3866 -0.4991,-11.6399 1.26945,-18.9227 0.87491,-3.5914 1.69754,-6.9819 1.79322,-9.1091 0.0483,-1.0665 0.15387,-2.3032 0.27716,-3.7329 l 0.15782,-1.8976 c 0.13119,-1.6018 -0.79205,-3.64978 -1.8593,-6.0213 -1.45489,-3.24415 -3.27079,-7.27979 -3.35167,-12.20586 -0.0503,-3.06012 0.77035,-6.33988 1.72417,-10.13609 1.36414,-5.45044 2.91471,-11.62807 2.17888,-18.79408 -0.69933,-6.85237 -1.57818,-14.75744 -2.50833,-23.1285 -3.71663,-33.45059 -8.3417,-75.0813 -6.23186,-91.06853 2.52904,-19.17498 2.6622,-41.43679 0.30479,-51.78264 -2.43929,-10.703 -7.018,-66.79533 -7.59798,-99.26645 -0.63424,-35.5075 -7.00715,-82.55699 -11.51287,-85.61711 -4.50572,3.06012 -10.88061,50.10961 -11.51386,85.61711 -0.57702,32.46419 -5.15672,88.55949 -7.59502,99.26645 -2.35741,10.34288 -2.22721,32.6037 0.30282,51.78264 2.11082,15.98822 -2.51425,57.62486 -6.23187,91.07942 -0.93113,8.36611 -1.80801,16.2692 -2.50734,23.11761 -0.65298,6.37946 1.67978,11.8111 3.7403,16.60361 1.52591,3.55085 2.96699,6.90382 2.89301,10.06288 -0.20911,9.16652 -3.22443,15.53707 -5.42403,20.18904 -1.19843,2.5318 -2.14534,4.5333 -2.08221,5.9323 0.0986,2.1252 0.92126,5.5167 1.79321,9.1072 1.76855,7.2827 3.77384,15.538 1.26945,18.9246 -2.08123,2.8168 -2.21439,3.3649 -2.76478,5.6721 -0.34128,1.4286 -0.85715,3.5884 -2.08222,7.3025 -3.11001,9.4455 -9.74432,19.1898 -14.13365,25.6376 l -0.53165,0.7796 c -1.42727,2.1014 -3.35463,3.2125 -5.57001,3.2125 -4.00958,10e-4 -7.90079,-3.6221 -8.56462,-6.0629 -0.10258,-0.3858 -0.2387,-0.4907 -0.62831,-0.4907 -0.57308,0 -1.45785,0.2919 -2.39589,0.6005 -1.38288,0.4542 -3.10606,1.0221 -4.87955,1.0221 -1.10375,0 -2.13647,-0.2236 -3.06957,-0.6629 -1.27833,-0.6035 -2.16606,-0.9914 -2.80622,-1.2714 -1.77052,-0.7736 -1.87409,-0.8508 -2.73618,-2.0766 l -0.27914,-0.3948 c -0.63818,-0.8974 -1.6709,-1.0893 -2.86539,-1.3119 -1.08501,-0.2028 -2.20354,-0.4116 -3.12876,-1.1863 -1.21027,-1.0101 -1.87902,-2.4407 -2.72829,-4.2533 -0.49318,-1.0477 -1.04949,-2.2369 -1.80801,-3.538 -2.17493,-3.7418 -2.72335,-5.6404 -2.4304,-11.8605 0.17458,-3.7161 6.94895,-11.2719 14.12082,-19.272 5.19026,-5.7898 10.55708,-11.7754 12.18557,-15.169 3.31814,-6.9147 2.97784,-11.6261 2.23215,-21.94816 -0.0848,-1.1635 -0.17262,-2.39527 -0.26435,-3.70618 -0.87293,-12.84598 -10.10335,-63.90341 -15.71775,-84.64555 -5.43093,-20.07432 -9.36851,-69.44783 -5.84126,-88.91567 0.53954,-2.97899 1.08007,-5.7977 1.60285,-8.53331 2.81509,-14.68522 5.24253,-27.36597 4.50769,-49.78609 -0.85025,-25.85223 -1.94807,-40.87087 -17.46658,-99.24271 -12.41934,-46.70716 -8.13357,-92.4022 -5.57099,-119.70288 0.54447,-5.81848 1.01694,-10.8425 1.17476,-14.53483 0.84827,-19.63801 6.77929,-41.92257 12.51403,-63.47204 l 0.62831,-2.35767 c 5.70416,-21.45647 8.17304,-53.45269 7.26262,-71.9915 -0.8611,-17.59694 -6.89865,-30.45776 -9.71176,-30.45776 -2.89302,1.55034 -7.30109,39.51445 -9.41882,57.75942 l -0.40145,3.44499 c -2.53594,21.76218 -12.11652,69.60514 -20.15541,91.10415 -2.89104,7.72995 -5.28495,13.60977 -7.21132,18.33203 -3.34378,8.20584 -5.36189,13.15862 -6.45577,19.08 -0.72399,3.91989 -1.28333,15.2071 -2.02797,22.80102 -1.0811,11.02521 -1.98062,28.69767 -3.54204,33.04496 -0.78712,2.19244 -1.43023,4.6352 -2.05164,6.99485 -1.46673,5.56223 -2.98278,11.31344 -6.57216,14.9098 -3.4582,3.46873 -4.48797,3.81303 -6.15296,4.16129 -0.58787,0.12268 -1.25465,0.26317 -2.24201,0.67574 -1.44108,0.60253 -2.32092,2.19838 -3.16722,3.74081 -1.03963,1.88574 -2.11378,3.83776 -4.28182,4.20086 -1.79814,0.29978 -3.76298,2.03909 -6.03557,4.05147 -1.78828,1.58398 -3.81428,3.3787 -6.22792,4.90926 -1.69556,1.07346 -3.02124,1.02894 -3.81526,0.007 -1.43517,-1.84122 -0.58492,-6.8593 0.38369,-10.74555 0.31564,-1.26639 0.10949,-3.5459 -0.61253,-4.4759 -0.26238,-0.33342 -0.49516,-0.373 -0.64903,-0.373 -0.27125,0 -0.88083,0.15039 -1.88495,1.15856 -1.20139,1.20505 -2.32092,1.79075 -3.41973,1.79075 -2.11674,0 -3.36548,-2.20926 -4.19107,-3.67155 -0.18346,-0.32649 -0.35213,-0.62627 -0.50798,-0.86174 -0.78811,-1.18625 0.55138,-5.75022 5.25635,-19.7963 1.8879,-5.6315 3.83894,-11.45592 4.847,-15.26301 1.80998,-6.84051 1.24677,-9.76706 0.4557,-11.01763 -0.38862,-0.61538 -0.92324,-0.9765 -1.63145,-1.10611 -0.88082,0.0307 -3.7472,4.02574 -5.64399,6.67033 -2.54087,3.53997 -5.16658,7.20162 -7.24288,8.51353 -1.01399,0.64111 -2.13055,0.98145 -3.22937,0.98145 -1.84746,0 -3.52527,-0.95672 -4.27294,-2.43582 -0.63719,-1.26145 -0.49022,-2.68614 0.40145,-3.90802 2.06546,-2.82762 10.20914,-18.69815 16.83432,-26.96923 4.3659,-5.45053 9.67303,-10.09944 14.92175,-14.706 1.60536,-1.40895 4.02259,-2.0702 5.05217,-3.94165 8.76153,-15.92559 4.74837,-14.71885 5.3175,-54.26991 0.5642,-39.39374 12.28026,-85.83279 18.39771,-104.88508 5.209,-16.22567 4.6951,-38.57949 4.38735,-51.93698 l -0.0503,-2.2053 c -0.0819,-3.75763 -0.0947,-6.8316 -0.10949,-10.39136 -0.0395,-9.10517 -0.0858,-20.43444 -1.34737,-50.99311 -1.66992,-40.50481 23.22399,-55.54521 36.59814,-63.6254 0.77922,-0.47193 1.52492,-0.9211 2.22721,-1.35147 12.10173,-7.44897 62.22591,-29.65538 67.54637,-32.00711 -0.0937,-2.78904 -0.50502,-16.00801 0.0276,-19.23731 0.48135,-2.91469 -3.56177,-11.73888 -6.2368,-17.57913 l -0.99031,-2.17265 c -2.36333,-5.212 -1.96681,-10.0055 -1.66597,-11.90608 l -3.54697,-0.23745 c -0.69835,-0.0465 -1.38684,-0.4838 -2.10688,-1.33862 -4.32029,-5.12197 -9.93567,-26.686273 -9.64864,-29.58117 0.15092,-1.493948 1.25269,-2.349753 3.02815,-2.349753 1.08007,0 2.18578,0.302747 2.70165,0.465993 -0.0878,-1.326745 -0.23672,-3.204569 -0.48332,-5.868943 -1.43615,-15.56081 5.18237,-36.248536 10.30753,-44.601786 4.75034,-7.745778 32.17922,-16.326583 33.34412,-16.688693 l 0.21601,-0.03166 8.38214,0.03166 c 1.16392,0.36211 28.58885,8.942915 33.34215,16.688693 5.12614,8.35325 11.74565,29.042955 10.30851,44.601786 -0.24462,2.663384 -0.39454,4.542198 -0.48332,5.868943 0.51587,-0.163246 1.62258,-0.465993 2.70265,-0.465993 1.77447,0 2.87821,0.855805 3.02814,2.349753 0.28703,2.895886 -5.33032,24.46118 -9.64962,29.58117 -0.72005,0.85383 -1.40853,1.29212 -2.10589,1.33862 l -3.54698,0.23745 c 0.29887,1.90058 0.69342,6.69507 -1.66597,11.90608 l -0.99228,2.16969 c -2.67404,5.84025 -6.71617,14.66642 -6.23581,17.58209 0.53362,3.23029 0.12132,16.44827 0.0247,19.23731 5.3244,2.35173 55.44858,24.55715 67.54834,32.00711 0.70328,0.43136 1.447,0.88053 2.22919,1.35147 13.37217,8.08019 38.26608,23.1196 36.59616,63.6254 -1.25959,30.5557 -1.30792,41.88596 -1.34639,50.99113 -0.0158,3.55976 -0.0266,6.63571 -0.10948,10.39334 l -0.0503,2.19739 c -0.30676,13.35748 -0.82263,35.71724 4.38835,51.94588 6.11645,19.05229 17.8335,65.49035 18.39573,104.88508 0.56815,39.55106 1.66301,50.71016 5.3175,54.2709 1.08106,1.0517 2.92063,2.39032 5.05118,3.94066 5.13601,3.73586 12.17176,8.85387 14.92274,14.70501 3.80146,8.09107 14.77084,24.14063 16.83333,26.97022 0.89365,1.22188 1.03864,2.64657 0.40244,3.90703 -0.74767,1.48009 -2.42548,2.43582 -4.27097,2.43681 -1.0998,0 -2.21735,-0.33935 -3.23232,-0.98145 -2.07334,-1.31191 -4.69905,-4.97257 -7.23796,-8.51254 -1.89777,-2.64558 -4.76612,-6.64263 -5.66371,-6.67033 -0.69145,0.12763 -1.22507,0.48875 -1.61469,1.10413 -0.79402,1.25057 -1.35428,4.17712 0.45866,11.01763 1.0061,3.80709 2.95713,9.62954 4.84504,15.26202 4.70496,14.04707 6.04346,18.61104 5.25536,19.79729 -0.15585,0.23646 -0.32353,0.53525 -0.50897,0.86174 -0.82657,1.46229 -2.07334,3.67155 -4.19008,3.67155 -1.0998,0.002 -2.21933,-0.58471 -3.42171,-1.79174 -1.00215,-1.00718 -1.61073,-1.15757 -1.88396,-1.15757 -0.1519,0 -0.38961,0.0396 -0.64705,0.373 -0.72597,0.93099 -0.92818,3.21149 -0.61451,4.4759 0.96664,3.88724 1.81689,8.90433 0.38567,10.74555 -0.796,1.02103 -2.11872,1.06654 -3.81625,-0.007 -2.41364,-1.53056 -4.44062,-3.32528 -6.22792,-4.90926 -2.27555,-2.01238 -4.23644,-3.75169 -6.03558,-4.05147 -2.16902,-0.3631 -3.24218,-2.31413 -4.27885,-4.20086 -0.84927,-1.54342 -1.72812,-3.13828 -3.1692,-3.7418 -0.99031,-0.41158 -1.65512,-0.55207 -2.24201,-0.67475 -1.66597,-0.34925 -2.69673,-0.69256 -6.15493,-4.16129 -3.58741,-3.59735 -5.10346,-9.34757 -6.57117,-14.9098 -0.6224,-2.36064 -1.26551,-4.80241 -2.05164,-6.99485 -1.56241,-4.34729 -2.5685,-18.93555 -3.54303,-33.04199 -0.66876,-9.71066 -1.302,-18.8841 -2.02698,-22.80399 -1.09388,-5.92039 -3.111,-10.87218 -6.45577,-19.07703 -1.9244,-4.72325 -4.32127,-10.60209 -7.21133,-18.335 -8.03888,-21.49901 -17.61946,-69.34197 -20.15541,-91.10415 l -0.40046,-3.44499 c -2.11674,-18.24398 -6.52679,-56.20908 -9.46912,-57.77525 -2.76281,0.0158 -8.80036,12.87665 -9.66343,30.47359 -0.90943,18.5398 1.56043,50.538 7.26262,71.9915 l 0.62634,2.35272 c 5.73868,21.55244 11.66871,43.83799 12.516,63.47699 0.15782,3.69233 0.62832,8.71734 1.17476,14.53483 2.56061,27.30266 6.8444,72.99671 -5.57099,119.70288 -15.51949,58.37877 -16.6183,73.39443 -17.46559,99.24271 -0.73583,22.41715 1.69359,35.09889 4.50375,49.78213 0.52573,2.73759 1.06527,5.5563 1.60481,8.53727 3.5312,19.46982 -0.41032,68.84333 -5.84323,88.91567 -5.61341,20.74412 -14.84383,71.80056 -15.71676,84.64555 -0.0888,1.3119 -0.17755,2.54466 -0.26238,3.71013 -0.74569,10.32011 -1.08697,15.02851 2.23314,21.94421 1.6275,3.3936 6.99334,9.3792 12.18557,15.169 7.17088,8.0001 13.94623,15.5559 14.12082,19.272 0.29098,6.2182 -0.25646,8.1158 -2.43139,11.8605 -0.75753,1.3011 -1.31582,2.4893 -1.80505,3.538 -0.85124,1.8126 -1.52197,3.2432 -2.73027,4.2543 -0.92521,0.7737 -2.04375,0.9825 -3.12875,1.1853 -1.19449,0.2236 -2.22722,0.4165 -2.86638,1.3119 l -0.28112,0.3957 c -0.86109,1.2239 -0.96368,1.3021 -2.73519,2.0757 -0.63719,0.28 -1.52591,0.6679 -2.80523,1.2714 -0.93211,0.4393 -1.96681,0.6629 -3.07253,0.6629 -1.77052,0 -3.49469,-0.5679 -4.87758,-1.0221 -0.93606,-0.3096 -1.8228,-0.6005 -2.39687,-0.6005 -0.38764,0 -0.52376,0.1049 -0.62634,0.4907 -0.66185,2.4398 -4.5511,6.0629 -8.56265,6.0629 z"
          id="path1" //AQUI O CORPO INTEIRO
        />

        <path
          style={{
            fill: "#ffdeb6",
            transform: "translate(227px, -54px) ",
            filter: isHovered2
              ? "drop-shadow(4px 4px 6px rgba(255, 0, 0, 0.7))"
              : "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
            transition: "filter 0.3s ease",
          }}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          d="m 663.527,1142.146 c -2.248,0 -4.201,-1.122 -5.648,-3.247 l -0.543,-0.796 c -4.451,-6.517 -11.172,-16.362 -14.324,-25.905 -1.242,-3.753 -1.766,-5.937 -2.111,-7.381 -0.559,-2.332 -0.693,-2.887 -2.805,-5.733 -2.537,-3.423 -0.506,-11.765 1.287,-19.126 0.887,-3.63 1.721,-7.057 1.818,-9.207 0.049,-1.078 0.156,-2.328 0.281,-3.773 l 0.16,-1.918 c 0.133,-1.619 -0.803,-3.689 -1.885,-6.086 -1.475,-3.279 -3.316,-7.358 -3.398,-12.337 -0.051,-3.093 0.781,-6.408 1.748,-10.245 1.383,-5.509 2.955,-11.753 2.209,-18.996 -0.709,-6.926 -1.6,-14.916 -2.543,-23.377 -3.768,-33.81 -8.457,-75.888 -6.318,-92.047 2.564,-19.381 2.699,-41.882 0.309,-52.339 -2.473,-10.818 -7.115,-67.513 -7.703,-100.333 -0.643,-35.889 -7.104,-83.444 -11.672,-86.537 -4.568,3.093 -11.031,50.648 -11.673,86.537 -0.585,32.813 -5.228,89.511 -7.7,100.333 -2.39,10.454 -2.258,32.954 0.307,52.339 2.14,16.16 -2.549,58.244 -6.318,92.058 -0.944,8.456 -1.833,16.444 -2.542,23.366 -0.662,6.448 1.703,11.938 3.792,16.782 1.547,3.589 3.008,6.978 2.933,10.171 -0.212,9.265 -3.269,15.704 -5.499,20.406 -1.215,2.559 -2.175,4.582 -2.111,5.996 0.1,2.148 0.934,5.576 1.818,9.205 1.793,7.361 3.826,15.705 1.287,19.128 -2.11,2.847 -2.245,3.401 -2.803,5.733 -0.346,1.444 -0.869,3.627 -2.111,7.381 -3.153,9.547 -9.879,19.396 -14.329,25.913 l -0.539,0.788 c -1.447,2.124 -3.401,3.247 -5.647,3.247 -4.065,10e-4 -8.01,-3.661 -8.683,-6.128 -0.104,-0.39 -0.242,-0.496 -0.637,-0.496 -0.581,0 -1.478,0.295 -2.429,0.607 -1.402,0.459 -3.149,1.033 -4.947,1.033 -1.119,0 -2.166,-0.226 -3.112,-0.67 -1.296,-0.61 -2.196,-1.002 -2.845,-1.285 -1.795,-0.782 -1.9,-0.86 -2.774,-2.099 l -0.283,-0.399 c -0.647,-0.907 -1.694,-1.101 -2.905,-1.326 -1.1,-0.205 -2.234,-0.416 -3.172,-1.199 -1.227,-1.021 -1.905,-2.467 -2.766,-4.299 -0.5,-1.059 -1.064,-2.261 -1.833,-3.576 -2.205,-3.782 -2.761,-5.701 -2.464,-11.988 0.177,-3.756 7.045,-11.393 14.316,-19.479 5.262,-5.852 10.703,-11.902 12.354,-15.332 3.364,-6.989 3.019,-11.751 2.263,-22.184 -0.086,-1.176 -0.175,-2.421 -0.268,-3.746 -0.885,-12.984 -10.243,-64.59 -15.935,-85.555 -5.506,-20.29 -9.498,-70.194 -5.922,-89.871 0.547,-3.011 1.095,-5.86 1.625,-8.625 2.854,-14.843 5.315,-27.66 4.57,-50.321 -0.862,-26.13 -1.975,-41.31 -17.708,-100.309 -12.591,-47.209 -8.246,-93.395 -5.648,-120.989 0.552,-5.881 1.031,-10.959 1.191,-14.691 0.86,-19.849 6.873,-42.373 12.687,-64.154 l 0.637,-2.383 c 5.783,-21.687 8.286,-54.027 7.363,-72.765 -0.873,-17.786 -6.994,-30.785 -9.846,-30.785 -2.933,1.567 -7.402,39.939 -9.549,58.38 l -0.407,3.482 c -2.571,21.996 -12.284,70.353 -20.434,92.083 -2.931,7.813 -5.358,13.756 -7.311,18.529 -3.39,8.294 -5.436,13.3 -6.545,19.285 -0.734,3.962 -1.376,13.231 -2.056,23.046 -0.986,14.261 -2.008,29.006 -3.591,33.4 -0.798,2.216 -1.45,4.685 -2.08,7.07 -1.487,5.622 -3.024,11.435 -6.663,15.07 -3.506,3.506 -4.55,3.854 -6.238,4.206 -0.596,0.124 -1.272,0.266 -2.273,0.683 -1.461,0.609 -2.353,2.222 -3.211,3.781 -1.054,1.906 -2.143,3.879 -4.341,4.246 -1.823,0.303 -3.815,2.061 -6.119,4.095 -1.813,1.601 -3.867,3.415 -6.314,4.962 -1.719,1.085 -3.063,1.04 -3.868,0.007 -1.455,-1.861 -0.593,-6.933 0.389,-10.861 0.32,-1.28 0.111,-3.584 -0.621,-4.524 -0.266,-0.337 -0.502,-0.377 -0.658,-0.377 -0.275,0 -0.893,0.152 -1.911,1.171 -1.218,1.218 -2.353,1.81 -3.467,1.81 -2.146,0 -3.412,-2.233 -4.249,-3.711 -0.186,-0.33 -0.357,-0.633 -0.515,-0.871 -0.799,-1.199 0.559,-5.812 5.329,-20.009 1.914,-5.692 3.892,-11.579 4.914,-15.427 1.835,-6.914 1.264,-9.872 0.462,-11.136 -0.394,-0.622 -0.936,-0.987 -1.654,-1.118 -0.893,0.031 -3.799,4.069 -5.722,6.742 -2.576,3.578 -5.238,7.279 -7.343,8.605 -1.028,0.648 -2.16,0.992 -3.274,0.992 -1.873,0 -3.574,-0.967 -4.332,-2.462 -0.646,-1.275 -0.497,-2.715 0.407,-3.95 2.094,-2.858 13.212,-19.078 17.067,-27.259 2.789,-5.915 9.921,-11.087 15.128,-14.864 2.159,-1.566 4.026,-2.92 5.122,-3.984 3.707,-3.598 4.814,-14.877 5.391,-54.853 0.572,-39.817 12.45,-86.755 18.652,-106.012 5.281,-16.4 4.76,-38.994 4.448,-52.495 l -0.051,-2.229 c -0.083,-3.798 -0.096,-6.905 -0.111,-10.503 -0.04,-9.203 -0.087,-20.654 -1.366,-51.541 -1.693,-40.94 23.545,-56.142 37.104,-64.309 0.79,-0.477 1.546,-0.931 2.258,-1.366 12.269,-7.529 63.086,-29.974 68.48,-32.351 -0.095,-2.819 -0.512,-16.18 0.028,-19.444 0.488,-2.946 -3.611,-11.865 -6.323,-17.768 l -1.004,-2.196 c -2.396,-5.268 -1.994,-10.113 -1.689,-12.034 l -3.596,-0.24 c -0.708,-0.047 -1.406,-0.489 -2.136,-1.353 -4.38,-5.177 -10.073,-26.973 -9.782,-29.899 0.153,-1.51 1.27,-2.375 3.07,-2.375 1.095,0 2.216,0.306 2.739,0.471 -0.089,-1.341 -0.24,-3.239 -0.49,-5.932 -1.456,-15.728 5.254,-36.638 10.45,-45.081 4.816,-7.829 32.624,-16.502 33.805,-16.868 l 0.219,-0.032 8.498,0.032 c 1.18,0.366 28.984,9.039 33.803,16.868 5.197,8.443 11.908,29.355 10.451,45.081 -0.248,2.692 -0.4,4.591 -0.49,5.932 0.523,-0.165 1.645,-0.471 2.74,-0.471 1.799,0 2.918,0.865 3.07,2.375 0.291,2.927 -5.404,24.724 -9.783,29.899 -0.73,0.863 -1.428,1.306 -2.135,1.353 l -3.596,0.24 c 0.303,1.921 0.703,6.767 -1.689,12.034 l -1.006,2.193 c -2.711,5.903 -6.809,14.824 -6.322,17.771 0.541,3.265 0.123,16.625 0.025,19.444 5.398,2.377 56.215,24.821 68.482,32.351 0.713,0.436 1.467,0.89 2.26,1.366 13.557,8.167 38.795,23.368 37.102,64.309 -1.277,30.884 -1.326,42.336 -1.365,51.539 -0.016,3.598 -0.027,6.707 -0.111,10.505 l -0.051,2.221 c -0.311,13.501 -0.834,36.101 4.449,52.504 6.201,19.257 18.08,66.194 18.65,106.012 0.576,39.976 1.686,51.255 5.391,54.854 1.096,1.063 2.961,2.416 5.121,3.983 5.207,3.776 12.34,8.949 15.129,14.863 3.854,8.178 14.975,24.4 17.066,27.26 0.906,1.235 1.053,2.675 0.408,3.949 -0.758,1.496 -2.459,2.462 -4.33,2.463 -1.115,0 -2.248,-0.343 -3.277,-0.992 -2.102,-1.326 -4.764,-5.026 -7.338,-8.604 -1.924,-2.674 -4.832,-6.714 -5.742,-6.742 -0.701,0.129 -1.242,0.494 -1.637,1.116 -0.805,1.264 -1.373,4.222 0.465,11.136 1.02,3.848 2.998,9.733 4.912,15.426 4.77,14.198 6.127,18.811 5.328,20.01 -0.158,0.239 -0.328,0.541 -0.516,0.871 -0.838,1.478 -2.102,3.711 -4.248,3.711 -1.115,0.002 -2.25,-0.591 -3.469,-1.811 -1.016,-1.018 -1.633,-1.17 -1.91,-1.17 -0.154,0 -0.395,0.04 -0.656,0.377 -0.736,0.941 -0.941,3.246 -0.623,4.524 0.98,3.929 1.842,9 0.391,10.861 -0.807,1.032 -2.148,1.078 -3.869,-0.007 -2.447,-1.547 -4.502,-3.361 -6.314,-4.962 -2.307,-2.034 -4.295,-3.792 -6.119,-4.095 -2.199,-0.367 -3.287,-2.339 -4.338,-4.246 -0.861,-1.56 -1.752,-3.172 -3.213,-3.782 -1.004,-0.416 -1.678,-0.558 -2.273,-0.682 -1.689,-0.353 -2.734,-0.7 -6.24,-4.206 -3.637,-3.636 -5.174,-9.448 -6.662,-15.07 -0.631,-2.386 -1.283,-4.854 -2.08,-7.07 -1.584,-4.394 -2.604,-19.139 -3.592,-33.397 -0.678,-9.815 -1.32,-19.087 -2.055,-23.049 -1.109,-5.984 -3.154,-10.989 -6.545,-19.282 -1.951,-4.774 -4.381,-10.716 -7.311,-18.532 -8.15,-21.73 -17.863,-70.087 -20.434,-92.083 l -0.406,-3.482 c -2.146,-18.44 -6.617,-56.813 -9.6,-58.396 -2.801,0.016 -8.922,13.015 -9.797,30.801 -0.922,18.739 1.582,51.081 7.363,72.765 l 0.635,2.378 c 5.818,21.784 11.83,44.309 12.689,64.159 0.16,3.732 0.637,8.811 1.191,14.691 2.596,27.596 6.939,73.781 -5.648,120.989 -15.734,59.006 -16.848,74.183 -17.707,100.309 -0.746,22.658 1.717,35.476 4.566,50.317 0.533,2.767 1.08,5.616 1.627,8.629 3.58,19.679 -0.416,69.583 -5.924,89.871 -5.691,20.967 -15.049,72.572 -15.934,85.555 -0.09,1.326 -0.18,2.572 -0.266,3.75 -0.756,10.431 -1.102,15.19 2.264,22.18 1.65,3.43 7.09,9.48 12.354,15.332 7.27,8.086 14.139,15.723 14.316,19.479 0.295,6.285 -0.26,8.203 -2.465,11.988 -0.768,1.315 -1.334,2.516 -1.83,3.576 -0.863,1.832 -1.543,3.278 -2.768,4.3 -0.938,0.782 -2.072,0.993 -3.172,1.198 -1.211,0.226 -2.258,0.421 -2.906,1.326 l -0.285,0.4 c -0.873,1.237 -0.977,1.316 -2.773,2.098 -0.646,0.283 -1.547,0.675 -2.844,1.285 -0.945,0.444 -1.994,0.67 -3.115,0.67 -1.795,0 -3.543,-0.574 -4.945,-1.033 -0.949,-0.313 -1.848,-0.607 -2.43,-0.607 -0.393,0 -0.531,0.106 -0.635,0.496 -0.671,2.466 -4.614,6.128 -8.681,6.128 z"
          id="path1-4" //AQUI O CORPO INTEIRO
        />

        <path
          style={{ fill: porcentagem[4] }} // punho esquedo
          d="m 212.66748,514.12911 c -0.26344,0.26343 -0.0809,0.44634 -0.36541,0.73081 -0.0431,0.0431 -0.15551,-0.0545 -0.18271,0 -0.0974,0.19489 0.0975,0.53594 0,0.73082 -0.0854,0.17079 -0.3247,0.56813 -0.3654,0.73082 -0.0672,0.26862 0.20589,1.43844 0,1.64433 -0.0431,0.0431 -0.15551,-0.0545 -0.18271,0 -0.16523,0.33047 -0.24502,0.91776 -0.36541,1.27893 -0.0861,0.25838 -0.29931,0.46659 -0.36541,0.73082 -0.0295,0.11816 0.0545,0.25646 0,0.3654 -0.0272,0.0545 -0.1282,-0.0272 -0.1827,0 -0.76037,0.38021 0.19532,-0.0126 -0.1827,0.36541 -0.37801,0.37802 0.0148,-0.57766 -0.36541,0.18271 -0.1218,0.2436 -0.27931,0.47243 -0.36541,0.73081 -0.0385,0.11555 0.0545,0.25647 0,0.36541 -0.0272,0.0545 -0.1396,-0.0431 -0.1827,0 -0.0659,0.0659 -0.53912,1.04932 -0.54812,1.09622 -0.0478,0.23888 0.0905,0.50464 0,0.73082 -0.0506,0.1264 -0.2899,0.0694 -0.3654,0.1827 -0.0676,0.10135 0.0545,0.25647 0,0.36541 -0.0272,0.0545 -0.13961,-0.0431 -0.18271,0 -0.0744,0.0744 -0.30691,0.61386 -0.36541,0.73082 -0.0545,0.10894 0.0545,0.25646 0,0.36541 -0.34901,0.69804 -1.03644,1.46498 -1.27892,2.19245 -0.0385,0.11555 0.0385,0.24985 0,0.3654 -0.10997,0.32989 -0.42458,0.72561 -0.54812,1.09623 -0.0649,0.19476 0.10924,0.56696 0,0.73081 -0.0901,0.13509 -0.49201,0.14089 -0.54811,0.36541 -0.55751,2.23005 0.57896,-0.68574 -0.36541,0.73082 -0.13512,0.20269 0.0905,0.50463 0,0.73081 -0.0815,0.20388 -0.2839,0.34424 -0.3654,0.54812 -0.0452,0.11309 0.0452,0.25231 0,0.3654 -0.0815,0.20388 -0.26721,0.35171 -0.36541,0.54812 -0.2145,0.429 -0.22766,0.86566 -0.36541,1.27892 -0.1123,0.33689 -0.43582,0.57663 -0.54811,0.91352 -0.0385,0.11556 0.0239,0.24597 0,0.36541 -0.19009,0.95042 -0.1218,0.18271 -0.36541,0.91352 -0.14616,0.43849 0.14616,1.02314 0,1.46163 -0.17997,0.53993 -0.22792,1.09441 -0.36541,1.64434 -0.12897,0.51587 0.12897,1.12847 0,1.64434 -0.26287,1.05149 -1.72083,1.57183 -1.27893,2.92326 0,-0.17321 0.0759,-0.57908 0,-0.73082 -0.25458,-0.50917 -4.2579,-0.3654 -5.11571,-0.3654 -0.71744,0 -3.54075,-0.80899 -4.01949,-1.09623 -0.0522,-0.0313 0.0431,-0.1396 0,-0.1827 -0.13953,-0.13953 -3.14994,0.084 -3.65408,0 -0.18996,-0.0317 -0.35926,-0.14491 -0.54811,-0.18271 -0.11944,-0.0239 -0.25646,0.0545 -0.36541,0 -0.15407,-0.077 -0.21134,-0.2884 -0.36541,-0.3654 -0.47636,-0.23818 -1.56755,0.11915 -2.37515,-0.36541 -0.14771,-0.0886 -0.20199,-0.31091 -0.36541,-0.36541 -0.2311,-0.077 -0.49448,0.0591 -0.73081,0 -0.60767,-0.15192 -1.36806,-0.57039 -2.00975,-0.73082 -0.40322,-0.1008 -1.1147,0.0631 -1.46163,0 -0.75268,-0.13685 -1.44554,-0.56483 -2.19245,-0.73081 -0.36162,-0.0804 -0.74478,-0.0656 -1.09622,-0.18271 -1.62085,-0.54028 -3.05767,-1.60686 -4.5676,-2.37515 0.27633,-1.05951 0.45335,-1.75597 1.27893,-2.37515 0.0852,-0.0639 0.88414,-0.51874 0.91352,-0.54811 0.0963,-0.0963 0.0864,-0.26912 0.1827,-0.36541 0.0861,-0.0861 0.29785,0.10135 0.36541,0 1.32209,-1.98314 -0.51355,0.47898 0.1827,-0.91352 0.0609,-0.1218 0.30451,-0.0609 0.36541,-0.1827 0.0545,-0.10895 -0.0545,-0.25647 0,-0.36541 0.23209,-0.46417 0.21836,0.18711 0.36541,-0.54811 0.0937,-0.46848 -0.0937,-0.99316 0,-1.46164 0.0267,-0.13353 0.13964,-0.23621 0.1827,-0.3654 0.21885,-0.65655 0,-3.79557 0,-4.56761 0,-0.66665 -0.18956,-2.17185 0,-2.74056 0.0272,-0.0817 0.16582,-0.0982 0.18271,-0.1827 0.21941,-1.09705 0,-3.19468 0,-4.3849 0,-0.1527 -0.17082,-3.2649 -0.18271,-3.28867 -0.0272,-0.0545 -0.1218,0 -0.1827,0 -0.0609,-0.1218 -0.13964,-0.23622 -0.1827,-0.36541 -0.0487,-0.14601 0.10306,-0.62775 0,-0.73081 -0.0861,-0.0861 -0.27929,0.0861 -0.36541,0 -0.037,-0.037 -0.037,-0.87649 0,-0.91352 0.0861,-0.0861 0.2436,0 0.36541,0"
          id="path21"
          label="punhoe"
        />

        <path //pescoço
          style={{ fill: porcentagem[0], fillOpacity: 1 }}
          d="m 295.98051,127.162 6.57735,15.71254 2.55785,6.57735 -0.36541,12.05846 -0.3654,7.67357 58.46528,0.73082 -0.3654,-19.00122 2.55785,-8.03898 4.01949,-8.40438 2.19245,-6.21194 z"
          id="path22"
          label="pescoco"
        />

        <path
          style={{ fill: porcentagem[2] }} // Estilo para preencher o path com a cor branca
          d="m 220.70646,214.12911 -19.00122,24.48234 -2.92327,31.05968 v 10.23143 l 2.55786,2.92326 51.15713,0.73082 21.19366,-25.94397 2.55786,-27.0402 -6.94275,-28.13642 -6.94276,-12.05846 z"
          id="path24"
          label="ombroe"
        />
        <path
          style={{ fill: porcentagem[1] }}
          d="m 419.61318,196.88747 20.15384,10.3353 13.95265,12.91912 11.8856,18.60354 4.13412,17.57001 -0.51677,20.15384 -2.06706,11.88559 -23.25442,-3.10059 -39.79091,-1.55029 -13.43589,-3.61736 c 0,0 -11.36883,-21.70413 -10.85206,-23.77119 0.51676,-2.06706 4.65088,-23.77119 6.20118,-26.87178 1.55029,-3.10059 14.46942,-20.6706 14.46942,-20.6706 z"
          id="path25"
          label="ombrod"
        />
        <path></path>

        <path
          style={{ fill: porcentagem[11] }}
          d="m 259.43971,774.66504 -8.7698,43.11815 h 62.11937 l 2.92327,-42.38733 z"
          id="path30"
          label="joelhoe"
        />

        <path
          style={{ fill: porcentagem[3] }}
          d="m 457.85379,518.83206 34.10649,-10.3353 1.03353,23.77119 6.20118,14.46942 h -9.30177 l -25.83825,5.16765 -1.03353,-13.43589 -6.20118,-15.50295 z"
          id="path26"
          label="punhod"
        />
        <path
          style={{ fill: porcentagem[6] }}
          d="m 195.33717,389.64081 43.40826,7.23471 -4.13412,29.97237 -50.64297,-11.36883 z"
          id="path27"
          label="cotoveloe"
        />
        <path
          style={{ fill: porcentagem[9] }}
          d="m 234.61131,532.26795 -4.13412,49.60945 3.10059,40.30767 8.26824,36.17355 8.26824,29.97237 6.20118,29.97237 -2.06706,11.36883 64.07886,-3.10059 4.13412,-50.64297 3.10059,-38.24061 2.06706,-22.73766 5.16765,-11.36883 6.20118,17.57001 5.16765,45.47532 2.06706,43.40826 v 16.53648 l 65.11239,-3.10059 16.53648,-78.54828 6.20118,-22.73766 1.03353,-66.14592 -4.13412,-32.03944 z"
          id="path29"
          label="quadril"
        />
        <path
          style={{ fill: porcentagem[5] }}
          d="m 430.98201,402.04317 4.13412,35.14002 48.57591,-9.30177 -8.26824,-35.14002 z"
          id="path28"
          label="cotovelod"
        />

        <path
          style={{ fill: porcentagem[10] }}
          d="m 350.79172,776.12668 3.65408,39.46406 62.85018,-0.73081 -8.76979,-40.9257 z"
          id="path31"
          label="joelhod"
        />

        <path
          style={{ fill: porcentagem[13] }}
          d="m 273.32521,967.60049 v 40.92571 l 32.15591,-0.7308 2.19245,-7.3082 5.11571,-12.42386 0.73082,-8.03898 -4.3849,-9.50061 -1.46163,-2.92326 z"
          id="path32"
          label="tornozeloe"
        />
        <path
          style={{ fill: porcentagem[12] }}
          d="m 361.02314,966.13886 -2.92326,10.23142 v 10.23143 l 4.38489,10.96224 v 5.84655 l 31.4251,-0.7308 v -16.07799 l 2.92326,-21.92449 z"
          id="path33"
          label="tornozelod"
        />

        <path
          style={{ fill: porcentagem[7] }}
          d="m 752.00974,353.71498 5.84653,6.57735 5.11572,26.30938 -1.46164,13.15468 h 154.2022 l 0.73081,-26.30937 5.84653,-13.15469 3.65408,-8.7698 -1.46163,-63.581 -176.12668,1.46164 z"
          id="path34"
          label="dorsal"
        />
        <path
          style={{ fill: porcentagem[8] }}
          d="m 760.77954,436.2972 -12.42388,49.69549 181.97321,-2.92326 -7.30816,-26.30938 -4.3849,-21.92448 -0.73082,-3.65408 z"
          id="path35"
          label="lombar"
        />

        <path />
        <path />

        <text
          style={{ fill: "#000000" }}
          x="81.851402"
          y="235.32277"
          id="text35"
        >
          <tspan x="81.851402" y="235.32277">
            OMBRO ESQUERDO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="46.772228"
          y="404.8721"
          id="text36"
        >
          <tspan x="46.772228" y="404.8721">
            COTOVELO ESQUERDO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="55.542023"
          y="527.64923"
          id="text37"
        >
          <tspan x="55.542023" y="527.64923">
            PUNHO ESQUERDO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="476.49207"
          y="252.86235"
          id="text38"
        >
          <tspan x="476.49207" y="252.86235">
            OMBRO DIREITO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="485.26187"
          y="404.8721"
          id="text39"
        >
          <tspan x="485.26187" y="404.8721">
            COTOVELO DIREITO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="502.80145"
          y="529.11084"
          id="text40"
        >
          <tspan x="502.80145" y="529.11084">
            PUNHO DIREITO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="384.40927"
          y="150.54811"
          id="text41"
        >
          <tspan x="384.40927" y="150.54811">
            PESCOÇO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="445.79782"
          y="694.27527"
          id="text42"
        >
          <tspan x="445.79782" y="694.27527">
            QUADRIL/COXA
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="420.95007"
          y="800.97443"
          id="text43"
        >
          <tspan x="420.95007" y="800.97443">
            JOELHO DIREITO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="122.7771"
          y="799.51282"
          id="text44"
        >
          <tspan x="122.7771" y="799.51282">
            JOELHO ESQUERDO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="119.85384"
          y="992.44824"
          id="text45"
        >
          <tspan x="119.85384" y="992.44824">
            TORNOZELO ESQUERDO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="401.94885"
          y="982.21686"
          id="text46"
        >
          <tspan x="401.94885" y="982.21686">
            TORNOZELO DIREITO
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="646.04138"
          y="334.71375"
          id="text47"
        >
          <tspan x="646.04138" y="334.71375">
            DORSAL
          </tspan>
        </text>
        <text
          style={{ fill: "#000000" }}
          x="634.34833"
          y="463.33737"
          id="text48"
        >
          <tspan x="634.34833" y="463.33737">
            LOMBAR
          </tspan>
        </text>
      </svg>
      <div className="flex flex-row mt-2 mb-2">
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#c0c0c0" }}
          ></div>
          <p>0-20%</p>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#ffa500" }}
          ></div>
          <p>20-40%</p>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#800080" }}
          ></div>
          <p>40-60%</p>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#000080" }}
          ></div>
          <p>60-80%</p>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#ff0000" }}
          ></div>
          <p>80-100%</p>
        </div>
      </div>
    </div>
  );
};

export default CorpoHumano;
