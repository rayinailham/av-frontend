class CategoryNavbarView {
  constructor() {
    this.element = null;
  }

  render(data) {
    this.element = document.createElement('nav');
    this.element.className = 'category-nav';
    
    // Filter out profile links (by className or text)
    const filteredLinks = data.navigationLinks.filter(link => {
      const cls = (link.className || '').toLowerCase();
      const txt = (link.text || '').toLowerCase();
      return !cls.includes('profile') && txt !== 'profil' && txt !== 'profile';
    });
    this.element.innerHTML = `
      <div class="nav-container">
        <div class="nav-logo">
          <span class="nav-logo-aurea">${data.brandParts.aurea}</span><span class="nav-logo-voice">${data.brandParts.voice}</span>
        </div>
        <div class="nav-buttons">
          ${filteredLinks.map(link =>
            `<a href="${link.href}" class="nav-button ${link.className || ''}">${link.text}</a>`
          ).join('')}
        </div>
      </div>
    `;

    return this.element;
  }

  mount(container) {
    if (!this.element) {
      console.error('Category navbar element not rendered yet. Call render() first.');
      return;
    }
    container.prepend(this.element);
  }

  unmount() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  destroy() {
    this.unmount();
    this.element = null;
  }
}

export default CategoryNavbarView;
