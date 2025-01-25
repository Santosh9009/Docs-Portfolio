"use client";

import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiDocs() {
    const [activeEndpoint, setActiveEndpoint] = useState("about");

    const endpoints = [
        {
            id: "about",
            method: "GET",
            path: "/about",
            description: "Fetches detailed information about me.",
            parameters: [],
            responses: {
                200: {
                    description: "Successfully retrieved developer information",
                    example: {
                        name: "Santosh Pati",
                        role: "Full Stack Developer",
                        bio: "Full Stack Web Developer experienced in MERN stack, Java, PostgreSQL, Prisma, and Next.js. Skilled in designing and maintaining web applications. Seeking a full-time role to leverage my expertise.",
                        location: "Odisha, India",
                        email: "patisantosh00@gmail.com",
                        github: "github.com/Santosh9009",
                        linkedin: "linkedin.com/in/santosh-pati-66888a272"
                    },
                },
                404: {
                    description: "Developer information not found",
                    example: {
                        error: "Developer information not found",
                    },
                },
            },
        },
        {
            id: "projects",
            method: "GET",
            path: "/projects",
            description: "Retrieves a list of my projects with details.",
            parameters: [],
            responses: {
                200: {
                    description: "Successfully retrieved projects list",
                    example: [
                        {
                            id: 1,
                            name: "Medium-Clone-Blogging-website",
                            description: "Developed a full-featured platform with a responsive React.js frontend",
                            technologies: ["React.js", "Hono", "PostgreSQL", "Cloudflare"],
                            github: "https://github.com/Santosh9009/medium-blog-hono",
                            demo: "https://medium-blog-hono-peach.vercel.app"
                        }
                    ],
                },
                404: {
                    description: "Projects not found",
                    example: {
                        error: "Projects not found",
                    },
                },
            },
        },
        {
            id: "experience",
            method: "GET",
            path: "/experience",
            description: "Retrieves my work experience history.",
            parameters: [],
            responses: {
                200: {
                    description: "Successfully retrieved experience data",
                    example: [
                        {
                            title: "Frontend Developer",
                            company: "Intelligent Cloud Applications",
                            duration: "July 2023 - October 2023",
                            description: "Developed and maintained user interfaces. Collaborated with teams to implement new features and improvements. Optimized code for better performance and user experience.",
                            technologies: ["React.js", "Tailwind CSS", "Git", "GitHub"]
                        }
                    ],
                },
                404: {
                    description: "Experience data not found",
                    example: {
                        error: "Experience data not found",
                    },
                },
            },
        },
        {
            id: "skills",
            method: "GET",
            path: "/skills",
            description: "Retrieves my technical skills and expertise.",
            parameters: [],
            responses: {
                200: {
                    description: "Successfully retrieved skills",
                    example: {
                        frontend: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React.js", "Next.js"],
                        backend: ["Node.js", "Express"],
                        databases: ["PostgreSQL", "MongoDB", "Redis"],
                        devops: ["Kubernetes", "Docker", "Kafka", "AWS", "Git", "GitHub"],
                        languages: ["JavaScript", "Java", "C", "Python"]
                },
                404: {
                    description: "Skills not found",
                    example: {
                        error: "Skills not found",
                    },
                },
            },
        },
        {
            id: "contact",
            method: "GET",
            path: "/contact",
            description: "Retrieves my contact information.",
            parameters: [],
            responses: {
                200: {
                    description: "Successfully retrieved contact information",
                    example: {
                        email: "patisantosh00@gmail.com",
                        github: "https://github.com/Santosh9009",
                        linkedin: "https://linkedin.com/in/santosh-pati-66888a272",
                        location: "Odisha, India",
                        mobile: "+91-6371195118"
                    },
                },
                404: {
                    description: "Contact information not found",
                    example: {
                        error: "Contact information not found",
                    },
                },
            },
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
                <p className="text-muted-foreground">
                    Explore the available endpoints to access my portfolio data programmatically.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <nav className="space-y-2">
                        {endpoints.map((endpoint) => (
                            <button
                                key={endpoint.id}
                                onClick={() => setActiveEndpoint(endpoint.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                    activeEndpoint === endpoint.id
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-muted"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                                        {endpoint.method}
                                    </Badge>
                                    {endpoint.path}
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {endpoints.map((endpoint) => {
                        if (activeEndpoint !== endpoint.id) return null;

                        return (
                            <div key={endpoint.id} className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                                            {endpoint.method}
                                        </Badge>
                                        <code className="text-lg">{endpoint.path}</code>
                                    </div>
                                    <p className="text-muted-foreground">{endpoint.description}</p>
                                </div>

                                <Tabs defaultValue="200" className="w-full">
                                    <TabsList>
                                        {Object.keys(endpoint.responses).map((status) => (
                                            <TabsTrigger key={status} value={status}>
                                                {status} Response
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {Object.entries(endpoint.responses).map(([status, response]) => (
                                        <TabsContent key={status} value={status}>
                                            <Card>
                                                <CardHeader>
                                                    <CardDescription>
                                                        {response.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <CodeBlock
                                                        language="json"
                                                        code={JSON.stringify(response.example, null, 2)}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
} 