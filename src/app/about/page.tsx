"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            const response = await fetch("http://localhost:5001/about");
            const data = await response.json();
            setAboutData(data);
        };
        fetchAboutData();
    }, []);

    if (!aboutData) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <Avatar className="h-32 w-32">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{aboutData.name[0]}</AvatarFallback>
                </Avatar>
                
                <div>
                    <h1 className="text-3xl font-bold mb-2">{aboutData.name}</h1>
                    <p className="text-xl text-muted-foreground">{aboutData.role}</p>
                    <p className="text-muted-foreground">{aboutData.location}</p>
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <p className="text-lg leading-relaxed">{aboutData.bio}</p>
                </CardContent>
            </Card>
        </div>
    );
}