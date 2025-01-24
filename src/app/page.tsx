import CodeBlock from "../components/CodeBlock";

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

    return (
        <div className="flex-shrink">
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
        </div>
    );
}
