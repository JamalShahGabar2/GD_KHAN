// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  // === Chart.js: Academic Impact ===
  const ctx = document.getElementById('citationChart')?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Citations',
          data: [10, 22, 35, 45, 60, 46],
          backgroundColor: '#2563eb'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Citations' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // === Leaflet: Global Collaborations Map ===
  if (document.getElementById('map')) {
    const map = L.map('map').setView([30, 90], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const markers = [
      { name: "Hiroshima University", coords: [34.3853, 132.4553], desc: "Home Institution" },
      { name: "Purdue University, USA", coords: [40.4237, -86.9212], desc: "Energy & Transport Research" },
      { name: "Kathmandu University, Nepal", coords: [27.6220, 85.5394], desc: "Clean Cooking Study" },
      { name: "University of Tokyo, Japan", coords: [35.7126, 139.7610], desc: "Rural Policy Collaboration" },
      { name: "Jiangsu Ocean University, China", coords: [34.6015, 119.1776], desc: "Migration Research" },
      { name: "Herat, Afghanistan", coords: [34.3419, 62.2031], desc: "Saffron Policy Fieldwork" }
    ];

    markers.forEach(loc => {
      L.marker(loc.coords)
        .addTo(map)
        .bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
    });
  }

  // === Contact Form (AJAX via Formspree) ===
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      fetch('https://formspree.io/f/moqgbeyz', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
      .then(response => {
        if (response.ok) {
          document.getElementById('formSuccess').classList.remove('hidden');
          form.reset();
        } else {
          alert('There was a problem sending your message.');
        }
      });
    });
  }

  // === Optional: Load publications dynamically ===
  const pubList = document.getElementById('publications-list');
  if (pubList) {
    fetch('publications.json')
      .then(res => res.json())
      .then(data => {
        pubList.innerHTML = data.map(pub => `
          <li>
            <a href="${pub.link}" target="_blank" class="text-blue-600 hover:underline">
              ${pub.title}
            </a>
          </li>
        `).join('');
      })
      .catch(err => console.error('Could not load publications.json:', err));
  }

});
