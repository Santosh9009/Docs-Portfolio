"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function Contact() {
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        const fetchContactData = async () => {
            const response = await fetch("http://localhost:5001/contact");
            const data = await response.json();
            setContactData(data);
        };
        fetchContactData();
    }, []);

    if (!contactData) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Contact</h1>
                <p className="text-muted-foreground">Let's connect! Here's how you can reach me.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Email
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a href={`mailto:${contactData.email}`} className="text-primary hover:underline">
                            {contactData.email}
                        </a>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Github className="h-5 w-5" />
                            GitHub
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contactData.github.split('github.com/')[1]}
                        </a>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Linkedin className="h-5 w-5" />
                            LinkedIn
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contactData.linkedin.split('linkedin.com/')[1]}
                        </a>
                    </CardContent>
                </Card>
            </div>

            <Button className="w-full">
                Download Resume
            </Button>
        </div>
    );
}   