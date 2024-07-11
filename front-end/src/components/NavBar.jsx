"use client";
import React, { useState } from "react";

import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";

import ButtonNav from "./ButtonNav";
import Banner from "./Banner";

//dps só adicionar uma chave valor de link
const menuItems = [
  { title: "GRÁFICOS GERAIS", icon: <TimelineRoundedIcon /> },
  { title: "AMBIENTE DE TRABALHO", icon: <BusinessCenterIcon /> },
  { title: "COLUNA", icon: <MedicalServicesIcon /> },
  { title: "OUTROS", icon: <SupervisorAccountIcon /> },
];

export default function NavBar({ children }) {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full pt-[90px]">
      <Banner onclick={handleDrawerToggle} />
      <header
        className={` text-black flex justify-between items-center items-center flex ${
          open ? " h-0" : " p-0"
        }
        } `}
      ></header>
      <div
        // branco ficou estranho, mas pode alterar aqui a cor da barra lateral
        className={`absolute pt-[90px] top-0 left-0 w-64 bg-white border-black text-blue-500 h-full transform ${
          open ? "translate-x-0 " : "-translate-x-full"
        } transition-transform duration-700`}
      >
        <button className="text-2xl p-4" onClick={handleDrawerToggle}>
          <CancelOutlinedIcon className="transition-transform duration-300 text-red-500 hover:scale-105 hover:text-red-500" />
        </button>

        <ul>
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="mt-3 h-full w-full ">
                <ButtonNav title={item.title} icon={item.icon}>
                  {item.icon}
                </ButtonNav>
              </li>
            );
          })}
        </ul>
        <hr className="my-4 border-gray-700" />
      </div>
      <main
        className={`flex-grow h-max w-full border-2 px-0  bg-gray-300 ${
          open ? "ml-64  bg-gray-300" : "  bg-gray-300 h-max w-full px-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
