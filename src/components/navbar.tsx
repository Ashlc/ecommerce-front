import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@phosphor-icons/react";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import Cart from "./cart";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <MagnifyingGlassIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3">
          <Link
            className="flex justify-start items-center gap-1 font-heading font-medium text-primary"
            color="foreground"
            href="/"
          >
            iShop
            <ShoppingCartIcon className="w-6 h-6" weight="duotone" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex">
        <NavbarItem className="hidden lg:flex grow">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden items-center md:flex gap-4">
          <Button variant="light" isIconOnly size="sm" radius="full">
            <UserIcon className="w-5 h-5" />
          </Button>
          <Cart />
          <Divider orientation="vertical" className="h-6" />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
