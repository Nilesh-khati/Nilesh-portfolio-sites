"use client"

import { motion } from "framer-motion"

// Tech logos organized by importance
// Primary/Important technologies (bigger, more visible, on top)
const primaryLogos = [
    {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "#E34F26"
    },
    {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "#1572B6"
    },
    {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "#F7DF1E"
    },
    {
        name: "React.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "#61DAFB"
    },
    {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933"
    },
    {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "#47A248"
    },
    {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        color: "#06B6D4"
    },
    {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "#FFFFFF"
    },
]

// Secondary technologies (smaller, less prominent, in background)
const secondaryLogos = [
    {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        color: "#4479A1"
    },
    {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "#F05032"
    },
    {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        color: "#FFFFFF"
    },
    {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        color: "#7952B3"
    },
    {
        name: "jQuery",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
        color: "#0769AD"
    },
    {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        color: "#007ACC"
    },
    {
        name: "Postman",
        icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        color: "#FF6C37"
    },
    {
        name: "Vercel",
        icon: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
        color: "#FFFFFF"
    },
    {
        name: "Netlify",
        icon: "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg",
        color: "#00C7B7"
    },
    {
        name: "Heroku",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
        color: "#430098"
    },
]

export default function FloatingTechLogos() {
    // Positions for primary (important) logos - more prominent areas, avoiding center
    const primaryPositions = [
        { top: "12%", left: "8%", delay: 0, duration: 18 },
        { top: "18%", left: "85%", delay: 0.8, duration: 20 },
        { top: "35%", left: "6%", delay: 1.5, duration: 19 },
        { top: "40%", left: "90%", delay: 0.5, duration: 21 },
        { top: "58%", left: "10%", delay: 2, duration: 18 },
        { top: "65%", left: "87%", delay: 1.2, duration: 22 },
        { top: "78%", left: "12%", delay: 1.8, duration: 20 },
        { top: "82%", left: "83%", delay: 0.3, duration: 19 },
    ]

    // Positions for secondary logos - keep away from center (30-70% width)
    const secondaryPositions = [
        { top: "8%", left: "20%", delay: 0.5, duration: 22 },
        { top: "15%", left: "75%", delay: 1.5, duration: 20 },
        { top: "25%", left: "15%", delay: 2.2, duration: 21 },
        { top: "30%", left: "80%", delay: 0.8, duration: 19 },
        { top: "48%", left: "5%", delay: 1.8, duration: 23 },
        { top: "52%", left: "92%", delay: 1, duration: 18 },
        { top: "68%", left: "18%", delay: 2.5, duration: 20 },
        { top: "72%", left: "78%", delay: 0.2, duration: 22 },
        { top: "88%", left: "25%", delay: 1.3, duration: 21 },
        { top: "90%", left: "70%", delay: 2.8, duration: 19 },
    ]

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary/Important Logos - Highly visible */}
            {primaryLogos.map((tech, index) => {
                const position = primaryPositions[index % primaryPositions.length]
                return (
                    <motion.div
                        key={`primary-${tech.name}`}
                        className="absolute pointer-events-auto z-20"
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.6, 0.85, 0.6],
                            scale: [0.95, 1.05, 0.95],
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: position.duration,
                            repeat: Infinity,
                            delay: position.delay,
                            ease: "easeInOut",
                        }}
                    >
                        <motion.div
                            className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center rounded-xl p-2.5 cursor-pointer"
                            style={{
                                background: `radial-gradient(circle at center, ${tech.color}50, ${tech.color}25, transparent)`,
                                boxShadow: `0 0 30px ${tech.color}70, 0 0 50px ${tech.color}40, inset 0 0 20px ${tech.color}20`,
                                backdropFilter: "blur(6px)",
                                border: `1.5px solid ${tech.color}40`,
                            }}
                            whileHover={{
                                scale: 1.5,
                                opacity: 1,
                                boxShadow: `0 0 40px ${tech.color}90, 0 0 70px ${tech.color}60`,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-full h-full object-contain pointer-events-none"
                                style={{
                                    filter: `drop-shadow(0 0 12px ${tech.color}80) brightness(1.3) contrast(1.1)`,
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )
            })}

            {/* Secondary Logos - Moderately visible */}
            {secondaryLogos.map((tech, index) => {
                const position = secondaryPositions[index % secondaryPositions.length]
                return (
                    <motion.div
                        key={`secondary-${tech.name}`}
                        className="absolute pointer-events-auto z-[15]"
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.35, 0.55, 0.35],
                            scale: [0.9, 1, 0.9],
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: position.duration,
                            repeat: Infinity,
                            delay: position.delay,
                            ease: "easeInOut",
                        }}
                    >
                        <motion.div
                            className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg p-2 cursor-pointer"
                            style={{
                                background: `radial-gradient(circle at center, ${tech.color}40, ${tech.color}20, transparent)`,
                                boxShadow: `0 0 20px ${tech.color}50, 0 0 35px ${tech.color}30`,
                                backdropFilter: "blur(4px)",
                                border: `1px solid ${tech.color}35`,
                            }}
                            whileHover={{
                                scale: 1.5,
                                opacity: 1,
                                boxShadow: `0 0 40px ${tech.color}90, 0 0 70px ${tech.color}60`,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-full h-full object-contain pointer-events-none"
                                style={{
                                    filter: `drop-shadow(0 0 8px ${tech.color}60) brightness(1.2) contrast(1.05)`,
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}
