"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
//import Search from "../search/Search";
//import UserMenu from "../user-menu/UserMenu";
//import useMobile from "../hooks/useMobile";
//import { DisplayPrice } from "../utils/DisplayPrice";
import DisplayCartItem from "../display-card/DisplayCartItem";
//import {useSelector} from "react-redux";
//import {useGlobalContext} from "../provider/GlobalProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

export default function Header() {
  //const [isMobile] = useMobile();
  //const location = useLocation();
  //const isSearchPage = location.pathname === "/search";
  //const navigate = useNavigate();
  //const [openUserMenu, SetopenUserMenu] = useState(false);
  //const [openCart, SetopenCart] = useState(false);

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {/* comment  */}
      <div className="container mx-auto flex items-center px-2 justify-between">
        {/*Logo */}
        <div className="h-full">
          <Link href="/">
            <img src="assets/images/logo.png" alt="logo" className="h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
