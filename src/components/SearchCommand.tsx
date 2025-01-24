"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Define the structure of searchable content
interface SearchableItem {
    title: string;
    description?: string;
    type: 'project' | 'skill' | 'experience' | 'contact';
    href: string;
}

// Sample searchable content - you can fetch this from your API
const searchableContent: SearchableItem[] = [
    {
        title: "Portfolio Site",
        description: "A full-featured Threads app clone with MongoDB and Next.js.",
        type: "project",
        href: "/projects",
    },
    {
        title: "VSCode Portfolio",
        description: "Interactive portfolio inspired by VSCode UI.",
        type: "project",
        href: "/projects",
    },
    {
        title: "React",
        description: "Frontend Development",
        type: "skill",
        href: "/skills",
    },
    {
        title: "Node.js",
        description: "Backend Development",
        type: "skill",
        href: "/skills",
    },
    {
        title: "Contact Information",
        description: "Get in touch with me",
        type: "contact",
        href: "/contact",
    },
];

export function SearchCommand() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                onClick={() => setOpen(true)}
            >
                <Search className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">Search...</span>
                <span className="sr-only">Search</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Projects">
                        {searchableContent
                            .filter((item) => item.type === "project")
                            .map((item) => (
                                <CommandItem
                                    key={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                >
                                    <span>{item.title}</span>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    <CommandGroup heading="Skills">
                        {searchableContent
                            .filter((item) => item.type === "skill")
                            .map((item) => (
                                <CommandItem
                                    key={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                >
                                    <span>{item.title}</span>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    <CommandGroup heading="Other">
                        {searchableContent
                            .filter((item) => !["project", "skill"].includes(item.type))
                            .map((item) => (
                                <CommandItem
                                    key={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                >
                                    <span>{item.title}</span>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
} 