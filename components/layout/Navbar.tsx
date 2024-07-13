import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  return (
    /* w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] */
    <nav className="px-[5%] xl:px-12 py-4 flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 shadow-lg">
      <h1 className="text-lg lg:text-2xl font-bold">Chat AI</h1>
      <div className="flex gap-6">
        <ModeToggle />
        <Avatar className="hidden sm:block">
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
