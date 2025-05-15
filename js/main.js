document.addEventListener('DOMContentLoaded', () => {
  async function loadProjects() {
    try {
      const response = await fetch('/content/projects');
      const files = await response.json();

      const projectsContainer = document.getElementById('projects');
      projectsContainer.innerHTML = '';

      for (const file of files) {
        const projectResponse = await fetch(`/content/projects/${file}`);
        const projectMarkdown = await projectResponse.text();

        // Parse frontmatter and content
        const { attributes, body } = parseMarkdown(projectMarkdown);

        // Create project card
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'hover:shadow-lg', 'transition');

        projectCard.innerHTML = `
          <img src="${attributes.image}" alt="${attributes.title}" class="w-full h-48 object-cover rounded-t-lg">
          <h3 class="text-xl font-bold mt-4">${attributes.title}</h3>
          <p class="text-gray-600 mt-2">${attributes.description}</p>
          <a href="${attributes.link}" target="_blank" class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Project</a>
        `;

        projectsContainer.appendChild(projectCard);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  // Markdown parser (basic frontmatter parser)
  function parseMarkdown(markdown) {
    const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
    const match = markdown.match(frontmatterRegex);

    if (!match) return { attributes: {}, body: markdown };

    const frontmatter = match[1];
    const body = markdown.replace(frontmatterRegex, '').trim();

    const attributes = frontmatter.split('\n').reduce((acc, line) => {
      const [key, ...value] = line.split(':');
      acc[key.trim()] = value.join(':').trim();
      return acc;
    }, {});

    return { attributes, body };
  }

  // Load projects on page load
  if (document.getElementById('projects')) {
    loadProjects();
  }

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

  // Menu Toggle
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
});
