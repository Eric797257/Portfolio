document.addEventListener("DOMContentLoaded", () => {
  /* 1. Mobile Navigation & Keyboard Accessibility */
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuIconPath = document.getElementById("menu-icon-path");

  // SVG icon paths for burger menu open/close states
  const burgerPath = "M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z";
  const closePath =
    "m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z";

  /**
   * Check if viewport is mobile width
   */
  const isMobile = () => window.innerWidth <= 768;

  /**
   * Updates tabindex of nav links depending on mobile drawer state
   */
  const updateNavTabIndex = (isOpen) => {
    if (isMobile()) {
      navLinks.forEach((link) => {
        if (isOpen) {
          link.removeAttribute("tabindex");
        } else {
          link.setAttribute("tabindex", "-1");
        }
      });
    } else {
      navLinks.forEach((link) => link.removeAttribute("tabindex"));
    }
  };

  /**
   * Toggles mobile menu drawer open/closed
   */
  const toggleMobileMenu = (open) => {
    const shouldOpen =
      open !== undefined ? open : !navMenu.classList.contains("is-active");

    if (shouldOpen) {
      navMenu.classList.add("is-active");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      mobileMenuBtn.setAttribute("aria-label", "Close navigation menu");
      if (menuIconPath) menuIconPath.setAttribute("d", closePath);
      updateNavTabIndex(true);
    } else {
      navMenu.classList.contains("is-active") &&
        navMenu.classList.remove("is-active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenuBtn.setAttribute("aria-label", "Open navigation menu");
      if (menuIconPath) menuIconPath.setAttribute("d", burgerPath);
      updateNavTabIndex(false);
    }
  };

  // Mobile menu trigger click event
  mobileMenuBtn.addEventListener("click", () => toggleMobileMenu());

  // Close mobile menu when selecting any link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobile()) {
        toggleMobileMenu(false);
      }
    });
  });

  // Handle window resize adjustments for tab order and menu state
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      navMenu.classList.remove("is-active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      updateNavTabIndex(true);
    } else {
      updateNavTabIndex(navMenu.classList.contains("is-active"));
    }
  });

  // Initial setup for navigation tabindex
  updateNavTabIndex(false);

  // 2. Light & Dark Theme Switcher
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  const sunIcon = `<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
    fill="currentColor" viewBox="0 0 24 24" ><path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9m1 10h-2v3h2zm0-17h-2v3h2zM2 11h3v2H2zm17 0h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zm-12.02.7L6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zm8.48 11.32 1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path>
    </svg>`;
  const moonIcon = `<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
    fill="currentColor" viewBox="0 0 24 24" ><path d="M12.2 22c4.53 0 8.45-2.91 9.76-7.24a1.002 1.002 0 0 0-1.25-1.25c-.78.23-1.58.35-2.38.35-4.52 0-8.2-3.68-8.2-8.2 0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25A10.17 10.17 0 0 0 2 11.8C2 17.42 6.57 22 12.2 22M8.18 4.65c-.03.34-.05.68-.05 1.02 0 5.62 4.57 10.2 10.2 10.2.34 0 .68-.02 1.02-.05C17.93 18.38 15.23 20 12.2 20 7.68 20 4 16.32 4 11.8a8.15 8.15 0 0 1 4.18-7.15"></path>
    </svg>`;

  /** Sets application theme and persists preference safely */
  const setTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      themeToggleBtn.innerHTML = sunIcon;
      themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
    } else {
      themeToggleBtn.innerHTML = moonIcon;
      themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
    }

    try {
      localStorage.setItem("portfolio_theme", theme);
    } catch (e) {
      console.warn("localStorage is restricted or unavailable:", e);
    }
  };

  // Load saved theme or default to light mode
  let initialTheme = "light";
  try {
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    }
  } catch (e) {
    initialTheme = "light";
  }
  setTheme(initialTheme);

  // Toggle theme event
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  /* 3. Project Cards & Category Filters */
  const projectsData = [
    {
      id: "proj-1",
      title: "TaskFlow Dashboard",
      description:
        "A productivity dashboard application featuring drag-and-drop task organization, priority flags, and local browser persistence.",
      category: "JavaScript Apps",
      technologies: ["JavaScript ES6", "HTML5", "CSS Grid", "LocalStorage"],
      demoUrl: "https://example.com/demo/taskflow",
      sourceUrl: "https://github.com/example/taskflow",
    },
    {
      id: "proj-2",
      title: "TechCraft Agency Website",
      description:
        "A sleek, fully responsive agency landing page built with modern semantic HTML structure and CSS custom properties.",
      category: "Websites",
      technologies: ["HTML5", "CSS3", "Responsive Design", "Flexbox"],
      demoUrl: "https://example.com/demo/techcraft",
      sourceUrl: "https://github.com/example/techcraft",
    },
    {
      id: "proj-3",
      title: "WeatherSense App",
      description:
        "Interactive weather visualization application retrieving real-time dynamic forecasts and visual climate statistics.",
      category: "JavaScript Apps",
      technologies: ["JavaScript", "Fetch API", "CSS3", "Async/Await"],
      demoUrl: "https://example.com/demo/weathersense",
      sourceUrl: "https://github.com/example/weathersense",
    },
    {
      id: "proj-4",
      title: "DevPulse Tech Blog",
      description:
        "A accessible static publishing blog template optimized for reading comfort, code snippet highlighting, and dark mode.",
      category: "Websites",
      technologies: ["HTML5", "CSS Variables", "A11y", "Vanilla JS"],
      demoUrl: "https://example.com/demo/devpulse",
      sourceUrl: "https://github.com/example/devpulse",
    },
  ];

  const projectsGrid = document.getElementById("projects-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("project-search");
  const resultsCount = document.getElementById("results-count");

  let activeCategory = "all";
  let searchQuery = "";

  /* Renders project cards to DOM */
  const renderProjects = () => {
    // Filtered by category and search term
    const filtered = projectsData.filter((project) => {
      const matchesCategory =
        activeCategory === "all" ||
        project.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Clear container
    projectsGrid.innerHTML = "";

    // Display results counter
    const categoryLabel =
      activeCategory === "all" ? "all categories" : `"${activeCategory}"`;
    resultsCount.textContent = `Showing ${filtered.length} project${filtered.length === 1 ? "" : "s"} (${categoryLabel})`;

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
            <div class="no-projects">
                <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">No projects found</p>
                <p>Try adjusting your search terms or filter selection.</p>
            </div>
        `;
      return;
    }

    // Append project cards
    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const techTags = project.technologies
        .map((tech) => `<li class="tech-tag">${tech}</li>`)
        .join("");

      card.innerHTML = `
            <div class="project-body">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <ul class="project-tech" aria-label="Technologies used">
                     ${techTags}
                </ul>
                <div class="project-links">
                    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo for ${project.title}">
                        <span>Live Demo</span> &rarr;
                    </a>
                    <a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code for ${project.title}">
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        `;
      projectsGrid.appendChild(card);
    });
  };

  // Filter button click handler
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      activeCategory = button.getAttribute("data-category");
      renderProjects();
    });
  });

  // Live Search input handler
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderProjects();
  });

  // Initial render
  renderProjects();

  /* 4. Contact Form Validation & Character Count */
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  const charCounter = document.getElementById("char-counter");
  const statusMessage = document.getElementById("status-message");

  // Email Regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Live Character Counter for Message Field
  const updateCharCounter = () => {
    const len = messageInput.value.trim().length;
    charCounter.textContent = `${len} / 500 characters (min 20)`;
    if (len > 20 || len > 500) {
      charCounter.style.color = "var(--error-color)";
    } else {
      charCounter.style.color = "var(--text-muted)";
    }
  };

  messageInput.addEventListener("input", updateCharCounter);

  // Clear error state for a single field
  const clearFieldError = (input, errorEl) => {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    errorEl.classList.remove("visible");
  };

  // Show error state for a single field
  const showFieldError = (input, errorEl) => {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl.classList.add("visible");
  };

  // Field Input event listeners to clear errors on user correction
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length >= 2)
      clearFieldError(nameInput, nameError);
  });

  emailInput.addEventListener("input", () => {
    if (emailPattern.test(emailInput.value.trim()))
      clearFieldError(emailInput, emailError);
  });

  messageInput.addEventListener("input", () => {
    const len = messageInput.value.trim().length;
    if (len >= 20 && len <= 500) clearFieldError(messageInput, messageError);
  });

  // Form Submission Event Handler
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous global status box
    statusMessage.className = "status-box";
    statusMessage.textContent = "";

    let isValid = true;
    let firstInvalidInput = null;

    // Validate Name
    const nameValue = nameInput.value.trim();
    if (nameValue.length < 2) {
      showFieldError(nameInput, nameError);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else {
      clearFieldError(nameInput, nameError);
    }

    // Validate Email
    const emailValue = emailInput.value.trim();
    if (!emailPattern.test(emailValue)) {
      showFieldError(emailInput, emailError);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      clearFieldError(emailInput, emailError);
    }

    // Validate Message
    const messageValue = messageInput.value.trim();
    if (messageValue.length < 20 || messageValue.length > 500) {
      showFieldError(messageInput, messageError);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = messageInput;
    } else {
      clearFieldError(messageInput, messageError);
    }

    // Focus first invalid field if form has errors
    if (!isValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    // Display exact required status confirmation message
    statusMessage.className = "status-box status-success visible";
    statusMessage.textContent = "Demo only. Your message has not been sent.";

    // Preserve entered values or reset form cleanly
    contactForm.reset();
    updateCharCounter();
  });
});
