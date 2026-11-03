// Renderiza os ícones do Lucide
lucide.createIcons();

// 1. Navegação entre Páginas (SPA)
function navigate(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });

  if (sectionId === 'blog') {
    fetchBlogViews();
  }
}

// 2. Alternância de Abas na Seção Portfólio/Arquivos (Python, PySpark, SQL)
function switchTab(lang) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  event.currentTarget.classList.add('active');
  document.getElementById(`tab-${lang}`).classList.add('active');
}

// 3. Contador de Visualizações da Página do Blog
async function fetchBlogViews() {
  const viewsElement = document.getElementById('views-count');
  try {
    const response = await fetch('https://counterapi.dev/v1/draulio.com.br/blog/up');
    const data = await response.json();
    if (data && data.count !== undefined) {
      viewsElement.innerText = data.count;
    } else {
      viewsElement.innerText = '1';
    }
  } catch (error) {
    console.error('Erro ao carregar visualizações:', error);
    viewsElement.innerText = 'N/A';
  }
}

// 4. Suporte a Hash na URL ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    navigate(hash);
  }
});