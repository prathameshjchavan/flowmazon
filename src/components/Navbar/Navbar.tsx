import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
