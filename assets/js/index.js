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
