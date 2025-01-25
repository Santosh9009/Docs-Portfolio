"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fetchFromAPI } from "@/lib/api";
import LoadingState from "./LoadingState";

interface SkillCategory {
    title: string;
    skills: {
        name: string;
        level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    }[];
}

interface SkillsData {
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    languages: string[];
}

export function SkillsGrid() {
    const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await fetchFromAPI("/skills");
                setSkillsData(data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (isLoading) return <LoadingState />;
    if (!skillsData) return <div>No skills data available</div>;

    const skillCategories: SkillCategory[] = [
        {
            title: "Frontend",
            skills: skillsData.frontend.map(skill => ({
                name: skill,
                level: getSkillLevel(skill)
            }))
        },
        {
            title: "Backend",
            skills: skillsData.backend.map(skill => ({
                name: skill,
                level: getSkillLevel(skill)
            }))
        },
        {
            title: "Databases",
            skills: skillsData.databases.map(skill => ({
                name: skill,
                level: getSkillLevel(skill)
            }))
        },
        {
            title: "DevOps & Cloud",
            skills: skillsData.devops.map(skill => ({
                name: skill,
                level: getSkillLevel(skill)
            }))
        },
        {
            title: "Programming Languages",
            skills: skillsData.languages.map(skill => ({
                name: skill,
                level: getSkillLevel(skill)
            }))
        }
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Expert": return "bg-green-500/10 text-green-500";
            case "Advanced": return "bg-blue-500/10 text-blue-500";
            case "Intermediate": return "bg-yellow-500/10 text-yellow-500";
            default: return "bg-gray-500/10 text-gray-500";
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <Badge 
                                            key={skill.name}
                                            className={`${getLevelColor(skill.level)} cursor-default`}
                                        >
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 text-green-500">Expert</Badge>
                    <span>3+ years</span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/10 text-blue-500">Advanced</Badge>
                    <span>2+ years</span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-500/10 text-yellow-500">Intermediate</Badge>
                    <span>1+ year</span>
                </div>
            </div>
        </div>
    );
}

// Helper function to determine skill level
function getSkillLevel(skill: string): "Beginner" | "Intermediate" | "Advanced" | "Expert" {
    const expertSkills = ["JavaScript", "HTML/CSS", "React", "Git"];
    const advancedSkills = ["Next.js", "Node.js", "TypeScript", "MongoDB", "Docker"];
    const intermediateSkills = ["AWS", "PostgreSQL", "Redis", "Kubernetes", "Kafka"];

    if (expertSkills.includes(skill)) return "Expert";
    if (advancedSkills.includes(skill)) return "Advanced";
    if (intermediateSkills.includes(skill)) return "Intermediate";
    return "Intermediate";
} 