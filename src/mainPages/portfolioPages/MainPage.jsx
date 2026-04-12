"use client";

import React, { useState } from "react";
import { FaHome, FaUser, FaList, FaBriefcase, FaCommentDots } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import Image from "next/image";
import NavItem from "./NavItem";

const MainPage = () => {
  const [active, setActive] = useState("Home");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-60 bg-white shadow-md flex flex-col items-center md:items-start px-4 py-8 relative">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-500"></div>

        <h1 className="text-3xl font-bold flex items-center gap-1">
          <span className="font-serif italic">A</span>tlas
        </h1>

        <nav className="flex flex-col gap-6 mt-12 w-full">
          <NavItem icon={<FaHome />} label="Home"
            active={active === "Home"} onClick={() => setActive("Home")} />

          <NavItem icon={<FaUser />} label="About"
            active={active === "About"} onClick={() => setActive("About")} />

          <NavItem icon={<FaList />} label="Services"
            active={active === "Services"} onClick={() => setActive("Services")} />

          <NavItem icon={<FaBriefcase />} label="Portfolio"
            active={active === "Portfolio"} onClick={() => setActive("Portfolio")} />

          <NavItem icon={<FaCommentDots />} label="Contact"
            active={active === "Contact"} onClick={() => setActive("Contact")} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 relative">

        <div className="absolute top-6 right-6 flex gap-4">
          <button className="bg-white shadow-md p-2 rounded-full">
            <FiSettings size={20} />
          </button>
          <button className="bg-white shadow-md p-2 rounded-full">
            <BsMoon size={20} />
          </button>
        </div>

        {/* Dynamic Content */}
        {active === "Home" && (
          <>
            <div className="flex-1 max-w-xl z-10">
              <h2 className="text-2xl md:text-3xl font-bold">
                Hello, my name is{" "}
                <span className="text-red-500 font-[cursive]">
                  Alimi Mousaad
                </span>
              </h2>

              <h1 className="text-3xl md:text-5xl font-bold mt-2">
                I&apos;m a <span className="text-red-500">Graphic Designer</span>
              </h1>

              <p className="mt-4 text-gray-600 text-sm md:text-base">
                I&apos;m a web Designer with extensive experience for over 10 years.
              </p>

              <button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full">
                More About Me
              </button>
            </div>

            <div className="flex-1 flex justify-center relative mt-10 md:mt-0">
              <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-red-500"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-red-500"></div>

              <Image
                src="/profile.jpg"
                alt="Profile"
                width={280}
                height={350}
                className="rounded-lg object-cover shadow-md"
              />
            </div>
          </>
        )}

        {active === "About" && <h1 className="text-3xl font-bold">About Page</h1>}
        {active === "Services" && <h1 className="text-3xl font-bold">Services Page</h1>}
        {active === "Portfolio" && <h1 className="text-3xl font-bold">Portfolio Page</h1>}
        {active === "Contact" && <h1 className="text-3xl font-bold">Contact Page</h1>}
      </main>
    </div>
  );
};

export default MainPage;