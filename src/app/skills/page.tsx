import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { name: "React", level: "Advanced" },
            { name: "TypeScript", level: "Advanced" },
            { name: "HTML/CSS", level: "Expert" },
            { name: "Next.js", level: "Intermediate" },
            { name: "Tailwind", level: "Advanced" },
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", level: "Advanced" },
            { name: "Express", level: "Advanced" },
            { name: "MongoDB", level: "Intermediate" },
            { name: "PostgreSQL", level: "Intermediate" },
            { name: "REST API", level: "Expert" },
        ]
    },
    {
        title: "Tools & Others",
        skills: [
            { name: "Git", level: "Advanced" },
            { name: "Docker", level: "Intermediate" },
            { name: "AWS", level: "Intermediate" },
            { name: "Linux", level: "Advanced" },
            { name: "CI/CD", level: "Intermediate" },
        ]
    }
];

const getLevelColor = (level: string) => {
    switch (level) {
        case "Expert":
            return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
        case "Advanced":
            return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
        case "Intermediate":
            return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
        default:
            return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
};

export default function Skills() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Skills</h1>
                <p className="text-muted-foreground">Technologies and tools I work with</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category) => (
                    <Card key={category.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <Badge 
                                        key={skill.name} 
                                        variant="secondary"
                                        className={`${getLevelColor(skill.level)} cursor-default transition-colors`}
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4 justify-end text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                        Expert
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                        Advanced
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">
                        Intermediate
                    </Badge>
                </div>
            </div>
        </div>
    );
}