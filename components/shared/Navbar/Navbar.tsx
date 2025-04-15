import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import GlobalSearch from "../Search/GlobalSearch";
import MobileNav from "./MobileNav";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md sm:px-8">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/assets/images/site-logo.svg"
          alt="logo"
          width={24}
          height={24}
        />
        <p className="font-medium">
          Stack
          <span className="font-bold text-orange-600 dark:text-orange-400 max-sm:hidden">
            Flow
          </span>
        </p>
      </Link>

      {/* GlobalSearch Component Placeholder */}

      <GlobalSearch />

      <div className="flex-1 mx-4">
        {/* Insert your GlobalSearch component here */}
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Component Placeholder */}

        <Theme />

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#3B82F6", // Changed to a standard Tailwind blue
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
