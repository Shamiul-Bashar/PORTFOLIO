import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    id: "crisismesh-web",
    slug: "crisismesh-web",
    title: "CrisisMesh 2.0 — Emergency Routing Simulator",
    category: "Software",
    status: "Completed",
    year: "2026",
    role: "Team Academic Project",
    shortDescription:
      "A DSA-driven emergency coordination simulator with a C++17 decision engine and an interactive React/TypeScript interface for incident dispatch, graph traversal, routing and resource allocation.",
    overview:
      "CrisisMesh 2.0 models emergency reporting and response coordination on a changing fictional road network. The authoritative C++17 simulation engine connects manual data structures and graph algorithms to responder selection, shortest-path analysis, road blocking, rerouting and incident history. A React/TypeScript frontend visualizes the workflow. This is an academic simulator, not an operational emergency service.",
    technologies: ["C++17", "React", "TypeScript", "Vite", "Node.js", "BFS", "DFS", "Dijkstra", "Graph Algorithms"],
    features: [
      "Two operational experiences: Author emergency operations and Citizen reporting",
      "C++17 decision engine with manual queue, heaps, stack, hash table, linked list and AVL tree",
      "BFS, DFS and weighted Dijkstra routing with a manual min heap",
      "Dynamic road blocking, automatic rerouting and responder analysis",
      "Interactive tactical map, algorithm playback and resource monitoring",
      "Citizen incident tracking, status history and resolution confirmation",
    ],
    // The original source repository is private. Public visitors should use the live demo.
    githubUrl: null,
    liveDemoUrl: "https://crisis-mesh-2-0-dynamic-emergency-d.vercel.app",
    reportUrl: null,
    coverImage: null,
    gallery: [],
    featured: true,
  },
  {
    id: "crisismesh-console",
    slug: "crisismesh-console",
    title: "CrisisMesh 2.0 — Console Edition",
    category: "Software",
    status: "Completed",
    year: "2026",
    role: "Team Academic Project",
    shortDescription:
      "A complete C++17 console-based emergency routing and resource-allocation simulator built around custom data structures, graph algorithms and persistent incident workflows.",
    overview:
      "The Console Edition demonstrates practical Data Structures & Algorithms through incident intake, priority scheduling, responder analysis, Dijkstra routing, road-block undo, messaging and archived history. Two portals support user reporting and author-side emergency operations. The compact city graph includes 20 locations and 31 bidirectional roads.",
    technologies: ["C++17", "CMake", "Graph", "BFS", "DFS", "Dijkstra", "Min Heap", "Max Heap", "AVL Tree", "Hash Table"],
    features: [
      "User and Author portals for reporting and incident operations",
      "Custom queue, heaps, stack, arrays, linked lists, hash tables and AVL tree",
      "Incident Analysis with BFS, DFS, Dijkstra and responder comparison",
      "Road blocking with LIFO undo and dynamic rerouting",
      "Incident priority processing and resource allocation",
      "Persistent users, incident snapshots and activity history",
    ],
    githubUrl: "https://github.com/Shamiul-Bashar/Console-Based-CrisisMesh-2.0-Dynamic-Emergency-Decision-Routing-Resource-Allocation-Simulator",
    liveDemoUrl: null,
    reportUrl: "https://drive.google.com/drive/folders/1ErkPV8-4aiAVR5JvIc1allIC3IkZYNHu?usp=drive_link",
    coverImage: null,
    gallery: [],
    featured: true,
  },
  {
    id: "28-bit-cpu",
    slug: "28-bit-cpu",
    title: "28-Bit Microprogrammed CPU with Booth Multiplier",
    category: "Hardware",
    status: "Completed",
    year: "2026",
    role: "Team Academic Project",
    shortDescription:
      "A functioning 28-bit processor designed in Logisim, featuring microprogrammed control, an integrated ALU, 11 instructions and an iterative Booth multiplier.",
    overview:
      "This Logisim computer-architecture project implements a 28-bit accumulator-oriented CPU with a ROM-based microprogrammed Control Unit, memory interface, reusable arithmetic/logic hardware and integrated 28 × 28 Booth multiplication. The instruction set supports arithmetic, logic, memory transfer, branching, increment/decrement, multiplication and halt.",
    technologies: ["Logisim", "Computer Architecture", "Microprogramming", "Digital Logic", "ALU", "Booth's Algorithm"],
    features: [
      "28-bit CPU datapath with PC, MAR, MBR, IR and accumulator",
      "64 × 7 control ROM and 6-bit micro-sequence counter",
      "11 machine instructions with 4-bit opcodes",
      "Reusable ALU for arithmetic, logical operations, INC and DEC",
      "Integrated iterative 28 × 28 Booth multiplier with 56-bit product",
      "Memory-reference instruction fetch, decode, execute and write-back",
    ],
    githubUrl: "https://github.com/Shamiul-Bashar/28-BIT-CPU",
    liveDemoUrl: null,
    reportUrl: null,
    coverImage: null,
    gallery: [],
    featured: true,
  },
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

    gallery: [
      {
        image: "/assets/projects/project hydro smart/gallery-00.png",
        title: "HydroSmart Gateway – Secure Authentication Portal",
        description:
          "This is the primary login interface for the HydroSmart system. Built with a clean Command-Line Interface (CLI), it ensures secure access through an Admin Login portal. The screen features essential utility options, including a Forget Password function for credential recovery and a straightforward navigation menu. Its minimalist design focuses on user efficiency and system security, providing a professional entry point for managing the smart water grid infrastructure."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-01.png",
        title: "Main Admin Dashboard – Central Command Center",
        description:
          "The Main Admin Dashboard (v1.5) serves as the core management hub for the smart water grid. This comprehensive interface allows administrators to oversee all critical operations, from zone inventory management and demand analysis to real-time flow monitoring and leakage detection. With specialized features like seasonal supply management and maintenance logging, it provides a high-level overview of system health and performance, ensuring efficient resource distribution across the entire network."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-02.png",
        title: "Zone Inventory & Technical Specification Report",
        description:
          "This screen provides a detailed technical breakdown of specific zones within the grid, such as Daulatpur and Shiromoni. It showcases key hydraulic metrics, including flow velocity and daily water demand. The report displays an organized inventory of infrastructure components—like straight pipes, bends, and T-shapes—alongside their physical dimensions and installation dates. This granular data is essential for auditing hardware and ensuring infrastructure meets specific area requirements.."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-03.png",
        title: "Comparative Water Demand & Supply Analysis",
        description:
          "This screen presents a critical side-by-side analytical report of water usage across multiple administrative zones. It categorizes data into two primary sections: the Water Demand Analysis and the Water Supply Analysis. By displaying precise Liter-per-Day (L/Day) metrics for specific areas like Daulatpur and Boyra, the system enables administrators to identify discrepancies between required consumption and actual distribution, facilitating data-driven decisions for grid optimization.."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-04.png",
        title: "Seasonal Supply Optimization Module",
        description:
          "This interface handles dynamic water distribution based on seasonal demand fluctuations. It utilizes specific multipliers (e.g., x1.8 for Summer, x0.8 for Winter) to adjust supply levels automatically. This feature allows the grid to remain resilient during high-heat periods or monsoon surges while conserving resources during cooler months. By integrating environmental variables into the management logic, the system ensures equitable and efficient water allocation year-round."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-05.png",
        title: "Optimized Seasonal Demand Generation",
        description:
          "This screen displays the result of the seasonal optimization logic applied specifically to the Summer  period. It generates an updated demand table for all zones, reflecting the calculated increase in water requirements. A key feature shown here is the data persistence layer; the system confirms that the optimized demand values have been successfully saved to the grid_data.txt file. This ensures that the analytical results are archived and accessible for future system operations."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-06.png",
        title: "Real-Time Water Flow Monitoring Dashboard",
        description:
          "This dashboard provides a live overview of the hydraulic status across various grid zones. It monitors water flow velocity in meters per second (m/s) and instantly categorizes the health of each area using status indicators like NORMAL or LOW PRESSURE. This real-time visibility allows operators to pinpoint specific locations—such as Daulatpur or Khulna Sadar—that may require immediate attention, ensuring consistent service delivery and operational stability across the entire network."
      },
          {
        image: "/assets/projects/project hydro smart/gallery-07.png",
        title: "Zone-Wise Leakage & System Integrity Report",
        description:
          "This sophisticated analytical report provides a realistic assessment of water loss across the grid. By comparing supply versus demand metrics, the system calculates precise leakage percentages for every area. High-risk zones are flagged with a CRITICAL status, enabling rapid response to infrastructure failures. The report also aggregates data into Zone Totals, offering a macro-level view of system efficiency and helping prioritize repairs to minimize resource wastage."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-08.png",
        title: "Detailed Pipe-Wise Leakage & Efficiency Breakdown",
        description:
          "This screen offers a deep dive into the hydraulic efficiency of specific area infrastructures. It breaks down water supply by pipe types—such as Straight, Bend, or T-Shape—assigning specific efficiency percentages to each. By calculating the supply contribution of individual components, the system identifies where resource loss occurs. This granular data allows for precision engineering, helping administrators determine exactly which segments require maintenance or replacement."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-09.png",
        title: "System Balance & Grid Stability Menu",
        description:
          "This interface provides access to the high-level financial and operational equilibrium of the water grid. It allows administrators to toggle between an Overall Grid Balance Summary, which calculates total supply versus demand and assigns a grid status score, and a detailed Zone-wise Balance Status for tracking localized losses. This module is critical for maintaining the sustainability of the smart water grid, ensuring that resources are balanced effectively across the entire network."
      },
      {
        image: "/assets/projects/project hydro smart/gallery-10.png",
        title: "Overall Grid Balance & Health Summary",
        description:
          "This screen provides a high-level executive summary of the entire water grid's performance. It calculates the total water deficit by comparing supply against demand, generating a Balance Score and a Grid Health percentage. The interface uses a logic-based status legend to classify the system state as STABLE, UNDER STRESS, or CRITICAL. This diagnostic tool is vital for identifying severe shortages, as seen in the Immediate action required! alert, ensuring rapid administrative intervention."
      },
      {
        image: "/assets/projects/project hydro smart/galley-11.png",
        title: "Chronological System Event Ledger",
        description:
          "This screen provides a high-level executive summary of the entire water grid's performance. It calculates the total water deficit by comparing supply against demand, generating a Balance Score and a Grid Health percentage. The interface uses a logic-based status legend to classify the system state as STABLE, UNDER STRESS, or CRITICAL. This diagnostic tool is vital for identifying severe shortages, as seen in the Immediate action required! alert, ensuring rapid administrative intervention."
      }
    ],

    featured: true
  },

  {
    id: "fpga-game",
    slug: "fpga-game",
    title: "FPGA Random Number Guessing Game",
    category: "Embedded Systems",
    status: "Completed",
    year: "2026",
    role: "Team Academic Project",

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

    gallery: [
      {
        image: "/assets/projects/project fpga/gallery-01.jpg",
        title: "Logical Architecture and Decision-Making Flow of an FPGA Game Engine",
        description:
          "This flowchart maps the 6-state FSM for a hardware-native game on the Basys 3 board. Key features include:Initialization: Resets scores and generates a secret number via LFSR.Scoring: Logic handles multi-player turns and conditional scoring (+2 for individual, +1 for both).Automation: Detects draw conditions and triggers auto-restarts without a CPU."
      },
      {
        image: "/assets/projects/project fpga/gallery-02.jpg",
        title: "RTL Design and Hardware Implementation on Basys 3 FPGA",
        description:
          "This image captures the real-world implementation of my hardware-native game engine. Shown is the Verilog HDL code being synthesized in the Xilinx Vivado IDE and deployed onto the Basys 3 (Artix-7) FPGA board. The 7-segment display and onboard LEDs provide real-time feedback, demonstrating the successful bridge between digital logic design and physical hardware execution at a synchronous 100 MHz clock frequency."
      },
     
    ],

    featured: false
  }
];