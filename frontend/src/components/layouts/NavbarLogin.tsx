import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Menu } from "@/types/menu";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "@/hooks/authHook";
import ConfirmDialog from "./ConfirmDialog";

const menu: Menu[] = [
  {
    path: "/",
    name: "ទំព័រដើម",
  },
  {
    path: "/course",
    name: "ថ្នាក់វីដេអូ",
  },
  {
    path: "/about",
    name: "អំពីយើង",
  },
  {
    path: "/contact",
    name: "ទំនាក់ទំនង",
  },
];

function NavbarLogin() {
  const { handleLogout } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  function logout() {
    handleLogout();
  }
  return (
    <>
      <header className="w-full border-b bg-white/20 backdrop-blur z-10 sticky top-0">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-color to-accent-color">
            Code Kampuchea
          </h2>

          {/* Navigation */}
          <nav className="flex justify-center">
            <ul className="hidden md:flex items-center gap-6 ">
              {menu.map((e, idx) => {
                return (
                  <NavLink
                    key={idx}
                    to={e.path}
                    className={({ isActive }) =>
                      ` font-bold tracking-wide transition-colors hover:text-accent-color  ${
                        isActive
                          ? "text-primary-color"
                          : "text-discription-color"
                      }`
                    }
                  >
                    {e.name}
                  </NavLink>
                );
              })}
            </ul>

            {/* Action button */}
            <div className="flex justify-center items-center ">
              <Button
                onClick={() => setIsConfirmOpen(true)}
                className=" cursor-pointer ml-4 bg-linear-to-r from-primary-color to-accend-purple text-white hover:opacity-90"
              >
                ចេញ
              </Button>

              <IoMenu
                onClick={() => SetIsOpen(!isOpen)}
                className={`ml-2 block md:hidden text-2xl cursor-pointer ${isOpen}`}
              />
            </div>
          </nav>
        </div>
        {/* mobile nav */}
        <ul
          className={`flex md:hidden flex-col items-center gap-6 transition-all duration-200 ease-in overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}
        >
          {menu.map((e, idx) => {
            return (
              <NavLink
                key={idx}
                to={e.path}
                className={({ isActive }) =>
                  ` font-bold tracking-wide transition-colors hover:text-accent-color  ${
                    isActive ? "text-primary-color" : "text-discription-color"
                  }`
                }
              >
                {e.name}
              </NavLink>
            );
          })}
        </ul>
      </header>

      <ConfirmDialog
        title="ចេញពីគណនី"
        message="អ្នកនឹងត្រូវបានចាកចេញពីគណនីរបស់អ្នក។"
        isOpen={isConfirmOpen}
        onConfirm={logout}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}

export default NavbarLogin;
