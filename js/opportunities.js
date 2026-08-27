/**
 * CampusCareer - Opportunities Page Script
 * Powers dynamic searching, multi-faceted filtering, sorting, bookmarking, and modal view.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Only execute if on opportunities page or featured grid present
  const gridContainer = document.getElementById('opportunitiesGrid');
  if (!gridContainer) return;

  initOpportunitiesApp();
});

let currentFilters = {
  keyword: '',
  category: 'all',
  workMode: 'all',
  location: 'all',
  skill: 'all',
  sortBy: 'newest',
  savedOnly: false
};

function initOpportunitiesApp() {
  const opportunities = CAMPUS_DATA.opportunities;

  // Read URL query params (e.g., ?category=internships or ?search=python)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('category')) {
    currentFilters.category = urlParams.get('category');
  }
  if (urlParams.has('search')) {
    currentFilters.keyword = urlParams.get('search');
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = currentFilters.keyword;
  }
  if (urlParams.has('saved')) {
    currentFilters.savedOnly = urlParams.get('saved') === 'true';
  }

  // Setup DOM Event Listeners
  setupFilterListeners();
  setupModalListeners();

  // Initial render
  renderOpportunities(opportunities);

  // Sync when bookmarks change
  window.addEventListener('bookmarksUpdated', () => {
    renderOpportunities(opportunities);
  });
}

function setupFilterListeners() {
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const modeFilter = document.getElementById('modeFilter');
  const locationFilter = document.getElementById('locationFilter');
  const skillFilter = document.getElementById('skillFilter');
  const sortSelect = document.getElementById('sortSelect');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const savedToggle = document.getElementById('savedOnlyToggle');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.keyword = e.target.value.toLowerCase().trim();
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (typeFilter) {
    typeFilter.value = currentFilters.category;
    typeFilter.addEventListener('change', (e) => {
      currentFilters.category = e.target.value;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (modeFilter) {
    modeFilter.addEventListener('change', (e) => {
      currentFilters.workMode = e.target.value;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (locationFilter) {
    locationFilter.addEventListener('change', (e) => {
      currentFilters.location = e.target.value;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (skillFilter) {
    skillFilter.addEventListener('change', (e) => {
      currentFilters.skill = e.target.value;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (savedToggle) {
    if (currentFilters.savedOnly) savedToggle.checked = true;
    savedToggle.addEventListener('change', (e) => {
      currentFilters.savedOnly = e.target.checked;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }

  // Quick skill pills filter clicks
  const skillPills = document.querySelectorAll('.skill-tag-pill');
  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selectedSkill = pill.getAttribute('data-skill');
      if (skillFilter) skillFilter.value = selectedSkill;
      currentFilters.skill = selectedSkill;
      renderOpportunities(CAMPUS_DATA.opportunities);
    });
  });
}

function resetAllFilters() {
  currentFilters = {
    keyword: '',
    category: 'all',
    workMode: 'all',
    location: 'all',
    skill: 'all',
    sortBy: 'newest',
    savedOnly: false
  };

  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const modeFilter = document.getElementById('modeFilter');
  const locationFilter = document.getElementById('locationFilter');
  const skillFilter = document.getElementById('skillFilter');
  const sortSelect = document.getElementById('sortSelect');
  const savedToggle = document.getElementById('savedOnlyToggle');

  if (searchInput) searchInput.value = '';
  if (typeFilter) typeFilter.value = 'all';
  if (modeFilter) modeFilter.value = 'all';
  if (locationFilter) locationFilter.value = 'all';
  if (skillFilter) skillFilter.value = 'all';
  if (sortSelect) sortSelect.value = 'newest';
  if (savedToggle) savedToggle.checked = false;

  renderOpportunities(CAMPUS_DATA.opportunities);
  if (window.showToast) window.showToast('Filters reset to default', 'info');
}

function getFilteredOpportunities(opportunities) {
  return opportunities.filter(opp => {
    // Keyword match (title, company, description, skills)
    if (currentFilters.keyword) {
      const kw = currentFilters.keyword;
      const titleMatch = opp.title.toLowerCase().includes(kw);
      const companyMatch = opp.company.toLowerCase().includes(kw);
      const descMatch = opp.description.toLowerCase().includes(kw);
      const skillsMatch = opp.skills.some(s => s.toLowerCase().includes(kw));
      if (!titleMatch && !companyMatch && !descMatch && !skillsMatch) return false;
    }

    // Category / Type filter
    if (currentFilters.category !== 'all') {
      const cat = currentFilters.category.toLowerCase();
      if (cat === 'internships' && opp.type.toLowerCase() !== 'internship') return false;
      if (cat === 'jobs' && opp.type.toLowerCase() !== 'job') return false;
      if (cat === 'part-time' && opp.type.toLowerCase() !== 'part-time') return false;
      if (cat === 'campus' && opp.type.toLowerCase() !== 'campus ambassador') return false;
    }

    // Work Mode filter
    if (currentFilters.workMode !== 'all') {
      if (opp.workMode.toLowerCase() !== currentFilters.workMode.toLowerCase()) return false;
    }

    // Location filter
    if (currentFilters.location !== 'all') {
      if (!opp.location.toLowerCase().includes(currentFilters.location.toLowerCase())) return false;
    }

    // Skill filter
    if (currentFilters.skill !== 'all') {
      const hasSkill = opp.skills.some(s => s.toLowerCase().includes(currentFilters.skill.toLowerCase()));
      if (!hasSkill) return false;
    }

    // Saved only filter
    if (currentFilters.savedOnly) {
      if (!window.StorageManager.isBookmarked(opp.id)) return false;
    }

    return true;
  }).sort((a, b) => {
    if (currentFilters.sortBy === 'stipend-high') {
      return b.stipendNumeric - a.stipendNumeric;
    } else if (currentFilters.sortBy === 'deadline') {
      return new Date(a.deadline) - new Date(b.deadline);
    } else {
      // 'newest'
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
  });
}

function renderOpportunities(opportunities) {
  const container = document.getElementById('opportunitiesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const emptyState = document.getElementById('emptyState');

  if (!container) return;

  const filtered = getFilteredOpportunities(opportunities);

  if (resultsCount) {
    resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'Opportunity' : 'Opportunities'} Found`;
  }

  if (filtered.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  container.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = filtered.map(opp => createOpportunityCardHTML(opp)).join('');

  // Attach card event listeners (Bookmark button & View Details button)
  container.querySelectorAll('.card-bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const oppId = btn.getAttribute('data-id');
      const isAdded = window.StorageManager.toggleBookmark(oppId);
      btn.classList.toggle('active', isAdded);
      btn.setAttribute('aria-label', isAdded ? 'Remove Bookmark' : 'Bookmark Opportunity');
      
      const icon = btn.querySelector('.bookmark-icon');
      if (icon) icon.textContent = isAdded ? '★' : '☆';

      if (window.showToast) {
        window.showToast(isAdded ? 'Opportunity saved to Bookmarks!' : 'Removed from Bookmarks', isAdded ? 'success' : 'info');
      }
    });
  });

  container.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const oppId = btn.getAttribute('data-id');
      openDetailsModal(oppId);
    });
  });
}

function createOpportunityCardHTML(opp) {
  const isBookmarked = window.StorageManager.isBookmarked(opp.id);
  const modeClass = opp.workMode.toLowerCase();

  return `
    <article class="opportunity-card reveal-on-scroll" data-id="${opp.id}">
      <div class="card-header">
        <div class="company-brand">
          <div class="company-logo" style="background: ${opp.logoBg}">${opp.companyLogo}</div>
          <div>
            <h3 class="opportunity-title">${escapeHTML(opp.title)}</h3>
            <div class="company-name">${escapeHTML(opp.company)}</div>
          </div>
        </div>
        <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" 
                data-id="${opp.id}" 
                aria-label="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}"
                title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}">
          <span class="bookmark-icon">${isBookmarked ? '★' : '☆'}</span>
        </button>
      </div>

      <div class="card-badges">
        <span class="badge badge-type">${escapeHTML(opp.type)}</span>
        <span class="badge badge-mode badge-mode-${modeClass}">${escapeHTML(opp.workMode)}</span>
        <span class="badge badge-location">📍 ${escapeHTML(opp.location)}</span>
      </div>

      <p class="card-description">${escapeHTML(opp.description.substring(0, 110))}...</p>

      <div class="card-skills">
        ${opp.skills.slice(0, 4).map(s => `<span class="skill-tag">${escapeHTML(s)}</span>`).join('')}
        ${opp.skills.length > 4 ? `<span class="skill-tag skill-tag-more">+${opp.skills.length - 4}</span>` : ''}
      </div>

      <div class="card-footer">
        <div class="stipend-container">
          <span class="stipend-label">Stipend / Salary</span>
          <span class="stipend-value">${escapeHTML(opp.stipend)}</span>
        </div>
        <button class="btn btn-sm btn-primary view-details-btn" data-id="${opp.id}">
          View Details
        </button>
      </div>
    </article>
  `;
}

/**
 * Details Modal Handler
 */
function setupModalListeners() {
  const modal = document.getElementById('detailsModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const overlay = document.getElementById('modalOverlay');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openDetailsModal(oppId) {
  const opp = CAMPUS_DATA.opportunities.find(o => o.id === oppId);
  const modal = document.getElementById('detailsModal');
  const modalBody = document.getElementById('modalContent');

  if (!opp || !modal || !modalBody) return;

  const isBookmarked = window.StorageManager.isBookmarked(opp.id);

  modalBody.innerHTML = `
    <div class="modal-header-banner" style="background: linear-gradient(135deg, ${opp.logoBg}, #2D3436)">
      <div class="modal-company-avatar" style="background: ${opp.logoBg}">${opp.companyLogo}</div>
      <div class="modal-header-info">
        <span class="badge badge-type" style="background: rgba(255,255,255,0.2); color: #fff">${escapeHTML(opp.type)}</span>
        <h2 class="modal-title">${escapeHTML(opp.title)}</h2>
        <div class="modal-company">${escapeHTML(opp.company)} • 📍 ${escapeHTML(opp.location)} (${escapeHTML(opp.workMode)})</div>
      </div>
    </div>

    <div class="modal-body-content">
      <div class="modal-meta-grid">
        <div class="meta-item">
          <span class="meta-icon">💰</span>
          <div>
            <div class="meta-label">Stipend / Salary</div>
            <div class="meta-val">${escapeHTML(opp.stipend)}</div>
          </div>
        </div>
        <div class="meta-item">
          <span class="meta-icon">⏳</span>
          <div>
            <div class="meta-label">Duration</div>
            <div class="meta-val">${escapeHTML(opp.duration)}</div>
          </div>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📅</span>
          <div>
            <div class="meta-label">Apply Deadline</div>
            <div class="meta-val">${escapeHTML(opp.deadline)}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">About the Role</h4>
        <p>${escapeHTML(opp.description)}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Key Responsibilities</h4>
        <ul class="modal-list">
          ${opp.responsibilities.map(r => `<li>${escapeHTML(r)}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Eligibility & Requirements</h4>
        <ul class="modal-list">
          ${opp.eligibility.map(e => `<li>${escapeHTML(e)}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Required Skills</h4>
        <div class="card-skills">
          ${opp.skills.map(s => `<span class="skill-tag skill-tag-lg">${escapeHTML(s)}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-outline modal-bookmark-btn ${isBookmarked ? 'active' : ''}" id="modalBookmarkToggle">
          ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark Role'}
        </button>
        <button class="btn btn-primary modal-apply-btn" id="modalApplyBtn">
          🚀 Apply Now (Demo)
        </button>
      </div>
    </div>
  `;

  // Attach modal internal action listeners
  const bookmarkBtn = modalBody.querySelector('#modalBookmarkToggle');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      const isAdded = window.StorageManager.toggleBookmark(opp.id);
      bookmarkBtn.classList.toggle('active', isAdded);
      bookmarkBtn.textContent = isAdded ? '★ Bookmarked' : '☆ Bookmark Role';
      if (window.showToast) {
        window.showToast(isAdded ? 'Role saved to Bookmarks' : 'Removed from Bookmarks', isAdded ? 'success' : 'info');
      }
    });
  }

  const applyBtn = modalBody.querySelector('#modalApplyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      if (window.showToast) {
        window.showToast('Demo Application Sent! Check your Dashboard application tracker.', 'success');
      }
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
