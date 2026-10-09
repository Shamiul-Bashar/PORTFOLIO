import type { ProfileData } from "@/types/profile";

export const profile: ProfileData = {
  fullName: "MD. SHAMIUL BASHER SIAM",
  displayName: "Shamiul Basher Siam",

  titles: [
    "Computer Science & Engineering Student",
    "Aspiring Software Engineer",
    "Problem Solver & Tech Enthusiast",
  ],

  tagline:
    "Engineering Reliable Software Through Curiosity, Logic & Continuous Learning",

  heroIntro:
    "I'm a Computer Science & Engineering student at Khulna University of Engineering & Technology (KUET), passionate about software engineering, problem solving, and building modern digital experiences. I enjoy transforming ideas into reliable, user-focused applications while continuously exploring new technologies and improving my development skills.",

  aboutParagraphs: [
    "I'm currently pursuing a Bachelor of Science in Computer Science & Engineering at Khulna University of Engineering & Technology (KUET). My primary interests include software engineering, algorithms, system design, and building scalable applications that solve real-world problems.",

    "Beyond academics, I actively explore modern web technologies, programming languages, digital logic, and embedded systems. I enjoy understanding both software and hardware because strong engineering comes from knowing how systems work together.",

    "Originally from Kushtia and currently living on the KUET campus, I believe consistency, curiosity, and continuous learning are the keys to becoming an excellent software engineer. Every project I build is another step toward that goal.",
  ],

  quickFacts: [
    { label: "Name", value: "MD. SHAMIUL BASHER SIAM" },
    { label: "Nationality", value: "Bangladeshi" },
    { label: "Current Degree", value: "Bachelor of Science" },
    { label: "Department", value: "Computer Science & Engineering" },
    {
      label: "University",
      value: "Khulna University of Engineering & Technology",
    },
    { label: "Career Goal", value: "Software Engineer" },
    { label: "Permanent Location", value: "Kushtia" },
    { label: "Present Location", value: "KUET, Khulna" },
  ],

  hobbies: [
    "Football",
    "Cricket",
    "Table Tennis",
  ],

  location: {
    present: "KUET Campus, Khulna",
    permanent: "Kushtia Sadar, Kushtia-7000",
  },

  // Resume
  cvUrl:
    "https://drive.google.com/uc?export=download&id=1JRXVwAh7rpnf1wtL3NXK8nPdaKOLAgBx",

  // Images
  profileImageSrc: "/assets/profile/profile.jpg",
  aboutImageSrc: "/assets/profile/about.webp",
  coverImageSrc: "/assets/profile/cover.webp",
};