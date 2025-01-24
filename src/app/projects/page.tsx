"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("http://localhost:5001/projects");
            const data = await response.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    if (projects.length === 0) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">A collection of my recent work and side projects.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {project.name}
                                <div className="flex gap-2">
                                    <Github className="h-5 w-5 cursor-pointer hover:text-primary" />
                                    <Globe className="h-5 w-5 cursor-pointer hover:text-primary" />
                                </div>
                            </CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 flex-wrap">
                                <Badge>React</Badge>
                                <Badge>TypeScript</Badge>
                                <Badge>Node.js</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 