import React from "react";

export default function ButtonNav({ title, children }) {
  return (
    <button className="flex items-center w-full py-6 h-8 transition-transform duration-300 hover:scale-105 hover:bg-gray-200">
      <div className=" px-2 font-serif text-xs">{title}</div>
      <div>{children}</div>
    </button>
  );
}
