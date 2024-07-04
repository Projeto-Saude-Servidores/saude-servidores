"use client";
import React, { useState } from "react";

import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";

import ButtonNav from "./ButtonNav";

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
    <div className="relative flex flex-col h-full bg-gray-400  w-full">
      <header
        className={`bg-gray-800 text-black flex justify-between items-center p-4 items-center flex ${
          open ? " h-0" : " p-4"
        }
        } `}
      >
        <button
          className="text-2xl flex items-center"
          onClick={handleDrawerToggle}
        >
          <DensityMediumOutlinedIcon />
        </button>
      </header>
      <div
        className={`absolute top-0 left-0 w-64 bg-gray-800 text-white h-full transform ${
          open ? "translate-x-0 " : "-translate-x-full"
        } transition-transform duration-50`}
      >
        <button className="text-2xl p-4" onClick={handleDrawerToggle}>
          <CancelOutlinedIcon />
        </button>

        <ul>
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="p-4">
                <ButtonNav title={item.title} icon={item.icon}>
                  {item.icon}
                </ButtonNav>
              </li>
            );
          })}
        </ul>
        <hr className="my-4 border-gray-700" />
      </div>
      <main className={`flex-grow  border-2 px-8 ${open ? "ml-64" : " px-0"}`}>
        {children}
      </main>
    </div>
  );
}
