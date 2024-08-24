"use client";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { setSelectedUser } = useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="sticky z-20 top-0 pt-4 bg-dark-100 mb-6">
      <div className="mb-4 flex justify-between items-center w-full flex-row">
        <div className="flex flex-col sm:flex-row justify-center items-start">
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => router.push("/posts")}
          >
            Thought
            <span className="text-purple-500">Lane</span>
          </h1>
          {/* {user?.name && (
            <p className="text-gray-300 mt-1 sm:hidden block text-center">
              Hello, {user.name}!
            </p>
          )} */}
        </div>
        {user?.name && (
          <div className="flex space-x-4 items-center">
            <img
              src={`/avatars/${user?.avatar ?? "default"}.png`}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-purple-500"
            />
            <div className="relative" ref={menuRef}>
              <div className="cursor-pointer p-1" onClick={toggleMenu}>
                <RxHamburgerMenu className="text-2xl text-gray-300" />
              </div>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg w-32 border-gray-600 border overflow-hidden text-gray-300">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      router.push("/profile");
                      toggleMenu();
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <hr className="border-gray-600" />
    </div>
  );
}
