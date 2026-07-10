const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    hamburgerBtn.classList.toggle("is-open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        hamburgerBtn.classList.remove("is-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
    });
});

/* ---------- EXPERIENCE PAGINATION ---------- */
// Add new experiences at the TOP (most recent first) — numbering counts down automatically.
const experiences = [
    {
        role: "Google Cloud Arcade Facilitator 2026",
        org: "PT Google Cloud Indonesia — Remote",
        date: "JUL 2026 — PRESENT",
        desc: "Re-appointed for a second consecutive term to lead and facilitate the gamified cloud computing and AI scholarship initiative. Mentoring a new cohort of participants by providing technical guidance, hands-on troubleshooting for Google Cloud Platform (GCP) labs, and strategic learning roadmaps. Leveraging prior year experience to optimize module completion rates and foster an engaging community for future cloud professionals.",
    },
    {
        role: "Administrative Staff",
        org: "MIS Fathul Iman — Palangka Raya, Central Kalimantan",
        date: "MAR 2026 — PRESENT",
        desc: "Manage school administration: drafting, filing, and organizing operational documents, and actively contribute to committees for various school activities. Apply an IT background by building the school's profile website and a web-based attendance system using Laravel to support the digitalization of teacher and staff workflows. Use Microsoft Word and Excel extensively for data processing and daily reporting.",
    },
    {
        role: "Google Cloud Arcade Facilitator 2025",
        org: "PT Google Cloud Indonesia — Remote",
        date: "JUL 2025 — SEP 2025",
        desc: "Served as a facilitator for a gamified coding scholarship program in cloud computing and AI, mentoring more than 90 participants. Provided tutorials, guidance, and technical support to help participants complete lab modules and earn digital badges. Developed mentoring and problem-solving skills, along with a deeper understanding of Google Cloud services and artificial intelligence.",
    },
];

const EXPERIENCES_PER_PAGE = 3;
let currentExpPage = 1;
const expList = document.getElementById("expList");
const expPagination = document.getElementById("expPagination");
const totalExpPages = () => Math.max(1, Math.ceil(experiences.length / EXPERIENCES_PER_PAGE));

function renderExperiences() {
    const pages = totalExpPages();
    if (currentExpPage > pages) currentExpPage = pages;

    const start = (currentExpPage - 1) * EXPERIENCES_PER_PAGE;
    const pageItems = experiences.slice(start, start + EXPERIENCES_PER_PAGE);
    const total = experiences.length;

    expList.innerHTML = pageItems
        .map((e, i) => {
            const number = total - (start + i);
            return `
      <div class="exp-card hardbox">
        <div class="exp-index">${String(number).padStart(2, "0")}</div>
        <div class="exp-body">
          <div class="exp-top">
            <div>
              <p class="exp-role">${e.role}</p>
              <p class="exp-org">${e.org}</p>
            </div>
            <div class="exp-date">${e.date}</div>
          </div>
          <p class="exp-desc">${e.desc}</p>
        </div>
      </div>
    `;
        })
        .join("");

    renderExpPaginationControls(pages);
}

function renderExpPaginationControls(pages) {
    if (pages <= 1) {
        expPagination.innerHTML = "";
        return;
    }

    let html = `<button class="page-btn" id="prevExpPage" ${currentExpPage === 1 ? "disabled" : ""}>←</button>`;
    for (let i = 1; i <= pages; i++) {
        html += `<button class="page-btn ${i === currentExpPage ? "active" : ""}" data-exp-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn" id="nextExpPage" ${currentExpPage === pages ? "disabled" : ""}>→</button>`;
    expPagination.innerHTML = html;

    document.getElementById("prevExpPage")?.addEventListener("click", () => {
        currentExpPage--;
        renderExperiences();
    });
    document.getElementById("nextExpPage")?.addEventListener("click", () => {
        currentExpPage++;
        renderExperiences();
    });
    expPagination.querySelectorAll("[data-exp-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentExpPage = parseInt(btn.dataset.expPage, 10);
            renderExperiences();
        });
    });
}

renderExperiences();

/* ---------- PROJECTS PAGINATION ---------- */
// Add new projects here — the grid will paginate automatically.
const projects = [
    {
        name: "MIS Fathul Iman - Profile website and staff attendance system",
        desc: "A modern company profile website and automated staff attendance system built with Laravel, Tailwind CSS, and Filament PHP. It streamlines workforce management with real-time GPS-based check-ins to ensure location accuracy and features automated notification reminders to boost daily attendance compliance.",
        tags: ["Laravel", "Filament", "MySQL"],
        link: "https://misfathuliman-praya.sch.id/",
    },
    {
        name: "Restoran - restaurant food ordering system",
        desc: "A web-based restaurant food ordering system built with Laravel, featuring a comprehensive CRUD framework and integrated PayPal payment gateway. It simplifies restaurant management by providing efficient tools to manage food menus, track customer orders, and secure cashless transactions to streamline daily dining operations.",
        tags: ["Laravel", "Paypal"],
        link: "https://github.com/Obyyyy/restoran",
    },
    {
        name: "Signify API - Bangkit Capstone",
        desc: "This project contains the process of developing Restful API as a complementary feature in the Signify application as part of Bangkit 2023's Product-based Capstone Project.",
        tags: ["Node.js", "REST API", "JWT"],
        link: "https://github.com/Obyyyy/signify-api",
    },
];

const PROJECTS_PER_PAGE = 3;
let currentProjectPage = 1;
const projectGrid = document.getElementById("projectGrid");
const projectPagination = document.getElementById("projectPagination");
const totalProjectPages = () => Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));

function renderProjects() {
    const pages = totalProjectPages();
    if (currentProjectPage > pages) currentProjectPage = pages;

    const start = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    const pageItems = projects.slice(start, start + PROJECTS_PER_PAGE);

    projectGrid.innerHTML = pageItems
        .map((p, i) => {
            const globalIndex = start + i + 1;
            const tagsHtml = p.tags.map((t) => `<span>${t}</span>`).join("");
            return `
      <div class="project-card hardbox">
        <div class="project-index">PROJECT ${String(globalIndex).padStart(2, "0")}</div>
        <p class="project-name">${p.name}</p>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${tagsHtml}</div>
        <a class="project-link" href="${p.link}" target="_blank" rel="noopener">VIEW PROJECT →</a>
      </div>
    `;
        })
        .join("");

    renderProjectPaginationControls(pages);
}

function renderProjectPaginationControls(pages) {
    if (pages <= 1) {
        projectPagination.innerHTML = "";
        return;
    }

    let html = `<button class="page-btn" id="prevProjectPage" ${currentProjectPage === 1 ? "disabled" : ""}>←</button>`;
    for (let i = 1; i <= pages; i++) {
        html += `<button class="page-btn ${i === currentProjectPage ? "active" : ""}" data-project-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn" id="nextProjectPage" ${currentProjectPage === pages ? "disabled" : ""}>→</button>`;
    projectPagination.innerHTML = html;

    document.getElementById("prevProjectPage")?.addEventListener("click", () => {
        currentProjectPage--;
        renderProjects();
    });
    document.getElementById("nextProjectPage")?.addEventListener("click", () => {
        currentProjectPage++;
        renderProjects();
    });
    projectPagination.querySelectorAll("[data-project-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentProjectPage = parseInt(btn.dataset.projectPage, 10);
            renderProjects();
        });
    });
}

renderProjects();

/* ---------- TRAINING PAGINATION ---------- */
const trainings = [
    {
        name: "Microsoft Excel Formulas and Functions For Basic to Expert",
        provider: "Udemy",
        date: "JUL 2026",
        link: "https://www.udemy.com/certificate/UC-6153e128-896c-43aa-9baa-c2f07cc2614a/",
    },
    {
        name: "Belajar Dasar AI",
        provider: "Dicoding",
        date: "AUG 2025",
        link: "https://www.dicoding.com/certificates/MEPJ251MLP3V",
    },
    {
        name: "Linear Models in Machine Learning: Applications",
        provider: "Digitalent Komdigi",
        date: "MAY — JUN 2025",
        link: "https://drive.google.com/file/d/1gIGo1qgvFbiodDu77QuCvtFYQbwhDggr/view?usp=drive_link",
    },
    {
        name: "Belajar Machine Learning untuk Pemula",
        provider: "Dicoding",
        date: "JAN 2025",
        link: "https://www.dicoding.com/certificates/KEXL79QRYXG2",
    },
    {
        name: "Belajar Dasar Visualisasi Data",
        provider: "Dicoding",
        date: "DEC 2024",
        link: "https://www.dicoding.com/certificates/6RPNYEYQ8Z2M",
    },
    {
        name: "Belajar Analisis Data dengan Python",
        provider: "Dicoding",
        date: "OKT 2024",
        link: "https://www.dicoding.com/certificates/JMZV4G71NXN9",
    },
    {
        name: "Belajar Dasar Structured Query Language (SQL)",
        provider: "Dicoding",
        date: "SEP 2024",
        link: "https://www.dicoding.com/certificates/N9ZOM858DPG5",
    },
    {
        name: "Belajar manajemen proyek",
        provider: "Dicoding",
        date: "SEP 2024",
        link: "https://www.dicoding.com/certificates/81P2NRO8JXOY",
    },
    {
        name: "Cloud Computing & Back-End Development",
        provider: "Bangkit Academy led by Google, Tokopedia, Gojek, & Travelokag",
        date: "AUG 2023 - FEB 2024",
        link: "https://drive.google.com/file/d/1Ilf9E4UK4V98RFDU1BqddzAvqe-QfTkG/view?usp=drive_link",
    },
    {
        name: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud",
        provider: "Dicoding",
        date: "SEP 2023",
        link: "https://www.dicoding.com/certificates/NVP781V8WXR0",
    },
    {
        name: "Belajar Dasar Pemrograman Web",
        provider: "Dicoding",
        date: "AUG 2023",
        link: "https://www.dicoding.com/certificates/QLZ9Q5582Z5D",
    },
    {
        name: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud",
        provider: "Dicoding",
        date: "SEP 2023",
        link: "https://www.dicoding.com/certificates/NVP781V8WXR0",
    },
];

const ITEMS_PER_PAGE = 4;
let currentPage = 1;
const trainList = document.getElementById("trainList");
const trainPagination = document.getElementById("trainPagination");
const totalPages = () => Math.max(1, Math.ceil(trainings.length / ITEMS_PER_PAGE));

function renderTrainings() {
    const pages = totalPages();
    if (currentPage > pages) currentPage = pages;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = trainings.slice(start, start + ITEMS_PER_PAGE);

    trainList.innerHTML = pageItems
        .map(
            (t) => `
      <a class="train-row" href="${t.link}" target="_blank" rel="noopener">
        <div>
          <div class="train-name">${t.name}</div>
          <div class="train-provider">${t.provider}</div>
        </div>
        <div class="train-date">${t.date}</div>
      </a>
    `,
        )
        .join("");

    renderPaginationControls(pages);
}

function renderPaginationControls(pages) {
    if (pages <= 1) {
        trainPagination.innerHTML = "";
        return;
    }

    let html = `<button class="page-btn" id="prevPage" ${currentPage === 1 ? "disabled" : ""}>←</button>`;
    for (let i = 1; i <= pages; i++) {
        html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn" id="nextPage" ${currentPage === pages ? "disabled" : ""}>→</button>`;
    trainPagination.innerHTML = html;

    document.getElementById("prevPage")?.addEventListener("click", () => {
        currentPage--;
        renderTrainings();
    });
    document.getElementById("nextPage")?.addEventListener("click", () => {
        currentPage++;
        renderTrainings();
    });
    trainPagination.querySelectorAll("[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentPage = parseInt(btn.dataset.page, 10);
            renderTrainings();
        });
    });
}

renderTrainings();
