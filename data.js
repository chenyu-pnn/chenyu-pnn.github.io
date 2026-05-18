/* ============================================================
   PORTFOLIO DATA
   Edit this file to update all site content.
   ============================================================ */
const PORTFOLIO = {
  name:        "CHENYU PAN",
  role:        "Electrical Engineer · Hardware Engineer",
  bio:         "Building systems designed for the end-user. Interested in high-speed transmission and communications hardware, with experience working on major infrastructure projects.",
  email:       "chenyu.pan@uwaterloo.ca",
  linkedin:    "https://linkedin.com/in/chenyu-pan",
  resume:      "/resume.pdf",

  education: [
    { degree: "B.A.Sc in Electrical Engineering", school: "University of Waterloo", year: "2030" },
  ],

  experience: [
    {
      logoImg: "/images/logos/wsp.png",   /* ← path to logo image e.g. "logos/wsp.png" — leave empty to show initials */
      title: "Systems Engineering Intern",
      org:   "WSP Canada",
      dates: "Jan 2026 – Apr 2026",
      blurb: "Leading development of next-generation neural interface systems with focus on real-time adaptive algorithms.<br>Architected distributed compute pipelines reducing latency by 340 ms across 12 deployed edge nodes."
    },
    {
      logoImg: "/images/logos/warg.jpg",   /* ← path to logo image e.g. "logos/warg.png" */
      title: "Electrical Team Member",
      org:   "Waterloo Aerial Robotics Group",
      dates: "Sep 2025 – Present",
      blurb: "Designed and deployed transformer-based models for autonomous decision systems in high-stakes environments.<br>Reduced model inference time by 67% through quantization and custom CUDA kernel optimization."
    },
    {
      logoImg: "/images/logos/vaughan.jpg",   /* ← path to logo image e.g. "logos/vaughan.png" */
      title: "Data and Technology Intern",
      org:   "City of Vaughan",
      dates: "Sep 2024 – Jan 2025",
      blurb: "Investigated adversarial robustness in deep learning systems under Prof. Chen's Intelligent Systems group.<br>Co-authored 2 papers on certified defenses; codebase adopted by 3 external research groups."
    }
  ],

  projects: [
    {
      id: "qr_flyback",
      link:        "",   /* ← repo / report URL — leave empty to hide button */
      linkLabel:   "VIEW REPORT",   /* ← "VIEW REPORT" or "VIEW REPOSITORY" */
      title:       "Quasi-Resonant Flyback Power Converter",
      tags:        "Altium · LTSpice · SIMPLIS",
      year:        "2026",
      glb:         "models/QR_Flyback.glb",   /* place file here or remove key to use fallback */
      blurb:       "108-132 VAC mains power conversion system, with support up to 60W constant voltage at 92% efficiency.",
      bullets: [
        "Sparse voxel octree reduces GPU memory 10× vs. dense NeRF with <0.2 dB PSNR loss",
        "Custom CUDA marching-cubes traversal skips empty space 50× faster than naive ray march",
        "Latent-space scene editor allows real-time object insertion and material editing",
        "Ships as a WebGL viewer; no plugin required — runs at 60 fps on any WebGPU-capable browser",
        "Deployed in 3 commercial AR authoring pipelines"
      ],
    },
    {
      id: "dualmotor_diff",
      link:        "https://docs.google.com/document/d/17eFXE2pDXYrOa5-fzo73zOoxpoJE_sFCMHbBddb3Q9g/edit?usp=sharing",
      linkLabel:   "VIEW REPORT",   /* ← "VIEW REPORT" or "VIEW REPOSITORY" */
      title:       "Dual-Motor Differential Drive Controller",
      tags:        "Altium · LTSpice",
      year:        "2025",
      glb:         "models/quantum-sim.glb",
      blurb:       "2-in-1 brushless DC motor controller board featuring an IMU, MicroSD, CAN, UART, and hall sensing telemetry; up to 16A total.",
      bullets: [
        "Hybrid Clifford + stabilizer representation handles up to 32 qubits without state-vector blowup",
        "Custom noise channels calibrated against real IBM Quantum hardware decoherence profiles",
        "CUDA-accelerated matrix exponentiation; 8× speedup over NumPy baseline on RTX 3090",
        "Full Qiskit backend compatibility — drop-in replacement for existing circuits",
        "Open-sourced; 400+ GitHub stars, used by 5 academic groups"
      ],
    },
    {
      id: "hawkeye_fc",
      link:        "",
      title:       "HawkEye – Quadcopter Flight Controller",
      tags:        "KiCad",
      year:        "WIP",
      glb:         "models/tactile-net.glb",
      blurb:       "Comprehensive STM32-and-ESP32-based flight controller with redundant IMUs, a barometer, flash memory, ExpressLRS RF, and full peripheral expansion; designed for 4-in-1 ESCs.",
      bullets: [
        "1024-taxel resistive array at 2 mm pitch; 0.8 ms full-scan latency via custom FPGA readout",
        "Convolutional tactile network classifies 50 material categories at 99.2% top-1 accuracy",
        "Real-time slip detection at 500 Hz prevents object drops during in-hand manipulation",
        "ROS2 driver published as open-source; integrated with MoveIt2 gripper planning stack",
        "Validated on Franka Panda over 10,000 grasps; 0.4% drop rate vs 7% baseline"
      ],
    },
    {
      id: "hrvita",
      link:        "",
      title:       "HRVita – Wrist-Wearable Delirium Screener",
      tags:        "ESP32 · C++",
      year:        "2025",
      images:      ["images/hrvita/1.png", "images/hrvita/2.jpg", "images/hrvita/3.png"],
      galleryGrid: true,
      blurb:       "Wrist-worn device that passively monitors HRV and SpO2 to screen for early-onset delirium using statistical modelling.",
      bullets: [
        "MAX30105 optical sensor + ESP32-S3 captures PPG at 100 Hz with < 2% RMS noise floor",
        "On-device HRV feature extraction (SDNN, RMSSD, LF/HF ratio) runs in under 4 ms per window",
        "Logistic regression delirium classifier achieves 87% sensitivity, 91% specificity on hold-out set",
        "BLE data stream to companion iOS app; 72 h battery life on 180 mAh LiPo",
        "Validated in 3-site clinical pilot; now under IRB review for expanded cohort"
      ],
    },
    {
      id: "pwebsite",
      link:        "",
      title:       "Personal Website",
      tags:        "HTML · CSS · JavaScript · Three.js",
      year:        "2026",
      images:      ["images/blank.png", "images/blank.png", "images/blank.png"],
      galleryGrid: true,
      blurb:       "Wrist-worn device that passively monitors HRV and SpO2 to screen for early-onset delirium in post-operative patients. Clinical pilot across 3 hospital sites.",
      bullets: [
        "MAX30105 optical sensor + ESP32-S3 captures PPG at 100 Hz with < 2% RMS noise floor",
        "On-device HRV feature extraction (SDNN, RMSSD, LF/HF ratio) runs in under 4 ms per window",
        "Logistic regression delirium classifier achieves 87% sensitivity, 91% specificity on hold-out set",
        "BLE data stream to companion iOS app; 72 h battery life on 180 mAh LiPo",
        "Validated in 3-site clinical pilot; now under IRB review for expanded cohort"
      ],
    }
  ],

  publications: [
    {
      id: 1, thumbVenue: "NeurIPS", thumbColor: "#ff8200",
      url:        "#",   /* ← paste your Medium / paper URL here */
      title:      "PAM4 vs. NRZ Signaling for Intra-Data-Centre Interconnects: Signal Integrity, System Tradeoffs, and Application Boundaries",
      shortTitle: "PAM4 vs. NRZ Signaling for Intra-Data-Centre Interconnects",
      authors:    "Pan, C.",
      venue:      "Whitepaper", year: "2027",
      blurb:      "Novel tight certification bounds for L∞ adversarial perturbations using adaptive noise distributions at scale. Achieves SOTA certified accuracy on ImageNet-1k; 3× throughput over prior methods.",
      abstract:   "We present a scalable framework for certifying adversarial robustness under L∞ perturbations using a novel adaptive randomized smoothing approach. Our method introduces an anisotropic noise distribution that tightly follows the decision boundary geometry, yielding certification bounds up to 2.4× tighter than isotropic baselines. We further propose a parallelized Monte Carlo estimator that achieves 3× inference throughput on modern GPU clusters. Evaluated on ImageNet-1k with ResNet-50 and ViT-L/16, our method sets new state-of-the-art certified accuracy under the full-resolution benchmark.",
      keywords:   ["Adversarial Robustness", "Certified Defense", "Randomized Smoothing", "Deep Learning", "Computer Vision"],
      links:      { pdf: "#", code: "#", slides: "#" }
    }
  ]
};
