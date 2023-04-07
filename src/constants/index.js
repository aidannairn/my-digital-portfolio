import {
  mobile,
  backend,
  creator,
  web,
} from "../assets"

const mediaBucket = import.meta.env.VITE_MEDIA_BUCKET

const techBucket = `${mediaBucket}/technologies`
const eduBucket = `${mediaBucket}/education`
const projectsBucket = `${mediaBucket}/projects`
const iconsBucket = `${mediaBucket}/icons`

const css = `${techBucket}/css.svg`
const docker = `${techBucket}/docker.svg`
const git = `${techBucket}/git.svg`
const html = `${techBucket}/html.svg`
const javascript = `${techBucket}/javascript.svg`
const mongodb = `${techBucket}/mongodb.svg`
const nodejs = `${techBucket}/nodejs.svg`
const reactjs = `${techBucket}/reactjs.svg`
const tailwind = `${techBucket}/tailwind.svg`
const typescript = `${techBucket}/typescript.svg`
const threejs = `${techBucket}/threejs.svg`
const python = `${techBucket}/python.svg`
const graphql = `${techBucket}/graphql.svg`
const mysql = `${techBucket}/mysql.svg`
const aws = `${techBucket}/aws.svg`
const express = `${techBucket}/express.svg`
const googleCloud = `${techBucket}/google-cloud.svg`
const cProgrammingLang = `${techBucket}/c-programming-language.svg`
const cPlusPlus = `${techBucket}/c-plus-plus.svg`
const django = `${techBucket}/django.svg`
const nextJS = `${techBucket}/nextjs.svg`
export const github = `${techBucket}/github.svg`
const affinity = `${techBucket}/affinity.svg`

const harvard = `${eduBucket}/harvard.svg`
const devAcademy = `${eduBucket}/dev-academy.png`
const missionReady = `${eduBucket}/mission-ready.png`

export const chainLink = `${iconsBucket}/chain_link.svg`

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
    name: "Insure A Vehicle",
    description:
      "A mock project I collaborated on with two other talented developers. Together we created a landing page and a detailed form that steps the user through how to insure their vehicle.",
    tags: [
      {
        name: "React",
      },
      {
        name: "TypeScript",
      },
      {
        name: "CSS",
      },
    ],
    image: projectsBucket + '/vehicle-insurance/vehicle_insurance-home.png',
    links: ["https://github.com/aidannairn/insure-a-vehicle"],
  },
  {
    name: "AI Vehicle Search",
    description:
      "An experimental project where the user can upload an image of a vehicle to the browser and the application uses Machine Learning to find similar vehicles that match the make or type of vehicle.",
    tags: [
      {
        name: "Google Cloud",
      },
      {
        name: "AutoML Vision",
      },
    ],
    image: projectsBucket + '/vehicle-finder-ai/vehicle_finder_ai.png',
    links: ["https://github.com/aidannairn/ai-vehicle-finder"],
  },
  {
    name: "LevelUp Works",
    description:
      "Provide a Learning Management System (LMS) for school teachers to deliver the Digital Technologies curriculum (specifically, to deliver classes to learn programming) in an easy way.",
    tags: [
      {
        name: "JavaScript",
      },
      {
        name: "React",
      },
      {
        name: "NodeJS",
      },
      {
        name: "MySql",
      },
    ],
    image: projectsBucket + '/level-up-works/level_up_works.png',
    links: [
      'https://github.com/aidannairn/level-up-works--frontend',
      'https://github.com/aidannairn/level-up-works--backend'
    ],
  },
  {
    name: "PB Tech - Laptops",
    description:
      "A team project I was a part of where the developers had the opportunity to work with UX/UI designers. We were tasked with mocking up a redesign of PB Tech's Laptop section.",
    tags: [
      {
        name: "MongoDB",
      },
      {
        name: "GraphQL",
      },
      {
        name: "Apollo",
      },
    ],
    image: projectsBucket + '/pb-tech-laptops/pb_tech_laptops.png',
    links: ['https://github.com/aidannairn/pb-tech-laptops/'],
  },
  {
    name: "Blaze Fitness",
    description:
      "A website for a company that owns gyms in the Bay of Plenty. This application was developed with scalability as a top priority. A new gym can be added with no additional code!",
    tags: [
      {
        name: "[In Development]",
        color: "gold-text-gradient",
      },
      {
        name: "React",
      },
      {
        name: "TypeScript",
      },
      {
        name: "SCSS",
      },
    ],
    image: projectsBucket + '/blaze-fitness/blaze_fitness-landing.png',
  },
]

export { services, technologies, experiences, testimonials, projects }