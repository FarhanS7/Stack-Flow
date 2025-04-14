import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constant";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const NavContent = () => {
  return (
    <section className="flex h-full flex-col gap-4 px-4 py-6 text-gray-900 dark:text-gray-100 font-spaceGrotesk">
      {sidebarLinks.map((item) => (
        <SheetClose asChild key={item.route}>
          <Link
            href={item.route}
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Image src={item.imgURL} alt={item.label} width={20} height={20} />
            <span>{item.label}</span>
          </Link>
        </SheetClose>
      ))}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
          className="invert dark:invert-0 sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-gray-100 dark:bg-gray-800 border-none"
      >
        <Link href={"/"} className="flex items-center gap-2 mt-5">
          <Image
            src="/assets/images/site-logo.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-spaceGrotesk ">
            Stack <span className="text-orange-500">Flow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent></NavContent>
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className=" btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none w-full">
                    <span className="text-gray-900 dark:text-gray-100">
                      Log In
                    </span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className=" btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none w-full">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
