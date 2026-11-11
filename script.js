const books = [
  { title: "Синяя пора", author: "Элис Хантер", status: "reading", statusLabel: "Читаю", rating: 4.8, cover: "cover-blue", coverText: "СИНЯЯ<br>ПОРА" },
  { title: "Тихий город", author: "Марк Леви", status: "want", statusLabel: "Хочу прочитать", rating: null, cover: "cover-ochre", coverText: "ТИХИЙ<br>ГОРОД" },
  { title: "Сад слов", author: "Нацуки Каваи", status: "done", statusLabel: "Прочитано", rating: 5.0, cover: "cover-green", coverText: "САД<br>СЛОВ" },
  { title: "Дальний берег", author: "Анна Рид", status: "reading", statusLabel: "Читаю", rating: 4.2, cover: "cover-plum", coverText: "ДАЛЬНИЙ<br>БЕРЕГ" },
  { title: "Письма к себе", author: "Ирина Волкова", status: "done", statusLabel: "Прочитано", rating: 4.6, cover: "cover-sand", coverText: "ПИСЬМА<br>К СЕБЕ" },
  { title: "Ночной поезд", author: "Даниэль Келлер", status: "want", statusLabel: "Хочу прочитать", rating: null, cover: "cover-charcoal", coverText: "НОЧНОЙ<br>ПОЕЗД" }
];

const searchInput = document.querySelector("#book-search");
const statusFilter = document.querySelector("#status-filter");
const sortSelect = document.querySelector("#sort-books");
const booksContainer = document.querySelector("#demo-books");
const countElement = document.querySelector("#book-count");

function renderBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  const selectedStatus = statusFilter.value;
  const sortBy = sortSelect.value;

  const filtered = books
    .filter((book) => {
      const matchesQuery = `${book.title} ${book.author}`.toLocaleLowerCase("ru").includes(query);
      const matchesStatus = selectedStatus === "all" || book.status === selectedStatus;
      return matchesQuery && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? -1) - (a.rating ?? -1);
      if (sortBy === "author") return a.author.localeCompare(b.author, "ru");
      return a.title.localeCompare(b.title, "ru");
    });

  countElement.textContent = String(filtered.length);

  if (filtered.length === 0) {
    booksContainer.innerHTML = '<p class="empty-state">Ничего не найдено. Попробуйте изменить запрос или фильтр.</p>';
    return;
  }

  booksContainer.innerHTML = filtered.map((book) => `
    <article class="demo-book">
      <div class="demo-cover ${book.cover}"><span>${book.coverText}</span></div>
      <div class="demo-book-info">
        <span class="status status-${book.status}">${book.statusLabel}</span>
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <span class="demo-rating ${book.rating === null ? "muted" : ""}">
          ${book.rating === null ? "Без оценки" : `★ ${book.rating.toFixed(1)}`}
        </span>
      </div>
    </article>
  `).join("");
}

[searchInput, statusFilter, sortSelect].forEach((control) => {
  control.addEventListener("input", renderBooks);
  control.addEventListener("change", renderBooks);
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Открыть меню" : "Закрыть меню");
  mobileMenu.hidden = isExpanded;
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
  });
});

renderBooks();