"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { HTMLAttributes } from "react";

interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
    delay?: number;
}

export function AnimatedCard({ children, delay = 0, className, ...props }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className={className} {...props}>{children}</Card>
        </motion.div>
    );
} 