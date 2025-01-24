import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { SearchCommand } from "./SearchCommand";

const Header = () => {
  return (
    <header className="w-full z-20 bg-background border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo or Title */}
      <h1 className="text-lg font-bold text-primary">
        <Link href="/">
          <p className="hover:underline">Portfolio Docs</p>
        </Link>
      </h1>

      {/* Search Bar and Actions */}
      <div className="hidden md:flex items-center justify-center space-x-4 mr-10">
        <ModeToggle />
        <SearchCommand />
        <Button variant="default" asChild>
          <Link href="/api">API Docs</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
