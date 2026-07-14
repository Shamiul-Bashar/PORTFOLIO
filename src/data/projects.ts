import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    id: "hydro-smart",
    slug: "hydro-smart",
    title: "HydroSmart – Intelligent Water Grid Management System",
    category: "Software",
    status: "Completed",
    year: "2026",
    role: "Individual Academic Project",
    shortDescription:
      "A modular console-based Water Grid Management System developed in modern C++, demonstrating Object-Oriented Programming, STL, file persistence, runtime polymorphism, and real-time grid health analysis within a scalable software architecture.",

    overview:
      "HydroSmart is a fully interactive Water Grid Management System developed in C++ as an individual academic project at Khulna University of Engineering and Technology (KUET). Built entirely from scratch without external frameworks, the application demonstrates advanced Object-Oriented Programming concepts, modular software architecture, robust file persistence, runtime polymorphism, and STL-driven data management while simulating real-world water distribution operations.",

    technologies: [
      "C++",
      "Object-Oriented Programming",
      "STL",
      "Templates",
      "Exception Handling",
      "File Handling",
      "Operator Overloading",
      "CSV Storage"
    ],

    features: [
      "Runtime polymorphism using GridModule base class",
      "Inheritance and abstraction through abstract classes",
      "STL-based data management using map and vector",
      "Template-based reusable utility functions",
      "Robust exception-safe file handling",
      "Operator overloading for Area merging and output formatting",
      "CSV-based persistent storage",
      "Real-time grid health analysis",
      "OTP-based authentication with account lock protection"
    ],

    githubUrl:
      "https://github.com/Shamiul-Bashar/hydro-smart",

    reportUrl:
      "https://docs.google.com/document/d/1iVcZhEgZxM8fq72W6Ye1nkd8G2H8RmvZ/edit?usp=drive_link&ouid=112896375024836367928&rtpof=true&sd=true",

    liveDemoUrl: null,

    coverImage: null,

    gallery: [],

    featured: true
  },

  {
  id: "fpga-game",
  slug: "fpga-game",
  title: "FPGA Random Number Guessing Game",
  category: "Embedded Systems",
  status: "Completed",
  year: "2026",
  role: "Individual Academic Project",

  shortDescription:
    "A hardware-based two-player random number guessing game implemented in Verilog HDL on the Basys 3 FPGA board, featuring pseudo-random number generation, interactive gameplay, and real-time hardware feedback.",

  overview:
    "The FPGA Random Number Guessing Game is an embedded systems project developed using Verilog HDL on the Basys 3 FPGA platform. The system generates pseudo-random numbers through a Linear Feedback Shift Register (LFSR) and enables two players to compete simultaneously using hardware switches and push buttons. Seven-segment displays and LEDs provide real-time visual feedback, demonstrating practical implementation of digital logic design, sequential circuits, finite state machines, and hardware-based user interaction.",

  technologies: [
    "Verilog HDL",
    "Xilinx Vivado",
    "Basys 3 FPGA",
    "Digital Logic Design",
    "Finite State Machine (FSM)",
    "LFSR",
    "Seven-Segment Display",
    "LED Interface"
  ],

  features: [
    "Pseudo-random number generation using Linear Feedback Shift Register (LFSR)",
    "Two-player simultaneous guessing system",
    "Hardware switch-based user input",
    "Push-button controlled gameplay",
    "Real-time seven-segment display output",
    "LED-based game status indication",
    "Turn-based game flow with automatic winner detection",
    "Reset and replay functionality",
    "Modular Verilog architecture for maintainability"
  ],

  githubUrl:
    "https://github.com/Shamiul-Bashar/hardware-number-guesser",

  reportUrl:
    "https://docs.google.com/document/d/1XE7yeqV570L2M5PPMKwoMV_cYSGOFufN/edit?usp=drive_link&ouid=112896375024836367928&rtpof=true&sd=true",

  liveDemoUrl: null,

  coverImage: null,

  gallery: [],

  featured: false
}
];