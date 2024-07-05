import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";
import Sample from "@/components/Sample";

export default function Home() {
  return (
    <NavBar>
    <main className="h-screen flex flex-col items-center justify-between bg-gray-300">
      

  
    
      <div className="flex flex-row flex-grow p-5 w-full justify-center items-center">
        <div className="flex flex-col gap-5 w-1/2 justify-center items-center h-full">
          {/* Quadrado 1 */}
          <div className="bg-white rounded-lg h-1/2 w-4/5 shadow-md">Gráfico 1</div>

          {/* Quadrado 2 */}
          <div className="bg-white rounded-lg h-1/2 w-4/5 shadow-md">Gráfico 2</div>
        </div>

        <div className="flex flex-col h-full w-1/2 justify-center items-center">
          {/* Quadrado 1 */}
          <div className="bg-white rounded-lg h-full w-4/5 shadow-md">Informações/filtros</div>
        </div>
        <Sample></Sample>
      </div>
    </main>
    </NavBar>
  );
}
