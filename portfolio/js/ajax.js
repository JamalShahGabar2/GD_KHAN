document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const links = document.querySelectorAll('.nav-link');
  
    links.forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = e.target.getAttribute('href');
  
        try {
          const response = await fetch(url);
          const data = await response.text();
          content.innerHTML = data;
          AOS.refresh(); // Re-initialize AOS animations
        } catch (error) {
          console.error('Error loading content:', error);
        }
      });
    });
  });
  