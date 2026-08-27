/**
 * CampusCareer - LocalStorage Manager
 * Persists bookmarks, saved applications, and custom student skills.
 */

const STORAGE_KEYS = {
  BOOKMARKS: 'campuscareer_bookmarks',
  USER_SKILLS: 'campuscareer_user_skills',
  APPLICATIONS: 'campuscareer_applications'
};

const StorageManager = {
  // Get all bookmarked opportunity IDs
  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : ['opp-1', 'opp-2']; // Default demo bookmarks
    } catch (e) {
      console.warn('LocalStorage access failed:', e);
      return ['opp-1', 'opp-2'];
    }
  },

  // Toggle bookmark for an opportunity ID
  toggleBookmark(id) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(id);
    let isAdded = false;

    if (index > -1) {
      bookmarks.splice(index, 1);
      isAdded = false;
    } else {
      bookmarks.push(id);
      isAdded = true;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      // Dispatch custom event so all open views / widgets update instantly
      window.dispatchEvent(new CustomEvent('bookmarksUpdated', { detail: { bookmarks, id, isAdded } }));
    } catch (e) {
      console.warn('Failed to save bookmark to LocalStorage:', e);
    }

    return isAdded;
  },

  // Check if a specific opportunity is bookmarked
  isBookmarked(id) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(id);
  },

  // Count total saved bookmarks
  getSavedCount() {
    return this.getBookmarks().length;
  },

  // User Skills Management
  getUserSkills() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_SKILLS);
      return data ? JSON.parse(data) : CAMPUS_DATA.studentProfile.skills;
    } catch (e) {
      return CAMPUS_DATA.studentProfile.skills;
    }
  },

  addUserSkill(skillName) {
    if (!skillName || typeof skillName !== 'string') return false;
    const skills = this.getUserSkills();
    const trimmed = skillName.trim();
    if (trimmed && !skills.includes(trimmed)) {
      skills.push(trimmed);
      try {
        localStorage.setItem(STORAGE_KEYS.USER_SKILLS, JSON.stringify(skills));
        window.dispatchEvent(new CustomEvent('skillsUpdated', { detail: { skills } }));
        return true;
      } catch (e) {
        console.warn('Failed to save skills to LocalStorage:', e);
      }
    }
    return false;
  },

  removeUserSkill(skillName) {
    let skills = this.getUserSkills();
    skills = skills.filter(s => s.toLowerCase() !== skillName.toLowerCase());
    try {
      localStorage.setItem(STORAGE_KEYS.USER_SKILLS, JSON.stringify(skills));
      window.dispatchEvent(new CustomEvent('skillsUpdated', { detail: { skills } }));
      return true;
    } catch (e) {
      console.warn('Failed to remove skill from LocalStorage:', e);
      return false;
    }
  }
};
