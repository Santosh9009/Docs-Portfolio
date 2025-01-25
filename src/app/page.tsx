import CodeBlock from "../components/CodeBlock";
import { ArrowRight, Book, Code2, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiDocs() {
    const endpoints = [
        {
            method: "GET",
            path: "/about",
            description: "Fetches information about me.",
            exampleResponse: {
                name: "John Doe",
                role: "Full Stack Developer",
            },
        },
        {
            method: "GET",
            path: "/projects",
            description: "Fetches a list of my projects.",
            exampleResponse: [
                { id: 1, name: "Portfolio Site", description: "My personal portfolio." },
                { id: 2, name: "E-commerce App", description: "A full-stack e-commerce app." },
            ],
        },
        {
            method: "GET",
            path: "/contact",
            description: "Fetches contact information.",
            exampleResponse: {
                email: "john.doe@example.com",
                github: "github.com/johndoe",
                linkedin: "linkedin.com/in/johndoe",
            },
        },
    ];

    const features = [
        {
            icon: Code2,
            title: "Full Stack Developer",
            description: "Experienced in building web applications using modern technologies.",
        },
        {
            icon: Terminal,
            title: "Clean Code Advocate",
            description: "Writing maintainable, scalable, and well-documented code.",
        },
        {
            icon: Book,
            title: "Continuous Learner",
            description: "Always staying up-to-date with the latest technologies.",
        },
    ];

    const quickLinks = [
        { title: "Projects", href: "/projects", description: "View my recent work" },
        { title: "Skills", href: "/skills", description: "Technical expertise" },
        { title: "API Docs", href: "/api", description: "API documentation" },
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="space-y-4">
                <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
                <p className="text-xl text-muted-foreground">
                    Full Stack Developer specializing in modern web technologies
                </p>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/contact">Contact Me</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={feature.title}>
                            <CardHeader>
                                <Icon className="h-10 w-10 text-primary" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            {/* Quick Links */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickLinks.map((link) => (
                        <Link href={link.href} key={link.title}>
                            <Card className="hover:bg-muted/50 transition-colors">
                                <CardHeader>
                                    <CardTitle>{link.title}</CardTitle>
                                    <CardDescription>{link.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* API Documentation Section */}
            <section className="flex-shrink">
                <h1 className="text-2xl font-bold mb-4">API Documentation</h1>
                <ul className="space-y-6">
                    {endpoints.map((endpoint, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded">
                            <p>
                                <strong>{endpoint.method}</strong> {endpoint.path}
                            </p>
                            <p className="text-sm text-gray-600">{endpoint.description}</p>
                            <CodeBlock language="json" code={JSON.stringify(endpoint.exampleResponse, null, 2)} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
