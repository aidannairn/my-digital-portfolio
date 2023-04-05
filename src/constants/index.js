import {
  mobile,
  backend,
  creator,
  web,
  carrent,
  jobit,
  tripguide
} from "../assets"

const mediaBucket = import.meta.env.VITE_MEDIA_BUCKET

const tech = `${mediaBucket}/technologies`
const education = `${mediaBucket}/education`

const css = `${tech}/css.svg`
const docker = `${tech}/docker.svg`
const git = `${tech}/git.svg`
const html = `${tech}/html.svg`
const javascript = `${tech}/javascript.svg`
const mongodb = `${tech}/mongodb.svg`
const nodejs = `${tech}/nodejs.svg`
const reactjs = `${tech}/reactjs.svg`
const tailwind = `${tech}/tailwind.svg`
const typescript = `${tech}/typescript.svg`
const threejs = `${tech}/threejs.svg`
const python = `${tech}/python.svg`
const graphql = `${tech}/graphql.svg`
const mysql = `${tech}/mysql.svg`
const aws = `${tech}/aws.svg`
const express = `${tech}/express.svg`
const googleCloud = `${tech}/google-cloud.svg`
const cProgrammingLang = `${tech}/c-programming-language.svg`
const cPlusPlus = `${tech}/c-plus-plus.svg`
const django = `${tech}/django.svg`
const nextJS = `${tech}/nextjs.svg`
const github = `${tech}/github.svg`
const affinity = `${tech}/affinity.svg`

const harvard = `${education}/harvard.svg`
const devAcademy = `${education}/dev-academy.png`
const missionReady = `${education}/mission-ready.png`

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
]

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Mobile Web Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
]

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Graph QL",
    icon: graphql,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Express",
    icon: express,
  },
  {
    name: "Amazon Web Services",
    icon: aws,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Google Cloud",
    icon: googleCloud,
  },
  {
    name: "C Programming Language",
    icon: cProgrammingLang,
  },
  {
    name: "C++",
    icon: cPlusPlus,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "Next JS",
    icon: nextJS,
  },
  {
    name: "GitHub",
    icon: github,
  },
  {
    name: "Affinity",
    icon: affinity,
  },
]

const experiences = [
  {
    title: "CS50's Introduction to Computer Science",
    company_name: "Harvard University",
    icon: harvard,
    // iconBg: "#383E56",
    period: "Oct 2022 - Dec 2022",
    points: [
      "Learn C to develop a deep understanding of what goes on “under the hood” of many of the more modern programming languages we see today.",
      "Learn how to think algorithmically and solve problems efficiently.",
      "Understand concepts such as abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering and web development.",
      "Apply these fundamentals into large scale projects.",
    ],
  },
  {
    title: "National Certificate in Technology Product Development Essentials\n\nNational Certificate in Technology Product Solutions",
    company_name: "Mission Ready",
    icon: missionReady,
    period: "May 2022 - Oct 2022",
    points: [
      "Analyse and select best fit solutions of existing and upcoming technologies in order to develop a technology product solution.",
      "Apply broad technical knowledge to develop a technology product solution.",
      "Apply security and technology product development best practices to deliver quality outcome in the context of practice.",
      "Apply Agile software delivery and design thinking practices to contribute to the development of digital technology product solutions in specific contexts of practice.",
      "Apply industry standard best practices to contribute to the development of digital technology product solutions in specific contexts of practice.",
      "Apply ethical decision-making principles when contributing to developing digital technology product solutions.",
    ],
  },
  {
    title: "Full Stack Web Development Bootcamp",
    company_name: "Dev Academy",
    icon: devAcademy,
    period: "Nov 2016 - Apr 2017",
    points: [
      "Create websites using HTML, CSS and JavaScript.",
      "Use Git and GitHub to track changes to files and store them.",
      "Manage conflict in teams, conflict prevention and resolution.",
    ],
  },
]

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
]

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
]

export { services, technologies, experiences, testimonials, projects }