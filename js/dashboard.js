/**
 * CampusCareer - Dashboard Script
 * Controls student profile, stats, application pipeline tracking, skill customization, and resume upload simulator.
 */

document.addEventListener('DOMContentLoaded', () => {
  const dashboardRoot = document.getElementById('dashboardRoot');
  if (!dashboardRoot) return;

  initDashboard();
});

function initDashboard() {
  const profile = CAMPUS_DATA.studentProfile;

  renderProfileCard(profile);
  renderDashboardStats();
  renderApplicationTracker(profile.applications);
  renderSavedOpportunitiesList();
  renderStudentSkills();
  initResumeUploadSimulator();

  // Listen to bookmark updates
  window.addEventListener('bookmarksUpdated', () => {
    renderDashboardStats();
    renderSavedOpportunitiesList();
  });

  // Listen to skills updates
  window.addEventListener('skillsUpdated', () => {
    renderStudentSkills();
  });
}

function renderProfileCard(profile) {
  const nameEl = document.getElementById('dashStudentName');
  const collegeEl = document.getElementById('dashStudentCollege');
  const degreeEl = document.getElementById('dashStudentDegree');
  const yearEl = document.getElementById('dashStudentYear');
  const avatarEl = document.getElementById('dashAvatarInitials');
  const completionGauge = document.getElementById('profileGaugeFill');
  const completionText = document.getElementById('profileGaugeText');

  if (nameEl) nameEl.textContent = profile.name;
  if (collegeEl) collegeEl.textContent = profile.college;
  if (degreeEl) degreeEl.textContent = profile.degree;
  if (yearEl) yearEl.textContent = profile.year;
  if (avatarEl) avatarEl.textContent = profile.avatarInitials;

  if (completionGauge && completionText) {
    completionGauge.style.width = `${profile.profileCompletion}%`;
    completionText.textContent = `${profile.profileCompletion}% Completed`;
  }
}

function renderDashboardStats() {
  const appliedCount = document.getElementById('statAppliedCount');
  const shortlistedCount = document.getElementById('statShortlistedCount');
  const savedCount = document.getElementById('statSavedCount');
  const deadlinesCount = document.getElementById('statDeadlinesCount');

  const profile = CAMPUS_DATA.studentProfile;
  const savedTotal = window.StorageManager.getSavedCount();

  if (appliedCount) appliedCount.textContent = profile.applications.length;
  if (shortlistedCount) shortlistedCount.textContent = profile.applications.filter(a => a.statusIndex >= 1).length;
  if (savedCount) savedCount.textContent = savedTotal;
  if (deadlinesCount) deadlinesCount.textContent = '2'; // Upcoming deadlines
}

/**
 * Application Pipeline Tracker (Applied -> Shortlisted -> Interview -> Selected)
 */
function renderApplicationTracker(applications) {
  const container = document.getElementById('applicationsContainer');
  if (!container) return;

  if (!applications || applications.length === 0) {
    container.innerHTML = `<p class="text-muted">No applications submitted yet. Explore opportunities to apply!</p>`;
    return;
  }

  const stages = ['Applied', 'Shortlisted', 'Interview', 'Selected'];

  container.innerHTML = applications.map(app => {
    return `
      <div class="application-card card">
        <div class="app-card-header">
          <div>
            <h4 class="app-role-title">${escapeHTML(app.role)}</h4>
            <div class="app-company">${escapeHTML(app.company)} • Applied on ${app.appliedDate}</div>
          </div>
          <span class="app-status-badge status-${app.status.toLowerCase()}">${escapeHTML(app.status)}</span>
        </div>

        <!-- Pipeline Progress Steps -->
        <div class="pipeline-tracker">
          ${stages.map((stage, idx) => {
            const isPassed = idx <= app.statusIndex;
            const isCurrent = idx === app.statusIndex;
            return `
              <div class="pipeline-step ${isPassed ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                <div class="step-circle">${isPassed ? '✓' : idx + 1}</div>
                <div class="step-label">${stage}</div>
              </div>
            `;
          }).join('<div class="pipeline-line"></div>')}
        </div>

        <div class="app-next-step">
          <span class="next-step-icon">💡</span>
          <span><strong>Next Action:</strong> ${escapeHTML(app.nextStep)}</span>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Saved Opportunities List in Dashboard
 */
function renderSavedOpportunitiesList() {
  const container = document.getElementById('dashSavedGrid');
  if (!container) return;

  const bookmarkedIds = window.StorageManager.getBookmarks();
  const savedOpportunities = CAMPUS_DATA.opportunities.filter(o => bookmarkedIds.includes(o.id));

  if (savedOpportunities.length === 0) {
    container.innerHTML = `
      <div class="empty-bookmarks-box">
        <span>⭐ No saved opportunities yet.</span>
        <a href="opportunities.html" class="btn btn-sm btn-outline" style="margin-top: 10px;">Browse Opportunities</a>
      </div>
    `;
    return;
  }

  container.innerHTML = savedOpportunities.map(opp => `
    <div class="dash-saved-item">
      <div class="company-logo" style="background: ${opp.logoBg}; width: 36px; height: 36px; font-size: 0.9rem;">${opp.companyLogo}</div>
      <div class="dash-saved-info">
        <div class="dash-saved-title">${escapeHTML(opp.title)}</div>
        <div class="dash-saved-meta">${escapeHTML(opp.company)} • ${escapeHTML(opp.stipend)}</div>
      </div>
      <button class="btn btn-sm btn-icon remove-saved-btn" data-id="${opp.id}" title="Remove Bookmark">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('.remove-saved-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const oppId = btn.getAttribute('data-id');
      window.StorageManager.toggleBookmark(oppId);
      if (window.showToast) window.showToast('Bookmark removed', 'info');
    });
  });
}

/**
 * Interactive Student Skills Manager
 */
function renderStudentSkills() {
  const container = document.getElementById('studentSkillsContainer');
  const addBtn = document.getElementById('addSkillBtn');
  const input = document.getElementById('newSkillInput');

  if (!container) return;

  const skills = window.StorageManager.getUserSkills();

  container.innerHTML = skills.map(skill => `
    <span class="skill-tag skill-tag-lg editable-skill">
      ${escapeHTML(skill)}
      <span class="remove-skill-x" data-skill="${escapeHTML(skill)}">×</span>
    </span>
  `).join('');

  // Remove skill event listeners
  container.querySelectorAll('.remove-skill-x').forEach(x => {
    x.addEventListener('click', (e) => {
      const skillName = x.getAttribute('data-skill');
      window.StorageManager.removeUserSkill(skillName);
    });
  });

  if (addBtn && input && !addBtn.dataset.bound) {
    addBtn.dataset.bound = "true";
    const addAction = () => {
      const val = input.value.trim();
      if (val) {
        window.StorageManager.addUserSkill(val);
        input.value = '';
        if (window.showToast) window.showToast(`Skill "${val}" added!`, 'success');
      }
    };

    addBtn.addEventListener('click', addAction);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addAction();
    });
  }
}

/**
 * Interactive Resume Upload Simulator & ATS Checklist
 */
function initResumeUploadSimulator() {
  const dropZone = document.getElementById('resumeDropZone');
  const fileInput = document.getElementById('resumeFileInput');
  const fileNameDisplay = document.getElementById('resumeFileName');
  const progressBar = document.getElementById('resumeUploadProgress');
  const atsScoreDisplay = document.getElementById('atsScoreValue');

  if (!dropZone || !fileInput) return;

  const handleUpload = (file) => {
    if (!file) return;

    if (fileNameDisplay) fileNameDisplay.textContent = `Uploading: ${file.name}...`;
    if (progressBar) progressBar.style.width = '20%';

    // Simulate ATS Scan animation steps
    setTimeout(() => {
      if (progressBar) progressBar.style.width = '60%';
    }, 400);

    setTimeout(() => {
      if (progressBar) progressBar.style.width = '100%';
      if (fileNameDisplay) fileNameDisplay.innerHTML = `✅ <strong>${file.name}</strong> uploaded & ATS Scanned!`;
      if (atsScoreDisplay) {
        atsScoreDisplay.textContent = '88%';
        atsScoreDisplay.style.color = '#00B894';
      }
      if (window.showToast) window.showToast('Resume uploaded! ATS Score updated to 88%', 'success');
    }, 900);
  };

  dropZone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  });

  // Drag & Drop effects
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  });
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
