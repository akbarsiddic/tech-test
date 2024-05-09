"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  ChartPieIcon,
  BookOpenIcon,
  UsersIcon,
  TicketIcon,
  LightBulbIcon,
  XMarkIcon,
  CogIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Button } from "./ui/button";
import SearchModal from "../components/search-modal";

const navigation = [
  { name: "Overview", href: "/", icon: ChartPieIcon, current: false },
  { name: "Tickets", href: "/tickets", icon: TicketIcon, current: false },
  { name: "Ideas", href: "#", icon: LightBulbIcon, current: false },
  { name: "Contact", href: "#", icon: UsersIcon, current: false },
  { name: "Agents", href: "#", icon: UserCircleIcon, current: false },
  { name: "Article", href: "#", icon: BookOpenIcon, current: false },
];
const teams = [
  { id: 1, name: "Settings", href: "#", icon: CogIcon, current: false },
  {
    id: 2,
    name: "Subscription",
    href: "#",
    icon: CheckBadgeIcon,
    current: false,
  },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        className="h-8 w-auto"
                        src="data:image/png;base64,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"
                        alt="Your Company"
                        width={40}
                        height={40}
                      />
                      <h1>Dashboard Kit</h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="bg-indigo-200 text-xs font-semibold leading-6"></div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <team.icon
                                    className={classNames(
                                      team.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {team.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center space-x-4 text-white">
              <Image
                className="h-8 w-auto"
                src="data:image/png;base64,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"
                alt="Your Company"
                width={40}
                height={40}
              />
              <h1>Dashboard Kit</h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-700 text-white"
                              : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="bg-indigo-200 " aria-hidden="true" />

                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-indigo-700 text-white"
                              : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <team.icon
                            className={classNames(
                              team.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {team.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72 ">
          <div className="flex-end sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <SearchModal />

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900",
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu> */}
                <UserButton />
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
