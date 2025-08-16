import React from "react";
import GearIcon from "./GearIcon";

const GearBackgroundLayout = ({ children }) => {
  return (
    <div className="relative overflow-hidden z-0 bg-gray-800 from-[#2a2a46] to-[#1a1a2e]">
      <div className="absolute inset-0 -z-10">
        <GearIcon className="absolute w-[200px] h-[200px] -top-[50px] -left-[50px] text-white/5 motion-reduce:animate-none animate-[spin_20s_linear_infinite]" />
        <GearIcon className="absolute w-[150px] h-[150px] top-[10%] -right-[75px] text-white/5 motion-reduce:animate-none animate-[spin_15s_linear_infinite_reverse]" />
        <GearIcon className="absolute w-[300px] h-[300px] bottom-[-150px] -left-[100px] text-white/10 opacity-50 motion-reduce:animate-none animate-[spin_35s_linear_infinite_reverse]" />

        <GearIcon className="absolute w-[120px] h-[120px] top-[35%] right-[15%] text-white/5 motion-reduce:animate-none animate-[spin_18s_linear_infinite]" />

        <GearIcon className="absolute w-[180px] h-[180px] top-[50%] left-[10%] text-white/10 opacity-60 motion-reduce:animate-none animate-[spin_28s_linear_infinite_reverse]" />

        <GearIcon className="absolute w-[60px] h-[60px] bottom-[10%] left-[45%] text-white/5 motion-reduce:animate-none animate-[spin_8s_linear_infinite]" />

        <GearIcon className="absolute w-[250px] h-[250px] bottom-[-80px] right-[-80px] text-white/5 motion-reduce:animate-none animate-[spin_40s_linear_infinite]" />


        <GearIcon className="absolute w-[50px] h-[50px] top-[15%] left-[30%] text-white/5 motion-reduce:animate-none animate-[spin_10s_linear_infinite]" />
        <GearIcon className="absolute w-[70px] h-[70px] top-[80%] right-[30%] text-white/5 motion-reduce:animate-none animate-[spin_13s_linear_infinite_reverse]" />
        <GearIcon className="absolute w-[90px] h-[90px] top-[5%] right-[40%] text-white/5 motion-reduce:animate-none animate-[spin_22s_linear_infinite]" />
      </div>

      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default GearBackgroundLayout;
