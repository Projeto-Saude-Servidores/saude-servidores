import Banner from "@/components/Banner";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between bg-gray-300">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Banner />
      </div>
      
      <div className="flex p-5 w-full justify-center items-center">
        <div className="flex flex-col w-1/2 justify-center items-center">
          {/* Quadrado 1 */}
          <div className="bg-white rounded-lg h-60 w-4/5 mb-4"></div>
          
          {/* Quadrado 2 */}
          <div className="bg-white rounded-lg h-60 w-4/5 mb-4"></div>
        </div>

        <div className="flex flex-col w-1/2 justify-center items-center">
          {/* Quadrado 1 */}
          <div className="bg-white rounded-lg h-60 w-4/5 mb-4"></div>
          
        </div>
      </div>


        
    
    </main>
  );
}
