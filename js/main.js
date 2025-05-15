document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Highlight active link
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("text-blue-600", "font-bold");
    } else {
      link.classList.remove("text-blue-600", "font-bold");
    }
  });

  // Load projects dynamically
  async function loadProjects() {
    const response = await fetch("content/projects.json");
    const projects = await response.json();
    const container = document.getElementById("projects");
    container.innerHTML = projects.map(project => `
      <div class="project-card">
        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-t-lg">
        <h3 class="text-xl font-bold mt-4">${project.title}</h3>
        <p class="text-gray-600 mt-2">${project.description}</p>
        <a href="${project.link}" target="_blank" class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Project</a>
      </div>
    `).join("");
  }

  if (document.getElementById("projects")) {
    loadProjects();
  }

  // Light/Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  // Publication Slider
  const slider = document.getElementById('publication-slider');
  const leftArrow = document.getElementById('slider-left');
  const rightArrow = document.getElementById('slider-right');

  leftArrow.addEventListener('click', () => {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
  });
  rightArrow.addEventListener('click', () => {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  });

  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedFilters = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const matches = selectedFilters.some(filter => card.textContent.includes(filter));
        card.style.display = matches || selectedFilters.length === 0 ? 'block' : 'none';
      });
    });
  });
});
