"use client";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";
import LoadingState from "@/components/LoadingState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "@/components/AnimatedCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Badge } from "@/components/ui/badge";
import { Github, Mail, Linkedin, MapPin, Calendar, Building } from "lucide-react";

interface AboutData {
    name: string;
    role: string;
    bio: string;
    location: string;
}

const GITHUB_USERNAME = "Santosh9009";
const CONTACT_INFO = {
    email: "santosh.pati@example.com",
    github: "https://github.com/santoshpati",
    linkedin: "https://linkedin.com/in/santoshpati",
};

export default function About() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFromAPI("/about");
                setAboutData(data);
            } catch (error) {
                console.error("Error fetching about data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <LoadingState />;
    if (!aboutData) return <div>Failed to load about data</div>;

    return (
        <div className="space-y-8">
            {/* Profile Section */}
            <AnimatedCard delay={0.1}>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Profile Image */}
                        <div className="w-32  rounded-full overflow-hidden">
                            <img
                                src={`https://github.com/${GITHUB_USERNAME}.png`}
                                alt={aboutData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Profile Info */}
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold">{aboutData.name}</h1>
                                <p className="text-xl text-muted-foreground">{aboutData.role}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {aboutData.location}
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Building className="h-3 w-3" />
                                    Open to Work
                                </Badge>
                            </div>
                            
                            <p className="text-muted-foreground">{aboutData.bio}</p>
                        </div>
                    </div>
                </CardHeader>
            </AnimatedCard>

            {/* Experience Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <ExperienceTimeline />
            </section>

            {/* GitHub Stats Section */}
            <AnimatedCard delay={0.2}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        GitHub Statistics
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* GitHub Stats Card */}
                    <img
                        src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&count_private=true`}
                        alt="GitHub Stats"
                        className="w-full"
                    />
                    
                    {/* Top Languages Card */}
                    <img
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true`}
                        alt="Top Languages"
                        className="w-full"
                    />
                </CardContent>
            </AnimatedCard>

            {/* GitHub Activity Section */}
            <AnimatedCard delay={0.3}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Contribution Graph
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <img
                        src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=github-compact&hide_border=true`}
                        alt="Contribution Graph"
                        className="w-full"
                    />
                </CardContent>
            </AnimatedCard>

            {/* Contact Section */}
            <AnimatedCard delay={0.4}>
                <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="hover:text-primary transition-colors"
                    >
                        <Mail className="h-5 w-5" />
                    </a>
                    <a
                        href={CONTACT_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href={CONTACT_INFO.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                </CardContent>
            </AnimatedCard>
        </div>
    );
}