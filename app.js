"use strict";
const AppState = (() => {
  const STORAGE_KEY = "workflowx_data";
  const listeners = [];

  const defaults = {
    user: {
      id: "u1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@workflowx.com",
      role: "Product Manager",
      department: "Product",
      bio: "Passionate product manager with 5+ years of experience building enterprise software.",
      initials: "JD",
      theme: "dark",
      accent: "#7c3aed",
      notifSettings: {
        taskUpdates: true,
        kudos: true,
        meetings: true,
        mentions: true,
        weeklyReport: false,
      },
      privacySettings: { showOnline: true, shareActivity: true, allowDM: true },
      loginTime: Date.now(),
    },
    tasks: [
      {
        id: "t1",
        title: "Finalize Q3 roadmap",
        col: "inprogress",
        priority: "high",
        assignee: "John Doe",
        due: "2026-07-15",
        desc: "Complete product roadmap for Q3 deliverables",
        done: false,
      },
      {
        id: "t2",
        title: "UI review with design team",
        col: "todo",
        priority: "medium",
        assignee: "John Doe",
        due: "2026-07-12",
        desc: "Review new dashboard designs",
        done: false,
      },
      {
        id: "t3",
        title: "Update API documentation",
        col: "backlog",
        priority: "low",
        assignee: "Mike Chen",
        due: "2026-07-20",
        desc: "Document all new REST endpoints",
        done: false,
      },
      {
        id: "t4",
        title: "Deploy v2.1 to staging",
        col: "done",
        priority: "high",
        assignee: "Sara Kim",
        due: "2026-07-10",
        desc: "Deploy new version to staging environment",
        done: true,
      },
      {
        id: "t5",
        title: "Customer feedback analysis",
        col: "todo",
        priority: "high",
        assignee: "John Doe",
        due: "2026-07-13",
        desc: "Analyze Q2 customer feedback survey results",
        done: false,
      },
      {
        id: "t6",
        title: "Performance optimization",
        col: "backlog",
        priority: "medium",
        assignee: "Alex Rivera",
        due: "2026-07-25",
        desc: "Optimize database query performance",
        done: false,
      },
      {
        id: "t7",
        title: "Onboard new team member",
        col: "done",
        priority: "medium",
        assignee: "John Doe",
        due: "2026-07-08",
        desc: "Set up accounts and walkthrough for new hire",
        done: true,
      },
    ],
    projects: [
      {
        id: "p1",
        name: "WorkFlowX 3.0",
        desc: "Next-gen enterprise workspace with AI-powered features",
        priority: "High",
        status: "active",
        progress: 68,
        due: "2026-09-30",
        assignees: ["JD", "MK", "SK", "AR"],
      },
      {
        id: "p2",
        name: "Mobile App Redesign",
        desc: "Complete overhaul of the mobile experience",
        priority: "High",
        status: "active",
        progress: 42,
        due: "2026-08-15",
        assignees: ["PR", "JD", "LM"],
      },
      {
        id: "p3",
        name: "Analytics Dashboard v2",
        desc: "Real-time analytics with custom chart builder",
        priority: "Medium",
        status: "active",
        progress: 85,
        due: "2026-07-31",
        assignees: ["MK", "TN"],
      },
      {
        id: "p4",
        name: "API Gateway Migration",
        desc: "Migrate from REST to GraphQL architecture",
        priority: "Medium",
        status: "on-hold",
        progress: 30,
        due: "2026-10-15",
        assignees: ["AR", "SK"],
      },
      {
        id: "p5",
        name: "Security Audit 2026",
        desc: "Annual penetration testing and security review",
        priority: "High",
        status: "completed",
        progress: 100,
        due: "2026-06-30",
        assignees: ["JD", "CS"],
      },
      {
        id: "p6",
        name: "Customer Portal",
        desc: "Self-service customer support portal",
        priority: "Low",
        status: "active",
        progress: 15,
        due: "2026-11-01",
        assignees: ["LM", "PR"],
      },
    ],
    messages: {
      general: [
        {
          id: "m1",
          sender: "Sara Kim",
          initials: "SK",
          text: "Good morning team! Ready for the sprint review today? 🚀",
          time: "09:02 AM",
          mine: false,
          reactions: ["👍 3", "🎉 2"],
        },
        {
          id: "m2",
          sender: "Mike Chen",
          initials: "MC",
          text: "Absolutely! I pushed the final fixes for the dashboard last night.",
          time: "09:08 AM",
          mine: false,
          reactions: ["✅ 4"],
        },
        {
          id: "m3",
          sender: "John Doe",
          initials: "JD",
          text: "Great work Mike! Let me know if we need to update the release notes.",
          time: "09:15 AM",
          mine: true,
          reactions: [],
        },
        {
          id: "m4",
          sender: "Alex Rivera",
          initials: "AR",
          text: "The analytics module is done and tested. Ready for review! 📊",
          time: "09:22 AM",
          mine: false,
          reactions: ["🔥 5", "💡 2"],
        },
        {
          id: "m5",
          sender: "Priya Sharma",
          initials: "PS",
          text: "@John can you review my PR before the standup?",
          time: "09:35 AM",
          mine: false,
          reactions: [],
        },
      ],
      dev: [
        {
          id: "d1",
          sender: "Alex Rivera",
          initials: "AR",
          text: "CI pipeline is green 🟢. All 247 tests passing.",
          time: "08:45 AM",
          mine: false,
          reactions: ["✅ 6"],
        },
        {
          id: "d2",
          sender: "Mike Chen",
          initials: "MC",
          text: "Found a memory leak in the worker thread, pushing fix now.",
          time: "09:00 AM",
          mine: false,
          reactions: ["💡 3"],
        },
      ],
      design: [
        {
          id: "ds1",
          sender: "Priya Sharma",
          initials: "PS",
          text: "New design system components are in Figma. Take a look! ✨",
          time: "10:00 AM",
          mine: false,
          reactions: ["❤️ 8"],
        },
      ],
      random: [
        {
          id: "r1",
          sender: "Sara Kim",
          initials: "SK",
          text: "Who's up for team lunch Friday? 🍕",
          time: "11:30 AM",
          mine: false,
          reactions: ["🎉 7", "👍 5"],
        },
        {
          id: "r2",
          sender: "John Doe",
          initials: "JD",
          text: "I'm in! Let's go to that new Italian place.",
          time: "11:32 AM",
          mine: true,
          reactions: ["😂 2"],
        },
      ],
    },
    meetings: [
      {
        id: "mt1",
        title: "Sprint Review & Planning",
        desc: "Q3 sprint review followed by Q4 planning session",
        date: "2026-07-12",
        time: "10:00",
        duration: 90,
        platform: "Zoom",
        attendees: ["John Doe", "Sara Kim", "Mike Chen", "Alex Rivera"],
      },
      {
        id: "mt2",
        title: "Product Roadmap Discussion",
        desc: "Aligning on the 2026 H2 product roadmap",
        date: "2026-07-14",
        time: "14:00",
        duration: 60,
        platform: "Google Meet",
        attendees: ["John Doe", "Priya Sharma"],
      },
      {
        id: "mt3",
        title: "One-on-One with Manager",
        desc: "Weekly sync with direct manager",
        date: "2026-07-15",
        time: "11:00",
        duration: 30,
        platform: "Teams",
        attendees: ["John Doe", "Chris Stone"],
      },
      {
        id: "mt4",
        title: "Design Handoff",
        desc: "Q2 design system handoff meeting",
        date: "2026-06-30",
        time: "15:00",
        duration: 60,
        platform: "Zoom",
        attendees: ["John Doe", "Priya Sharma", "Sara Kim"],
      },
    ],
    events: [
      {
        id: "ev1",
        title: "Sprint Review",
        date: "2026-07-12",
        time: "10:00",
        type: "meeting",
      },
      {
        id: "ev2",
        title: "API Deadline",
        date: "2026-07-15",
        time: "18:00",
        type: "deadline",
      },
      {
        id: "ev3",
        title: "Team Lunch",
        date: "2026-07-11",
        time: "12:30",
        type: "event",
      },
      {
        id: "ev4",
        title: "Quarterly OKR Review",
        date: "2026-07-20",
        time: "09:00",
        type: "meeting",
      },
      {
        id: "ev5",
        title: "Submit Expense Report",
        date: "2026-07-31",
        time: "17:00",
        type: "reminder",
      },
    ],

    notes: [
      {
        id: "n1",
        title: "Q3 Product Strategy",
        body: "<h2>Goals</h2><ul><li>Increase user retention by 25%</li><li>Launch mobile v2</li><li>Integrate AI features</li></ul>",
        tags: ["strategy", "q3"],
        pinned: true,
        updatedAt: Date.now() - 3600000,
      },
      {
        id: "n2",
        title: "Meeting Notes – Sprint Review",
        body: "<p>Discussed sprint velocity, blockers, and upcoming deliverables. Team capacity looks good for Q3.</p>",
        tags: ["meeting"],
        pinned: false,
        updatedAt: Date.now() - 86400000,
      },
      {
        id: "n3",
        title: "Tech Stack Evaluation",
        body: "<p>Comparing React vs Vue for the new internal tools project. Need to consider team expertise and ecosystem.</p>",
        tags: ["tech", "research"],
        pinned: false,
        updatedAt: Date.now() - 172800000,
      },
    ],
    timeline: [
      {
        id: "tl1",
        type: "task",
        text: "Completed task <strong>Deploy v2.1 to staging</strong>",
        time: "2 hours ago",
      },
      {
        id: "tl2",
        type: "kudos",
        text: "Received kudos from <strong>Sara Kim</strong> for Leadership",
        time: "3 hours ago",
      },
      {
        id: "tl3",
        type: "meeting",
        text: "Joined <strong>Design Handoff</strong> meeting",
        time: "1 day ago",
      },
      {
        id: "tl4",
        type: "task",
        text: "Created task <strong>Customer feedback analysis</strong>",
        time: "1 day ago",
      },
      {
        id: "tl5",
        type: "note",
        text: "Updated note <strong>Q3 Product Strategy</strong>",
        time: "2 days ago",
      },
      {
        id: "tl6",
        type: "task",
        text: "Completed task <strong>Onboard new team member</strong>",
        time: "3 days ago",
      },
      {
        id: "tl7",
        type: "kudos",
        text: "Sent kudos to <strong>Priya Sharma</strong> for Above & Beyond",
        time: "5 days ago",
      },
    ],
    employees: [
      {
        id: "e1",
        name: "Sara Kim",
        role: "Senior Engineer",
        dept: "Engineering",
        online: true,
        email: "sara@workflowx.com",
        skills: ["React", "Node.js", "AWS"],
        kudos: 24,
      },
      {
        id: "e2",
        name: "Mike Chen",
        role: "Full Stack Developer",
        dept: "Engineering",
        online: true,
        email: "mike@workflowx.com",
        skills: ["Python", "Docker", "GraphQL"],
        kudos: 18,
      },
      {
        id: "e3",
        name: "Priya Sharma",
        role: "Lead Designer",
        dept: "Design",
        online: false,
        email: "priya@workflowx.com",
        skills: ["Figma", "UX", "Prototyping"],
        kudos: 31,
      },
      {
        id: "e4",
        name: "Alex Rivera",
        role: "DevOps Engineer",
        dept: "Engineering",
        online: true,
        email: "alex@workflowx.com",
        skills: ["Kubernetes", "Terraform", "CI/CD"],
        kudos: 15,
      },
      {
        id: "e5",
        name: "Chris Stone",
        role: "Engineering Manager",
        dept: "Engineering",
        online: false,
        email: "chris@workflowx.com",
        skills: ["Leadership", "Architecture", "Agile"],
        kudos: 42,
      },
      {
        id: "e6",
        name: "Lily Morgan",
        role: "Marketing Lead",
        dept: "Marketing",
        online: true,
        email: "lily@workflowx.com",
        skills: ["SEO", "Content", "Analytics"],
        kudos: 11,
      },
      {
        id: "e7",
        name: "Tom Nguyen",
        role: "Data Analyst",
        dept: "Finance",
        online: false,
        email: "tom@workflowx.com",
        skills: ["SQL", "Tableau", "Python"],
        kudos: 9,
      },
      {
        id: "e8",
        name: "Zoe Park",
        role: "HR Manager",
        dept: "HR",
        online: true,
        email: "zoe@workflowx.com",
        skills: ["Recruiting", "L&D", "Culture"],
        kudos: 27,
      },
      {
        id: "e9",
        name: "Ryan Walsh",
        role: "Sales Director",
        dept: "Sales",
        online: true,
        email: "ryan@workflowx.com",
        skills: ["B2B", "CRM", "Strategy"],
        kudos: 13,
      },
      {
        id: "e10",
        name: "Nina Patel",
        role: "Product Designer",
        dept: "Design",
        online: false,
        email: "nina@workflowx.com",
        skills: ["UI", "Motion", "Accessibility"],
        kudos: 19,
      },
    ],
    notifications: [
      {
        id: "nt2",
        icon: "✅",
        text: 'Your task "Deploy v2.1" was completed',
        time: "4h ago",
        read: false,
      },
      {
        id: "nt3",
        icon: "🎥",
        text: "Sprint Review starts in 30 minutes",
        time: "5h ago",
        read: false,
      },
      {
        id: "nt4",
        icon: "💬",
        text: "Mike Chen mentioned you in #general",
        time: "1d ago",
        read: true,
      },
    ],
    widgetOrder: ["tasks", "meetings", "heatmap", "goals"],
    widgetVisible: {
      tasks: true,
      meetings: true,
      heatmap: true,
      goals: true,
    },
    goals: [
      { label: "Tasks Completed", current: 7, target: 10 },
      { label: "PRs Reviewed", current: 4, target: 5 },
      { label: "Docs Written", current: 2, target: 3 },
      { label: "Bugs Fixed", current: 3, target: 4 },
    ],
    activeChannel: "general",
    currentNote: null,
    calYear: new Date().getFullYear(),
    calMonth: new Date().getMonth(),
  };

  let state = {};

  function load(silent = false) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      state = deepMerge(defaults, saved);
    } catch (e) {
      state = JSON.parse(JSON.stringify(defaults));
    }
    if (!silent) notify("load");
  }

  function save(keyModified = "all") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      notify(keyModified);
    } catch (e) {}
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }

  function notify(key) {
    listeners.forEach((fn) => fn(key, state));
  }

  function get(key) {
    return key ? state[key] : state;
  }

  function set(key, value, silent = false) {
    state[key] = value;
    if (!silent) save(key);
  }

  function update(key, updater, silent = false) {
    state[key] = updater(state[key]);
    if (!silent) save(key);
  }

  function deepMerge(target, source) {
    const out = Object.assign({}, target);
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        out[key] = deepMerge(target[key] || {}, source[key]);
      } else if (source[key] !== undefined) {
        out[key] = source[key];
      }
    }
    return out;
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    state = JSON.parse(JSON.stringify(defaults));
    notify("reset");
  }

  return { load, save, get, set, update, subscribe, reset };
})();

/* ════════════════════════════════════════════════════════════
   UTILITY HELPERS
════════════════════════════════════════════════════════════ */
const Utils = {
  id: () => "_" + Math.random().toString(36).slice(2, 9),

  initials: (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),

  relativeTime: (ts) => {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  },

  formatDate: (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  },

  today: () => new Date().toISOString().split("T")[0],

  greet: () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  },

  countBy: (arr, keyFn) =>
    arr.reduce((acc, item) => {
      const k = keyFn(item);
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {}),

  animateCount: (el, target, duration = 800) => {
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  el: (id) => document.getElementById(id),

  make: (tag, cls, html) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  },

  empty: (el) => {
    if (el) el.innerHTML = "";
  },

  debounce: (fn, ms) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  },

  priorityColor: (p) => {
    const map = {
      high: "var(--red)",
      medium: "var(--gold)",
      low: "var(--green)",
    };
    return map[(p || "").toLowerCase()] || "var(--text-muted)";
  },
};

/* ════════════════════════════════════════════════════════════
   AUTHENTICATION
════════════════════════════════════════════════════════════ */
const Auth = (() => {
  const DEMO = { email: "admin@workflowx.com", password: "password123" };
  const SESSION_KEY = "workflowx_session";

  function isLoggedIn() {
    return !!localStorage.getItem(SESSION_KEY);
  }

  function init() {
    AppState.load(true);
    if (isLoggedIn()) {
      showApp();
    } else {
      Utils.el("auth-screen").classList.remove("hidden");
    }
  }

  function login(e) {
    e.preventDefault();
    const email = Utils.el("login-email").value.trim();
    const pass = Utils.el("login-password").value;
    const btn = Utils.el("login-btn");

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Signing in…';

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("workflowx_users") || "[]");
      const existing = users.find(
        (u) => u.email === email && u.password === pass,
      );
      const isDemo = email === DEMO.email && pass === DEMO.password;

      if (isDemo || existing) {
        if (existing) {
          const u = AppState.get("user");
          u.firstName = existing.firstName;
          u.lastName = existing.lastName;
          u.email = existing.email;
          u.role = existing.role;
          u.initials = Utils.initials(
            existing.firstName + " " + existing.lastName,
          );
          AppState.set("user", u);
        }
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ email, loginAt: Date.now() }),
        );
        showApp();
        Notifications.toast(
          "Welcome back! 👋",
          `Logged in as ${email}`,
          "success",
        );
      } else {
        Notifications.toast(
          "Login Failed",
          "Invalid email or password.",
          "error",
        );
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-text">Sign In</span>';
      }
    }, 900);
  }

  function register(e) {
    e.preventDefault();
    const firstName = Utils.el("reg-firstname").value.trim();
    const lastName = Utils.el("reg-lastname").value.trim();
    const email = Utils.el("reg-email").value.trim();
    const role = Utils.el("reg-role").value.trim();
    const password = Utils.el("reg-password").value;

    const users = JSON.parse(localStorage.getItem("workflowx_users") || "[]");
    if (users.find((u) => u.email === email)) {
      Notifications.toast(
        "Error",
        "An account with this email already exists.",
        "error",
      );
      return;
    }

    users.push({ firstName, lastName, email, role, password });
    localStorage.setItem("workflowx_users", JSON.stringify(users));

    const u = AppState.get("user");
    Object.assign(u, {
      firstName,
      lastName,
      email,
      role,
      initials: Utils.initials(firstName + " " + lastName),
    });
    AppState.set("user", u);
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email, loginAt: Date.now() }),
    );
    showApp();
    Notifications.toast(
      "Account Created! 🎉",
      `Welcome to WorkFlowX, ${firstName}!`,
      "success",
    );
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    Utils.el("app-shell").classList.add("hidden");
    Utils.el("auth-screen").classList.remove("hidden");
    switchForm("login");
    Notifications.toast("Signed out", "See you next time!", "info");
  }

  function showApp() {
    Utils.el("auth-screen").classList.add("hidden");
    Utils.el("app-shell").classList.remove("hidden");
    App.init();
  }

  function switchForm(which) {
    Utils.el("login-form").classList.toggle("active", which === "login");
    Utils.el("register-form").classList.toggle("active", which === "register");
  }

  function togglePwd(inputId, btn) {
    const inp = Utils.el(inputId);
    if (inp.type === "password") {
      inp.type = "text";
      btn.textContent = "🙈";
    } else {
      inp.type = "password";
      btn.textContent = "👁";
    }
  }

  function showForgot() {
    Notifications.toast(
      "Password Reset",
      "Demo: Use admin@workflowx.com / password123",
      "info",
    );
  }

  return {
    init,
    login,
    register,
    logout,
    showApp,
    switchForm,
    togglePwd,
    showForgot,
  };
})();

/* ════════════════════════════════════════════════════════════
   ROUTER — Hash-based SPA navigation
════════════════════════════════════════════════════════════ */
const Router = (() => {
  const SECTION_LABELS = {
    dashboard: "Dashboard",
    analytics: "Analytics",
    projects: "Projects",
    kanban: "Kanban Board",
    chat: "Team Chat",
    calendar: "Calendar",
    meetings: "Meeting Scheduler",
    recognition: "Peer Recognition",
    directory: "Employee Directory",
    notes: "Notes",
    timeline: "Activity Timeline",
    profile: "My Profile",
    settings: "Settings",
  };

  let current = "dashboard";

  function navigate(section) {
    if (!SECTION_LABELS[section]) section = "dashboard";

    document
      .querySelectorAll(".page-section")
      .forEach((s) => s.classList.remove("active"));
    const target = Utils.el(`section-${section}`);
    if (target) target.classList.add("active");

    document.querySelectorAll(".nav-item").forEach((n) => {
      n.classList.toggle("active", n.dataset.section === section);
    });

    Utils.el("breadcrumb").textContent = SECTION_LABELS[section];
    document.title = `WorkFlowX | ${SECTION_LABELS[section]}`;
    current = section;

    renderActiveSection();
    if (window.innerWidth <= 768) UI.closeSidebar();
  }

  function renderActiveSection() {
    const lazyRender = {
      dashboard: () => Dashboard.renderAll(),
      analytics: () => Analytics.render(),
      kanban: () => Kanban.render(),
      calendar: () => CalendarApp.render(),
      directory: () => Directory.render(),
      recognition: () => Recognition.render(),
      timeline: () => Timeline.render(),
      profile: () => Profile.render(),
      notes: () => Notes.render(),
      chat: () => Chat.render(),
      projects: () => Projects.render(),
      meetings: () => MeetingsApp.render(),
    };
    if (lazyRender[current]) lazyRender[current]();
  }

  function getCurrent() {
    return current;
  }

  return { navigate, getCurrent, renderActiveSection };
})();

/* ════════════════════════════════════════════════════════════
   UI — Theme, sidebar, global interactions
════════════════════════════════════════════════════════════ */
const UI = (() => {
  function init() {
    const user = AppState.get("user");
    applyTheme(user.theme);
    if (user.accent) applyAccent(user.accent);
    updateUserMeta();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = Utils.el("theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀";
    const darkBtn = Utils.el("theme-dark-btn");
    const lightBtn = Utils.el("theme-light-btn");
    if (darkBtn) darkBtn.classList.toggle("active", theme === "dark");
    if (lightBtn) lightBtn.classList.toggle("active", theme === "light");
  }

  function setTheme(theme, btn) {
    const u = AppState.get("user");
    u.theme = theme;
    AppState.set("user", u);
    applyTheme(theme);
    document
      .querySelectorAll(".theme-option")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  }

  function applyAccent(color) {
    document.documentElement.style.setProperty("--accent", color);
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty(
      "--accent-glow",
      `rgba(${r},${g},${b},0.35)`,
    );
    document.documentElement.style.setProperty(
      "--accent-light",
      lighten(color, 30),
    );
    document.documentElement.style.setProperty(
      "--accent-dark",
      darken(color, 20),
    );
  }

  function setAccent(color, el) {
    const u = AppState.get("user");
    u.accent = color;
    AppState.set("user", u);
    applyAccent(color);
    document
      .querySelectorAll(".accent-dot")
      .forEach((d) => d.classList.remove("active"));
    if (el) el.classList.add("active");
  }

  function lighten(hex, pct) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + Math.round(pct * 2.55));
    const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(pct * 2.55));
    const b = Math.min(255, (n & 0xff) + Math.round(pct * 2.55));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function darken(hex, pct) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (n >> 16) - Math.round(pct * 2.55));
    const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(pct * 2.55));
    const b = Math.max(0, (n & 0xff) - Math.round(pct * 2.55));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function setFontSize(size) {
    const map = { small: "13px", medium: "15px", large: "17px" };
    document.documentElement.style.fontSize = map[size] || "15px";
  }

  function updateUserMeta() {
    const u = AppState.get("user");
    const fullName = `${u.firstName} ${u.lastName}`;
    const initials = u.initials || Utils.initials(fullName);

    const els = {
      "sidebar-avatar": initials,
      "sidebar-name": fullName,
      "sidebar-role": u.role,
      "topbar-avatar": initials,
    };
    for (const [id, val] of Object.entries(els)) {
      const el = Utils.el(id);
      if (el) el.textContent = val;
    }
  }

  function toggleSidebar() {
    const sidebar = Utils.el("sidebar");
    const overlay = document.querySelector(".sidebar-overlay");
    const isOpen = sidebar.classList.contains("open");
    sidebar.classList.toggle("open", !isOpen);
    if (overlay) overlay.classList.toggle("show", !isOpen);
  }

  function closeSidebar() {
    Utils.el("sidebar").classList.remove("open");
    const overlay = document.querySelector(".sidebar-overlay");
    if (overlay) overlay.classList.remove("show");
  }

  return {
    init,
    applyTheme,
    setTheme,
    toggleTheme,
    setAccent,
    applyAccent,
    setFontSize,
    updateUserMeta,
    toggleSidebar,
    closeSidebar,
  };
})();

/* ════════════════════════════════════════════════════════════
   APP — Main Real-Time Initialization & Synchronizer
════════════════════════════════════════════════════════════ */
const App = (() => {
  function init() {
    UI.init();
    setupKeyboardShortcuts();
    setupSidebarOverlay();
    Dashboard.init();
    Notifications.init();
    Settings.init();
    Router.navigate("dashboard");

    // Start Real-Time Pub/Sub & Simulation
    initRealTimeEngine();
  }

  function initRealTimeEngine() {
    // 1. Subscribe to AppState changes: Refresh UI components across modules automatically
    AppState.subscribe((key) => {
      UI.updateUserMeta();
      Notifications.updateBadge();

      // Auto-refresh the currently visible SPA view
      Router.renderActiveSection();

      // Update persistent dashboard stats in the background
      if (Router.getCurrent() !== "dashboard") {
        Dashboard.renderStats();
      }
    });

    // 2. Cross-Tab Synchronization: Sync state instantly when modified in another window/tab
    window.addEventListener("storage", (e) => {
      if (e.key === "workflowx_data") {
        AppState.load(true); // silent reload
        UI.updateUserMeta();
        Notifications.updateBadge();
        Router.renderActiveSection();
        Notifications.toast(
          "Live Sync 🔄",
          "Workspace updated from another tab.",
          "info",
        );
      }
    });

    // 3. Background Activity Simulator (Emulates WebSockets)
    startLiveActivitySimulator();
  }

  function startLiveActivitySimulator() {
    // Randomly toggle employee online/offline status every 25 seconds
    setInterval(() => {
      AppState.update(
        "employees",
        (emps) => {
          const idx = Math.floor(Math.random() * emps.length);
          emps[idx].online = !emps[idx].online;
          return emps;
        },
        true,
      );
      if (Router.getCurrent() === "directory") Directory.render();
    }, 25000);

    // Randomly generate peer recognition (kudos) every 45 seconds
    setInterval(() => {
      const emps = AppState.get("employees");
      const from = emps[Math.floor(Math.random() * emps.length)];
      let to = emps[Math.floor(Math.random() * emps.length)];
      while (to.id === from.id)
        to = emps[Math.floor(Math.random() * emps.length)];

      const categories = [
        "Innovation",
        "Leadership",
        "Teamwork",
        "Above & Beyond",
      ];
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const kudo = {
        id: Utils.id(),
        from: from.name,
        fromInit: Utils.initials(from.name),
        to: to.name,
        toInit: Utils.initials(to.name),
        category: cat,
        message: `Great job on the recent sprint deliverables! Keeping our momentum strong. 🚀`,
        time: "Just now",
        reactions: { "🔥": 1 },
      };

      AppState.update("kudos", (ks) => [kudo, ...ks]);
      Dashboard.addToTimeline(
        "kudos",
        `<strong>${from.name}</strong> sent kudos to <strong>${to.name}</strong>`,
      );
      Notifications.addNotification(
        "🏆",
        `${from.name} sent kudos to ${to.name}`,
      );
    }, 45000);
  }

  function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        Search.open();
      }
      if (e.key === "Escape") {
        Search.close();
        Notifications.closeDropdown();
        closeAllModals();
      }
    });
  }

  function setupSidebarOverlay() {
    const overlay = Utils.make("div", "sidebar-overlay");
    overlay.onclick = () => UI.closeSidebar();
    document.body.appendChild(overlay);
  }

  function closeAllModals() {
    document
      .querySelectorAll(".modal-overlay")
      .forEach((m) => m.classList.add("hidden"));
  }

  return { init, closeAllModals };
})();

/* ════════════════════════════════════════════════════════════
   NOTIFICATIONS — Toast + Bell center
════════════════════════════════════════════════════════════ */
const Notifications = (() => {
  function init() {
    renderList();
    updateBadge();
  }

  function renderList() {
    const list = Utils.el("notif-list");
    if (!list) return;
    Utils.empty(list);
    const notifs = AppState.get("notifications");
    notifs.forEach((n) => {
      const item = Utils.make("div", `notif-item${n.read ? "" : " unread"}`);
      item.innerHTML = `
        <div class="notif-icon">${n.icon}</div>
        <div class="notif-content">
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>`;
      item.onclick = () => {
        n.read = true;
        AppState.save("notifications");
        renderList();
        updateBadge();
      };
      list.appendChild(item);
    });
  }

  function updateBadge() {
    const unread = AppState.get("notifications").filter((n) => !n.read).length;
    const badge = Utils.el("notif-count");
    if (badge) {
      badge.textContent = unread;
      badge.classList.toggle("hidden", unread === 0);
    }
  }

  function toggle() {
    const dd = Utils.el("notif-dropdown");
    dd.classList.toggle("hidden");
    if (!dd.classList.contains("hidden")) renderList();
  }

  function closeDropdown() {
    const dd = Utils.el("notif-dropdown");
    if (dd) dd.classList.add("hidden");
  }

  function markAllRead() {
    AppState.update("notifications", (notifs) =>
      notifs.map((n) => ({ ...n, read: true })),
    );
    renderList();
    updateBadge();
    Notifications.toast("Done", "All notifications marked as read.", "info");
  }

  function addNotification(icon, text) {
    const notif = { id: Utils.id(), icon, text, time: "Just now", read: false };
    AppState.update("notifications", (n) => [notif, ...n]);
    updateBadge();
    const dd = Utils.el("notif-dropdown");
    if (dd && !dd.classList.contains("hidden")) renderList();
  }

  function toast(title, msg, type = "info") {
    const icons = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
    const container = Utils.el("toast-container");
    if (!container) return;
    const toast = Utils.make("div", `toast ${type}`);
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        ${msg ? `<div class="toast-msg">${msg}</div>` : ""}
      </div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("out");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  return {
    init,
    toggle,
    closeDropdown,
    markAllRead,
    addNotification,
    toast,
    updateBadge,
  };
})();

/* ════════════════════════════════════════════════════════════
   GLOBAL SEARCH
════════════════════════════════════════════════════════════ */
const Search = (() => {
  function open() {
    Utils.el("search-overlay").classList.remove("hidden");
    setTimeout(() => Utils.el("global-search-input").focus(), 50);
    query("");
  }

  function close() {
    Utils.el("search-overlay").classList.add("hidden");
    Utils.el("global-search-input").value = "";
    Utils.empty(Utils.el("search-results"));
  }

  function closeIfOutside(e) {
    if (e.target.classList.contains("search-overlay")) close();
  }

  function query(q) {
    const results = [];
    const s = q.toLowerCase();

    if (!s) {
      const suggestions = [
        { icon: "⊞", label: "Dashboard", type: "Page", action: "dashboard" },
        { icon: "⬛", label: "Kanban Board", type: "Page", action: "kanban" },
        { icon: "📊", label: "Analytics", type: "Page", action: "analytics" },
        { icon: "💬", label: "Team Chat", type: "Page", action: "chat" },
      ];
      renderResults(suggestions);
      return;
    }

    AppState.get("employees").forEach((e) => {
      if (
        e.name.toLowerCase().includes(s) ||
        e.role.toLowerCase().includes(s)
      ) {
        results.push({
          icon: Utils.initials(e.name),
          label: e.name,
          type: `${e.role} · ${e.dept}`,
          action: "directory",
          bg: "var(--accent-glow)",
        });
      }
    });

    AppState.get("tasks").forEach((t) => {
      if (t.title.toLowerCase().includes(s)) {
        results.push({
          icon: "✓",
          label: t.title,
          type: `Task · ${t.col}`,
          action: "kanban",
          bg: "var(--cyan-glow)",
        });
      }
    });

    AppState.get("projects").forEach((p) => {
      if (p.name.toLowerCase().includes(s)) {
        results.push({
          icon: "📁",
          label: p.name,
          type: `Project · ${p.status}`,
          action: "projects",
          bg: "var(--green-glow)",
        });
      }
    });

    AppState.get("notes").forEach((n) => {
      if (n.title.toLowerCase().includes(s)) {
        results.push({
          icon: "📝",
          label: n.title,
          type: "Note",
          action: "notes",
          bg: "rgba(245,158,11,0.2)",
        });
      }
    });

    renderResults(results.slice(0, 8));
  }

  function renderResults(items) {
    const container = Utils.el("search-results");
    if (!container) return;
    Utils.empty(container);
    if (!items.length) {
      container.innerHTML =
        '<div style="padding:2rem;text-align:center;color:var(--text-muted)">No results found</div>';
      return;
    }
    items.forEach((item) => {
      const el = Utils.make("div", "search-result-item");
      el.innerHTML = `
        <div class="search-result-icon" style="background:${item.bg || "rgba(255,255,255,0.08)"}">
          ${item.icon.length <= 2 ? item.icon : item.icon}
        </div>
        <div>
          <div class="search-result-label">${item.label}</div>
          <div class="search-result-type">${item.type}</div>
        </div>`;
      el.onclick = () => {
        Router.navigate(item.action);
        close();
      };
      container.appendChild(el);
    });
  }

  return { open, close, closeIfOutside, query };
})();

/* ════════════════════════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════════════════════════ */
const Dashboard = (() => {
  function init() {
    renderAll();
    initWidgetDnD();
    initWeekLabel();
  }

  function renderAll() {
    renderGreeting();
    renderStats();
    renderMyTasks();
    renderUpcomingMeetings();
    renderActivityFeed();
    renderHeatmap();
    renderGoals();
    renderGauge();
  }

  function renderGreeting() {
    const u = AppState.get("user");
    const el = Utils.el("dashboard-greeting");
    if (el) el.textContent = `${Utils.greet()}, ${u.firstName} 👋`;
  }

  function renderStats() {
    const tasks = AppState.get("tasks");
    const done = tasks.filter((t) => t.done || t.col === "done").length;
    const projects = AppState.get("projects").filter(
      (p) => p.status === "active",
    ).length;
    const todayMeetings = AppState.get("meetings").filter(
      (m) => m.date === Utils.today(),
    ).length;
    const kudosReceived = AppState.get("kudos").filter(
      (k) =>
        k.to ===
        `${AppState.get("user").firstName} ${AppState.get("user").lastName}`,
    ).length;

    const animEl = (id, val) => {
      const el = Utils.el(id);
      if (el) Utils.animateCount(el, val);
    };
    animEl("stat-tasks-val", done);
    animEl("stat-projects-val", projects);
    animEl("stat-meetings-val", todayMeetings);
    animEl("stat-kudos-val", kudosReceived);
  }

  function renderMyTasks() {
    const container = Utils.el("my-tasks-list");
    if (!container) return;
    Utils.empty(container);
    const tasks = AppState.get("tasks")
      .filter((t) => t.assignee.includes(AppState.get("user").firstName))
      .slice(0, 5);
    tasks.forEach((task) => {
      const item = Utils.make("div", "my-task-item");
      const isDone = task.done || task.col === "done";
      item.innerHTML = `
        <div class="task-check ${isDone ? "done" : ""}" onclick="Dashboard.toggleTask('${task.id}')"></div>
        <span class="my-task-text ${isDone ? "done" : ""}">${task.title}</span>
        <span class="badge-subtle" style="font-size:0.68rem;padding:0.1rem 0.4rem;color:${Utils.priorityColor(task.priority)}">${task.priority}</span>`;
      container.appendChild(item);
    });
    if (!tasks.length) {
      container.innerHTML =
        '<div style="color:var(--text-muted);font-size:0.82rem;padding:0.5rem 0">No tasks assigned today</div>';
    }
  }

  function toggleTask(id) {
    const tasks = AppState.get("tasks");
    const t = tasks.find((t) => t.id === id);
    if (t) {
      t.done = !t.done;
      t.col = t.done ? "done" : "todo";
      AppState.set("tasks", tasks);
      addToTimeline("task", `Completed task <strong>${t.title}</strong>`);
      Notifications.toast(
        "Task updated! ✅",
        t.done ? `"${t.title}" marked done.` : `"${t.title}" reopened.`,
        "success",
      );
    }
  }

  function quickAddTask(e) {
    if (e.key !== "Enter") return;
    const input = Utils.el("quick-task-input");
    const title = input.value.trim();
    if (!title) return;
    const u = AppState.get("user");
    const task = {
      id: Utils.id(),
      title,
      col: "todo",
      priority: "medium",
      assignee: `${u.firstName} ${u.lastName}`,
      due: "",
      desc: "",
      done: false,
    };
    AppState.update("tasks", (t) => [task, ...t]);
    input.value = "";
    addToTimeline("task", `Created task <strong>${title}</strong>`);
    Notifications.toast("Task added! 📌", title, "info");
  }

  function renderUpcomingMeetings() {
    const container = Utils.el("upcoming-meetings-list");
    if (!container) return;
    Utils.empty(container);
    const today = Utils.today();
    const meetings = AppState.get("meetings")
      .filter((m) => m.date >= today)
      .slice(0, 3);
    meetings.forEach((m) => {
      const item = Utils.make("div", "upcoming-item");
      item.innerHTML = `
        <div class="upcoming-item-title">${m.title}</div>
        <div class="upcoming-item-time">📅 ${Utils.formatDate(m.date)} · ${m.time} · ${m.platform}</div>`;
      container.appendChild(item);
    });
    if (!meetings.length) {
      container.innerHTML =
        '<div style="color:var(--text-muted);font-size:0.82rem">No upcoming meetings</div>';
    }
  }

  function renderActivityFeed() {
    const container = Utils.el("activity-feed");
    if (!container) return;
    Utils.empty(container);
    const colors = {
      task: "var(--cyan)",
      kudos: "var(--gold)",
      meeting: "var(--green)",
      note: "var(--pink)",
    };
    AppState.get("timeline")
      .slice(0, 6)
      .forEach((item) => {
        const el = Utils.make("div", "activity-item");
        el.innerHTML = `
        <div class="activity-dot" style="background:${colors[item.type] || "var(--accent)"}"></div>
        <div class="activity-content">
          <div>${item.text}</div>
          <div class="activity-time">${item.time}</div>
        </div>`;
        container.appendChild(el);
      });
  }

  function renderHeatmap() {
    const container = Utils.el("heatmap-container");
    if (!container) return;
    Utils.empty(container);
    const cells = 84;
    for (let i = 0; i < cells; i++) {
      const level = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 5);
      const cell = Utils.make("div", "heat-cell");
      if (level > 0) cell.setAttribute("data-level", level);
      cell.title = `${level * 2} contributions`;
      container.appendChild(cell);
    }
  }

  function renderGoals() {
    const container = Utils.el("goals-list");
    if (!container) return;
    Utils.empty(container);
    AppState.get("goals").forEach((g) => {
      const pct = Math.round((g.current / g.target) * 100);
      const el = Utils.make("div", "goal-item");
      el.innerHTML = `
        <div class="goal-meta">
          <span class="goal-label">${g.label}</span>
          <span class="goal-pct">${g.current}/${g.target} · ${pct}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${pct >= 100 ? "green" : pct >= 60 ? "" : "gold"}" style="width:0%" data-target="${pct}%"></div>
        </div>`;
      container.appendChild(el);
      setTimeout(() => {
        const fill = el.querySelector(".progress-fill");
        if (fill) fill.style.width = fill.dataset.target;
      }, 150);
    });
  }

  function renderGauge() {
    const canvas = Utils.el("gauge-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const score = 87;
    canvas.width = 200;
    canvas.height = 120;
    drawGauge(ctx, score, canvas.width, canvas.height);
    const el = Utils.el("gauge-value");
    if (el) Utils.animateCount(el, score);
  }

  function drawGauge(ctx, value, w, h) {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2,
      cy = h - 10,
      r = h - 20;
    const startAngle = Math.PI,
      endAngle = 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.stroke();

    const segments = [
      { color: "#7c3aed", pct: 0.88 },
      { color: "#06b6d4", pct: 0.82 },
      { color: "#10b981", pct: 0.91 },
    ];
    const segAngle = Math.PI / segments.length;
    segments.forEach((seg, i) => {
      const sa = startAngle + i * segAngle;
      const ea = sa + segAngle * seg.pct;
      ctx.beginPath();
      ctx.arc(cx, cy, r - i * 18, sa, ea);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.stroke();
    });
  }

  function initWeekLabel() {
    const el = Utils.el("week-label");
    if (!el) return;
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    el.textContent = `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }

  function initWidgetDnD() {
    const grid = Utils.el("dashboard-grid");
    if (!grid) return;
    let dragging = null;

    grid.addEventListener("dragstart", (e) => {
      dragging = e.target.closest(".dash-widget");
      if (dragging) dragging.classList.add("dragging");
    });
    grid.addEventListener("dragend", () => {
      if (dragging) {
        dragging.classList.remove("dragging");
        dragging = null;
      }
    });
    grid.addEventListener("dragover", (e) => {
      e.preventDefault();
      const over = e.target.closest(".dash-widget");
      if (over && over !== dragging) {
        const rect = over.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        grid.insertBefore(dragging, e.clientY < mid ? over : over.nextSibling);
      }
    });
  }

  function toggleCustomize() {
    const bar = Utils.el("widget-customize-bar");
    if (!bar) return;
    bar.classList.toggle("hidden");
    if (!bar.classList.contains("hidden")) renderWidgetToggles();
  }

  function renderWidgetToggles() {
    const container = Utils.el("widget-toggles");
    if (!container) return;
    Utils.empty(container);
    const visible = AppState.get("widgetVisible");
    const labels = {
      performance: "Performance",
      tasks: "My Tasks",
      meetings: "Meetings",
      activity: "Activity",
      heatmap: "Heatmap",
      goals: "Goals",
    };
    Object.keys(labels).forEach((key) => {
      const btn = Utils.make(
        "button",
        `widget-toggle-btn${visible[key] ? " on" : ""}`,
        labels[key],
      );
      btn.onclick = () => {
        visible[key] = !visible[key];
        btn.classList.toggle("on", visible[key]);
        AppState.set("widgetVisible", visible);
        const widget = document.querySelector(
          `.dash-widget[data-widget="${key}"]`,
        );
        if (widget) widget.style.display = visible[key] ? "" : "none";
      };
      container.appendChild(btn);
    });
    const widgets = document.querySelectorAll(".dash-widget");
    widgets.forEach((w) => {
      const key = w.dataset.widget;
      if (key && !visible[key]) w.style.display = "none";
    });
  }

  function addToTimeline(type, text) {
    const item = { id: Utils.id(), type, text, time: "Just now" };
    AppState.update("timeline", (tl) => [item, ...tl]);
  }

  return {
    init,
    renderAll,
    renderMyTasks,
    toggleTask,
    quickAddTask,
    toggleCustomize,
    addToTimeline,
    renderGoals,
    renderStats,
    drawGauge,
  };
})();

/* ════════════════════════════════════════════════════════════
   ANALYTICS — Canvas-drawn charts (Reactive)
════════════════════════════════════════════════════════════ */
const Analytics = (() => {
  function render() {
    const period = parseInt((Utils.el("analytics-period") || {}).value || "30");
    renderLineChart(period);
    renderDoughnutChart();
    renderBarChart();
    renderTopContributors();
  }

  function getCtx(id) {
    const canvas = Utils.el(id);
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return { ctx, canvas };
  }

  function isDark() {
    return document.documentElement.getAttribute("data-theme") !== "light";
  }
  function gridColor() {
    return isDark() ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  }
  function textColor() {
    return isDark() ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  }

  function renderLineChart(days) {
    const { ctx, canvas } = getCtx("line-chart") || {};
    if (!ctx) return;
    canvas.width = canvas.offsetWidth || 600;
    canvas.height = 200;

    const labels = [];
    const productData = [],
      qualityData = [],
      collabData = [];
    for (let i = days - 1; i >= 0; i -= Math.max(1, Math.floor(days / 12))) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(
        d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
      productData.push(Math.round(70 + Math.random() * 25));
      qualityData.push(Math.round(65 + Math.random() * 30));
      collabData.push(Math.round(75 + Math.random() * 20));
    }

    drawLineChart(ctx, canvas.width, canvas.height, labels, [
      { data: productData, color: "#7c3aed", label: "Productivity" },
      { data: qualityData, color: "#06b6d4", label: "Quality" },
      { data: collabData, color: "#10b981", label: "Collaboration" },
    ]);
  }

  function drawLineChart(ctx, w, h, labels, datasets) {
    const pad = { top: 20, right: 20, bottom: 40, left: 40 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const all = datasets.flatMap((d) => d.data);
    const min = Math.max(0, Math.min(...all) - 10);
    const max = Math.min(100, Math.max(...all) + 10);

    ctx.strokeStyle = gridColor();
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();
      ctx.fillStyle = textColor();
      ctx.font = "11px Inter";
      ctx.textAlign = "right";
      ctx.fillText(
        Math.round(max - ((max - min) / 4) * i),
        pad.left - 8,
        y + 4,
      );
    }

    ctx.textAlign = "center";
    ctx.fillStyle = textColor();
    labels.forEach((lbl, i) => {
      const x = pad.left + (i / (labels.length - 1)) * cw;
      ctx.fillText(lbl, x, h - 8);
    });

    datasets.forEach((ds) => {
      const pts = ds.data.map((v, i) => ({
        x: pad.left + (i / (ds.data.length - 1)) * cw,
        y: pad.top + ch - ((v - min) / (max - min)) * ch,
      }));

      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
      grad.addColorStop(0, ds.color + "40");
      grad.addColorStop(1, ds.color + "05");
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const cp1x = (pts[i - 1].x + pts[i].x) / 2;
        ctx.bezierCurveTo(
          cp1x,
          pts[i - 1].y,
          cp1x,
          pts[i].y,
          pts[i].x,
          pts[i].y,
        );
      }
      ctx.lineTo(pts[pts.length - 1].x, pad.top + ch);
      ctx.lineTo(pts[0].x, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const cp1x = (pts[i - 1].x + pts[i].x) / 2;
        ctx.bezierCurveTo(
          cp1x,
          pts[i - 1].y,
          cp1x,
          pts[i].y,
          pts[i].x,
          pts[i].y,
        );
      }
      ctx.strokeStyle = ds.color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.stroke();

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = ds.color;
        ctx.fill();
        ctx.strokeStyle = isDark() ? "#0d1526" : "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }

  function renderDoughnutChart() {
    const { ctx, canvas } = getCtx("doughnut-chart") || {};
    if (!ctx) return;
    canvas.width = canvas.offsetWidth || 300;
    canvas.height = 200;

    const tasks = AppState.get("tasks");
    const counts = Utils.countBy(tasks, (t) => t.col);
    const data = [
      { label: "Backlog", value: counts.backlog || 0, color: "#4a5a7a" },
      { label: "To Do", value: counts.todo || 0, color: "#06b6d4" },
      { label: "In Progress", value: counts.inprogress || 0, color: "#f59e0b" },
      { label: "Done", value: counts.done || 0, color: "#10b981" },
    ];

    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const cx = canvas.width / 2,
      cy = canvas.height / 2,
      r = Math.min(cx, cy) - 20;
    let startAngle = -Math.PI / 2;

    data.forEach((d) => {
      const slice = (d.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
      ctx.strokeStyle = isDark() ? "#0d1526" : "#f0f2f8";
      ctx.lineWidth = 3;
      ctx.stroke();
      startAngle += slice;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, 2 * Math.PI);
    ctx.fillStyle = isDark() ? "#111b30" : "#ffffff";
    ctx.fill();

    ctx.fillStyle = isDark() ? "#f0f4ff" : "#0f172a";
    ctx.font = "bold 20px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total, cx, cy - 6);
    ctx.font = "11px Inter";
    ctx.fillStyle = textColor();
    ctx.fillText("Total Tasks", cx, cy + 12);

    const legend = Utils.el("doughnut-legend");
    if (legend) {
      Utils.empty(legend);
      data.forEach((d) => {
        const item = Utils.make("div", "chart-legend-item");
        item.innerHTML = `<div class="chart-legend-dot" style="background:${d.color}"></div>${d.label} (${d.value})`;
        legend.appendChild(item);
      });
    }
  }

  function renderBarChart() {
    const { ctx, canvas } = getCtx("bar-chart") || {};
    if (!ctx) return;
    canvas.width = canvas.offsetWidth || 600;
    canvas.height = 200;

    const depts = [
      "Engineering",
      "Design",
      "Marketing",
      "Sales",
      "HR",
      "Finance",
    ];
    const data = depts.map((d) => ({
      label: d,
      value: Math.round(65 + Math.random() * 30),
    }));
    const colors = [
      "#7c3aed",
      "#06b6d4",
      "#10b981",
      "#f59e0b",
      "#ec4899",
      "#ef4444",
    ];

    const pad = { top: 20, right: 20, bottom: 40, left: 45 };
    const cw = canvas.width - pad.left - pad.right;
    const ch = canvas.height - pad.top - pad.bottom;
    const maxVal = 100;
    const bw = (cw / data.length) * 0.6;
    const gap = (cw / data.length) * 0.4;

    ctx.strokeStyle = gridColor();
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();
      ctx.fillStyle = textColor();
      ctx.font = "11px Inter";
      ctx.textAlign = "right";
      ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), pad.left - 8, y + 4);
    }

    data.forEach((d, i) => {
      const x = pad.left + i * (cw / data.length) + gap / 2;
      const barH = (d.value / maxVal) * ch;
      const y = pad.top + ch - barH;

      const grad = ctx.createLinearGradient(0, y, 0, pad.top + ch);
      grad.addColorStop(0, colors[i]);
      grad.addColorStop(1, colors[i] + "60");

      ctx.beginPath();
      ctx.roundRect(x, y, bw, barH, [6, 6, 0, 0]);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.fillStyle = textColor();
      ctx.font = "11px Inter";
      ctx.textAlign = "center";
      ctx.fillText(d.label.slice(0, 6), x + bw / 2, canvas.height - 8);

      ctx.fillStyle = isDark() ? "#f0f4ff" : "#0f172a";
      ctx.font = "bold 11px Inter";
      ctx.fillText(`${d.value}%`, x + bw / 2, y - 5);
    });
  }

  function renderTopContributors() {
    const container = Utils.el("top-contributors");
    if (!container) return;
    Utils.empty(container);
    const emps = [...AppState.get("employees")]
      .sort((a, b) => b.kudos - a.kudos)
      .slice(0, 5);
    const ranks = ["🥇", "🥈", "🥉", "4", "5"];
    emps.forEach((e, i) => {
      const item = Utils.make("div", "contributor-item");
      item.innerHTML = `
        <span class="contributor-rank">${ranks[i]}</span>
        <div class="avatar" style="width:32px;height:32px;font-size:0.75rem">${Utils.initials(e.name)}</div>
        <span class="contributor-name">${e.name}</span>
        <span class="contributor-score">⭐ ${e.kudos}</span>`;
      container.appendChild(item);
    });
  }

  return { render };
})();

/* ════════════════════════════════════════════════════════════
   PROJECTS
════════════════════════════════════════════════════════════ */
const Projects = (() => {
  let currentFilter = "all";

  function render() {
    const grid = Utils.el("projects-grid");
    if (!grid) return;
    Utils.empty(grid);
    let projects = AppState.get("projects");
    if (currentFilter !== "all")
      projects = projects.filter((p) => p.status === currentFilter);
    projects.forEach((p) => grid.appendChild(makeCard(p)));
  }

  function makeCard(p) {
    const card = Utils.make("div", "project-card");
    const assigneeHTML = p.assignees
      .map((a) => `<div class="assignee-mini" title="${a}">${a}</div>`)
      .join("");
    card.innerHTML = `
      <div class="project-card-header">
        <div class="project-name">${p.name}</div>
        <span class="priority-badge ${p.priority.toLowerCase()}">${p.priority}</span>
      </div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-progress-label">
        <span>Progress</span><span>${p.progress}%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill ${p.progress >= 100 ? "green" : ""}" style="width:0%" data-target="${p.progress}%"></div></div>
      <div class="project-meta">
        <div class="assignee-stack">${assigneeHTML}</div>
        <span class="status-badge ${p.status}">${p.status.replace("-", " ")}</span>
        <span>📅 ${Utils.formatDate(p.due)}</span>
      </div>`;
    setTimeout(() => {
      const fill = card.querySelector(".progress-fill");
      if (fill) fill.style.width = fill.dataset.target;
    }, 100);
    return card;
  }

  function filter(status, btn) {
    currentFilter = status;
    document
      .querySelectorAll(".projects-filters .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    render();
  }

  function openModal() {
    Utils.el("project-modal").classList.remove("hidden");
  }
  function closeModal() {
    Utils.el("project-modal").classList.add("hidden");
  }
  function closeIfOutside(e) {
    if (e.target.id === "project-modal") closeModal();
  }

  function add(e) {
    e.preventDefault();
    const p = {
      id: Utils.id(),
      name: Utils.el("proj-name").value.trim(),
      desc: Utils.el("proj-desc").value.trim() || "No description",
      priority: Utils.el("proj-priority").value,
      status: "active",
      progress: 0,
      due: Utils.el("proj-due").value,
      assignees: [AppState.get("user").initials],
    };
    AppState.update("projects", (ps) => [p, ...ps]);
    e.target.reset();
    closeModal();
    Notifications.toast("Project created! 📁", p.name, "success");
    Dashboard.addToTimeline(
      "task",
      `Created project <strong>${p.name}</strong>`,
    );
  }

  return { render, filter, openModal, closeModal, closeIfOutside, add };
})();

/* ════════════════════════════════════════════════════════════
   KANBAN BOARD — Drag & Drop (Real-Time Reactive)
════════════════════════════════════════════════════════════ */
const Kanban = (() => {
  let dragId = null;

  function render() {
    ["backlog", "todo", "inprogress", "done"].forEach((col) => {
      const body = Utils.el(`body-${col}`);
      const count = Utils.el(`count-${col}`);
      if (!body) return;
      Utils.empty(body);
      const cards = AppState.get("tasks").filter((t) => t.col === col);
      if (count) count.textContent = cards.length;
      cards.forEach((t) => body.appendChild(makeCard(t)));
    });
  }

  function makeCard(task) {
    const card = Utils.make("div", "kanban-card");
    card.id = `card-${task.id}`;
    card.draggable = true;
    card.innerHTML = `
      <div class="card-actions">
        <button class="card-action-btn" onclick="Kanban.editCard('${task.id}')">✏</button>
        <button class="card-action-btn" onclick="Kanban.deleteCard('${task.id}')">🗑</button>
      </div>
      <div style="height:3px;border-radius:2px;background:${Utils.priorityColor(task.priority)};margin-bottom:0.65rem;"></div>
      <div class="kanban-card-title">${task.title}</div>
      ${task.desc ? `<div class="kanban-card-desc">${task.desc}</div>` : ""}
      <div class="card-meta">
        <span class="card-assignee">👤 ${task.assignee || "—"}</span>
        ${task.due ? `<span class="card-due">📅 ${Utils.formatDate(task.due)}</span>` : ""}
      </div>`;

    card.addEventListener("dragstart", (e) => {
      dragId = task.id;
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
    return card;
  }

  function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }

  function drop(e, col) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    document
      .querySelectorAll(".kanban-col")
      .forEach((c) => c.classList.remove("drag-over"));
    if (!dragId) return;
    const tasks = AppState.get("tasks");
    const task = tasks.find((t) => t.id === dragId);
    if (task && task.col !== col) {
      task.col = col;
      task.done = col === "done";
      AppState.set("tasks", tasks); // Triggers real-time refresh across modules
      Dashboard.addToTimeline(
        "task",
        `Moved task <strong>${task.title}</strong> to ${col}`,
      );
      Notifications.toast("Task moved!", `"${task.title}" → ${col}`, "info");
      dragId = null;
    }
  }

  function openAddCard() {
    Utils.el("kanban-modal-title").textContent = "Add Task";
    Utils.el("kanban-edit-id").value = "";
    Utils.el("card-title").value = "";
    Utils.el("card-desc").value = "";
    Utils.el("card-col").value = "todo";
    Utils.el("card-priority").value = "medium";
    Utils.el("card-assignee").value = "";
    Utils.el("card-due").value = "";
    Utils.el("kanban-modal").classList.remove("hidden");
  }

  function editCard(id) {
    const task = AppState.get("tasks").find((t) => t.id === id);
    if (!task) return;
    Utils.el("kanban-modal-title").textContent = "Edit Task";
    Utils.el("kanban-edit-id").value = id;
    Utils.el("card-title").value = task.title;
    Utils.el("card-desc").value = task.desc || "";
    Utils.el("card-col").value = task.col;
    Utils.el("card-priority").value = task.priority;
    Utils.el("card-assignee").value = task.assignee;
    Utils.el("card-due").value = task.due;
    Utils.el("kanban-modal").classList.remove("hidden");
  }

  function deleteCard(id) {
    if (!confirm("Delete this task?")) return;
    const tasks = AppState.get("tasks").filter((t) => t.id !== id);
    AppState.set("tasks", tasks);
    Notifications.toast("Task deleted", "", "warning");
  }

  function saveCard(e) {
    e.preventDefault();
    const editId = Utils.el("kanban-edit-id").value;
    const data = {
      title: Utils.el("card-title").value.trim(),
      desc: Utils.el("card-desc").value.trim(),
      col: Utils.el("card-col").value,
      priority: Utils.el("card-priority").value,
      assignee: Utils.el("card-assignee").value.trim(),
      due: Utils.el("card-due").value,
      done: Utils.el("card-col").value === "done",
    };

    if (editId) {
      const tasks = AppState.get("tasks");
      const t = tasks.find((t) => t.id === editId);
      if (t) Object.assign(t, data);
      AppState.set("tasks", tasks);
    } else {
      data.id = Utils.id();
      AppState.update("tasks", (ts) => [data, ...ts]);
      Dashboard.addToTimeline(
        "task",
        `Created task <strong>${data.title}</strong>`,
      );
    }

    closeModal();
    Notifications.toast(
      editId ? "Task updated!" : "Task created!",
      data.title,
      "success",
    );
  }

  function closeModal() {
    Utils.el("kanban-modal").classList.add("hidden");
  }
  function closeIfOutside(e) {
    if (e.target.id === "kanban-modal") closeModal();
  }

  return {
    render,
    dragOver,
    drop,
    openAddCard,
    editCard,
    deleteCard,
    saveCard,
    closeModal,
    closeIfOutside,
  };
})();

/* ════════════════════════════════════════════════════════════
   TEAM CHAT
════════════════════════════════════════════════════════════ */
const Chat = (() => {
  const CHANNELS = [
    { id: "general", name: "# general", desc: "Team-wide announcements" },
    { id: "dev", name: "# dev", desc: "Engineering discussions" },
    { id: "design", name: "# design", desc: "Design reviews & feedback" },
    { id: "random", name: "# random", desc: "Off-topic conversations" },
  ];
  const DMS = [
    { id: "dm_sara", name: "Sara Kim", init: "SK", online: true },
    { id: "dm_mike", name: "Mike Chen", init: "MC", online: true },
    { id: "dm_priya", name: "Priya Sharma", init: "PS", online: false },
  ];

  function render() {
    renderChannels();
    renderDMs();
    renderMessages();
  }

  function renderChannels() {
    const list = Utils.el("channels-list");
    if (!list) return;
    Utils.empty(list);
    const active = AppState.get("activeChannel");
    CHANNELS.forEach((ch) => {
      const item = Utils.make(
        "div",
        `channel-item${active === ch.id ? " active" : ""}`,
      );
      item.innerHTML = ch.name;
      item.onclick = () => switchChannel(ch.id, ch.name, ch.desc);
      list.appendChild(item);
    });
  }

  function renderDMs() {
    const list = Utils.el("dm-list");
    if (!list) return;
    Utils.empty(list);
    DMS.forEach((dm) => {
      const item = Utils.make("div", "dm-item");
      item.innerHTML = `
        <div class="dm-avatar">${dm.init}${dm.online ? '<span class="dm-online"></span>' : ""}</div>
        <span>${dm.name}</span>`;
      item.onclick = () => switchChannel(dm.id, dm.name, "Direct Message");
      list.appendChild(item);
    });
  }

  function switchChannel(id, name, desc) {
    AppState.set("activeChannel", id, true); // silent set to avoid recursion
    Utils.el("active-channel-name").textContent = name;
    Utils.el("active-channel-desc").textContent = desc;
    renderChannels();
    renderMessages();
    const placeholder = Utils.el("message-input");
    if (placeholder) placeholder.placeholder = `Message ${name}…`;
    const badge = Utils.el("chat-badge");
    if (badge) badge.classList.add("hidden");
  }

  function renderMessages() {
    const container = Utils.el("messages-container");
    if (!container) return;
    Utils.empty(container);
    const channelId = AppState.get("activeChannel");
    const msgs = AppState.get("messages")[channelId] || [];
    const u = AppState.get("user");

    if (!msgs.length) {
      container.innerHTML =
        '<div style="text-align:center;padding:2rem;color:var(--text-muted)">No messages yet. Say hello! 👋</div>';
      return;
    }

    msgs.forEach((msg) => {
      const isMine = msg.mine || msg.sender === `${u.firstName} ${u.lastName}`;
      const group = Utils.make("div", `message-group${isMine ? " mine" : ""}`);
      const reactionsHTML =
        msg.reactions && msg.reactions.length
          ? msg.reactions
              .map((r) => `<span class="msg-reaction">${r}</span>`)
              .join("")
          : "";

      group.innerHTML = `
        <div class="msg-avatar">${msg.initials}</div>
        <div class="msg-content">
          <div class="msg-meta">${isMine ? "You" : msg.sender} · ${msg.time}</div>
          <div class="msg-bubble">${msg.text}</div>
          ${reactionsHTML ? `<div class="msg-reactions">${reactionsHTML}</div>` : ""}
        </div>`;
      container.appendChild(group);
    });

    container.scrollTop = container.scrollHeight;
  }

  function send() {
    const input = Utils.el("message-input");
    const text = input.value.trim();
    if (!text) return;

    const u = AppState.get("user");
    const channelId = AppState.get("activeChannel");
    const msg = {
      id: Utils.id(),
      sender: `${u.firstName} ${u.lastName}`,
      initials: u.initials || "JD",
      text,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mine: true,
      reactions: [],
    };

    const messages = AppState.get("messages");
    if (!messages[channelId]) messages[channelId] = [];
    messages[channelId].push(msg);
    AppState.set("messages", messages);
    input.value = "";

    setTimeout(() => autoReply(channelId), 1200);
  }

  function autoReply(channelId) {
    const replies = [
      "Got it, thanks! 👍",
      "Sounds good!",
      "Will take a look right away.",
      "Great point! 🎯",
      "Let me check and get back to you.",
      "On it! 🚀",
      "Thanks for the heads up!",
    ];
    const bots = [
      { sender: "Sara Kim", initials: "SK" },
      { sender: "Mike Chen", initials: "MC" },
      { sender: "Alex Rivera", initials: "AR" },
    ];
    const bot = bots[Math.floor(Math.random() * bots.length)];
    const msg = {
      id: Utils.id(),
      sender: bot.sender,
      initials: bot.initials,
      text: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mine: false,
      reactions: [],
    };
    const messages = AppState.get("messages");
    if (!messages[channelId]) messages[channelId] = [];
    messages[channelId].push(msg);
    AppState.set("messages", messages);
  }

  function sendOnEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function toggleEmoji() {
    Utils.el("emoji-picker").classList.toggle("hidden");
  }

  function insertEmoji(emoji) {
    const input = Utils.el("message-input");
    input.value += emoji;
    input.focus();
    Utils.el("emoji-picker").classList.add("hidden");
  }

  return { render, send, sendOnEnter, toggleEmoji, insertEmoji };
})();

/* ════════════════════════════════════════════════════════════
   CALENDAR
════════════════════════════════════════════════════════════ */
const CalendarApp = (() => {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function render() {
    const year = AppState.get("calYear");
    const month = AppState.get("calMonth");
    Utils.el("cal-month-label").textContent = `${MONTHS[month]} ${year}`;
    renderDays(year, month);
    renderEventsList();
  }

  function renderDays(year, month) {
    const container = Utils.el("cal-days");
    if (!container) return;
    Utils.empty(container);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const today = new Date();
    const events = AppState.get("events");

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = Utils.make("div", "cal-day other-month");
      day.innerHTML = `<div class="cal-day-num">${daysInPrev - i}</div>`;
      container.appendChild(day);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
      const day = Utils.make("div", `cal-day${isToday ? " today" : ""}`);
      day.innerHTML = `<div class="cal-day-num">${d}</div>`;
      day.dataset.date = dateStr;
      day.onclick = () => openEventModal(dateStr);

      events
        .filter((ev) => ev.date === dateStr)
        .slice(0, 2)
        .forEach((ev) => {
          const dot = Utils.make("div", `cal-event-dot ${ev.type}`);
          dot.textContent = ev.title;
          day.appendChild(dot);
        });
      container.appendChild(day);
    }

    const totalCells = firstDay + daysInMonth;
    const nextDays = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= nextDays; i++) {
      const day = Utils.make("div", "cal-day other-month");
      day.innerHTML = `<div class="cal-day-num">${i}</div>`;
      container.appendChild(day);
    }
  }

  function renderEventsList() {
    const list = Utils.el("cal-events-list");
    if (!list) return;
    Utils.empty(list);
    const events = [...AppState.get("events")].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    events.forEach((ev) => {
      const item = Utils.make("div", `cal-event-item ${ev.type}`);
      item.innerHTML = `
        <div class="cal-event-title">${ev.title}</div>
        <div class="cal-event-time">📅 ${Utils.formatDate(ev.date)} · ${ev.time}</div>`;
      list.appendChild(item);
    });
  }

  function prevMonth() {
    let y = AppState.get("calYear"),
      m = AppState.get("calMonth");
    m--;
    if (m < 0) {
      m = 11;
      y--;
    }
    AppState.set("calYear", y);
    AppState.set("calMonth", m);
  }

  function nextMonth() {
    let y = AppState.get("calYear"),
      m = AppState.get("calMonth");
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
    AppState.set("calYear", y);
    AppState.set("calMonth", m);
  }

  function openEventModal(date) {
    Utils.el("event-date").value = date || Utils.today();
    Utils.el("event-modal").classList.remove("hidden");
  }

  function closeEventModal() {
    Utils.el("event-modal").classList.add("hidden");
  }
  function closeIfOutside(e) {
    if (e.target.id === "event-modal") closeEventModal();
  }

  function addEvent(e) {
    e.preventDefault();
    const ev = {
      id: Utils.id(),
      title: Utils.el("event-title").value.trim(),
      date: Utils.el("event-date").value,
      time: Utils.el("event-time").value,
      type: Utils.el("event-type").value,
    };
    AppState.update("events", (evs) => [...evs, ev]);
    e.target.reset();
    closeEventModal();
    Notifications.toast("Event added! 📅", ev.title, "success");
    Dashboard.addToTimeline(
      "meeting",
      `Added event <strong>${ev.title}</strong>`,
    );
  }

  return {
    render,
    prevMonth,
    nextMonth,
    openEventModal,
    closeEventModal,
    closeIfOutside,
    addEvent,
  };
})();

/* ════════════════════════════════════════════════════════════
   MEETINGS
════════════════════════════════════════════════════════════ */
const MeetingsApp = (() => {
  function render() {
    const today = Utils.today();
    const meetings = AppState.get("meetings");
    const upcoming = meetings.filter((m) => m.date >= today);
    const past = meetings.filter((m) => m.date < today);

    renderList("meetings-upcoming", upcoming);
    renderList("meetings-past", past);
    const dateInput = Utils.el("meet-date");
    if (dateInput) dateInput.value = Utils.today();
  }

  function renderList(id, meetings) {
    const container = Utils.el(id);
    if (!container) return;
    Utils.empty(container);
    if (!meetings.length) {
      container.innerHTML =
        '<div style="color:var(--text-muted);font-size:0.85rem;padding:0.5rem 0">None</div>';
      return;
    }
    meetings.forEach((m) => {
      const isPast = m.date < Utils.today();
      const card = Utils.make("div", "meeting-card");
      const attendeeHTML = m.attendees
        .map((a) => `<span class="meet-attendee-tag">${a.split(" ")[0]}</span>`)
        .join("");
      card.innerHTML = `
        <div class="meet-time-badge">${m.time}<br><small>${m.platform}</small></div>
        <div class="meet-info">
          <div class="meet-title">${m.title}</div>
          <div class="meet-meta">📅 ${Utils.formatDate(m.date)} · ${m.duration}min</div>
          <div class="meet-attendees">${attendeeHTML}</div>
        </div>
        <div class="meet-actions">
          ${!isPast ? `<button class="btn-join">Join</button>` : ""}
          <button class="btn-cancel" onclick="MeetingsApp.cancel('${m.id}')">Cancel</button>
        </div>`;
      container.appendChild(card);
    });
  }

  function schedule(e) {
    e.preventDefault();
    const meeting = {
      id: Utils.id(),
      title: Utils.el("meet-title").value.trim(),
      desc: Utils.el("meet-desc").value.trim(),
      date: Utils.el("meet-date").value,
      time: Utils.el("meet-time").value,
      duration: parseInt(Utils.el("meet-duration").value),
      platform: Utils.el("meet-platform").value,
      attendees: Utils.el("meet-attendees")
        .value.split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    };
    if (
      !meeting.attendees.includes(
        `${AppState.get("user").firstName} ${AppState.get("user").lastName}`,
      )
    ) {
      meeting.attendees.unshift(
        `${AppState.get("user").firstName} ${AppState.get("user").lastName}`,
      );
    }
    AppState.update("meetings", (ms) => [meeting, ...ms]);
    e.target.reset();
    Notifications.addNotification(
      "🎥",
      `Meeting "${meeting.title}" scheduled for ${Utils.formatDate(meeting.date)}`,
    );
    Notifications.toast("Meeting scheduled! 🎥", meeting.title, "success");
    Dashboard.addToTimeline(
      "meeting",
      `Scheduled <strong>${meeting.title}</strong>`,
    );
  }

  function cancel(id) {
    if (!confirm("Cancel this meeting?")) return;
    AppState.update("meetings", (ms) => ms.filter((m) => m.id !== id));
    Notifications.toast("Meeting cancelled", "", "warning");
  }

  function openModal() {
    const section = document.querySelector(".meetings-form-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }

  return { render, schedule, cancel, openModal };
})();

/* ════════════════════════════════════════════════════════════
   PEER RECOGNITION
════════════════════════════════════════════════════════════ */
const Recognition = (() => {
  let selectedCategory = "Innovation";
  let wallFilter = "all";

  function render() {
    populateKudosTo();
    renderKudosList();
    renderLeaderboard();

    document.querySelectorAll(".category-pill").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.dataset.cat;
        document
          .querySelectorAll(".category-pill")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      };
    });
  }

  function populateKudosTo() {
    const select = Utils.el("kudos-to");
    if (!select || select.children.length > 1) return;
    const u = AppState.get("user");
    AppState.get("employees").forEach((e) => {
      if (e.name !== `${u.firstName} ${u.lastName}`) {
        const opt = document.createElement("option");
        opt.value = e.name;
        opt.textContent = e.name;
        select.appendChild(opt);
      }
    });
  }

  function sendKudos(e) {
    e.preventDefault();
    const to = Utils.el("kudos-to").value;
    const message = Utils.el("kudos-message").value.trim();
    const u = AppState.get("user");
    if (!to || !message) return;

    const kudo = {
      id: Utils.id(),
      from: `${u.firstName} ${u.lastName}`,
      fromInit: u.initials,
      to,
      toInit: Utils.initials(to),
      category: selectedCategory,
      message,
      time: "Just now",
      reactions: {},
    };

    AppState.update("kudos", (ks) => [kudo, ...ks]);
    e.target.reset();
    Utils.el("kudos-to").value = "";
    Notifications.addNotification(
      "🏆",
      `You sent kudos to ${to} for ${selectedCategory}!`,
    );
    Notifications.toast(
      "Kudos sent! 🎉",
      `Recognized ${to} for ${selectedCategory}`,
      "success",
    );
    Dashboard.addToTimeline(
      "kudos",
      `Sent kudos to <strong>${to}</strong> for ${selectedCategory}`,
    );
  }

  function renderKudosList() {
    const list = Utils.el("kudos-list");
    if (!list) return;
    Utils.empty(list);
    const u = AppState.get("user");
    let kudos = AppState.get("kudos");
    if (wallFilter === "mine")
      kudos = kudos.filter((k) => k.to === `${u.firstName} ${u.lastName}`);
    kudos.forEach((k) => list.appendChild(makeKudosCard(k)));
    if (!kudos.length) {
      list.innerHTML =
        '<div style="color:var(--text-muted);padding:1rem;text-align:center">No kudos yet! Send some to your teammates. 🎉</div>';
    }
  }

  function makeKudosCard(k) {
    const card = Utils.make("div", "kudos-card");
    const reactionHTML = Object.entries(k.reactions || {})
      .map(
        ([emoji, count]) =>
          `<button class="kudos-react-btn" onclick="Recognition.addReaction('${k.id}', '${emoji}')">${emoji} ${count}</button>`,
      )
      .join("");

    card.innerHTML = `
      <div class="kudos-card-header">
        <div class="avatar" style="width:32px;height:32px;font-size:0.72rem">${k.fromInit}</div>
        <div>
          <span class="kudos-from">${k.from}</span>
          <span class="kudos-arrow"> → </span>
          <span class="kudos-to">${k.to}</span>
        </div>
        <span class="kudos-time">${k.time}</span>
      </div>
      <div class="kudos-category">${k.category}</div>
      <div class="kudos-message">"${k.message}"</div>
      <div class="kudos-card-footer">
        ${reactionHTML}
        <button class="kudos-react-btn" onclick="Recognition.addReaction('${k.id}', '🙌')">🙌 React</button>
        <button class="kudos-react-btn" onclick="Recognition.addReaction('${k.id}', '❤️')">❤️</button>
        <button class="kudos-react-btn" onclick="Recognition.addReaction('${k.id}', '🔥')">🔥</button>
      </div>`;
    return card;
  }

  function addReaction(id, emoji) {
    const kudos = AppState.get("kudos");
    const k = kudos.find((k) => k.id === id);
    if (k) {
      if (!k.reactions) k.reactions = {};
      k.reactions[emoji] = (k.reactions[emoji] || 0) + 1;
      AppState.set("kudos", kudos);
    }
  }

  function filterWall(filter, btn) {
    wallFilter = filter;
    document
      .querySelectorAll(".rec-tab")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderKudosList();
  }

  function renderLeaderboard() {
    const container = Utils.el("kudos-leaderboard");
    if (!container) return;
    Utils.empty(container);
    const kudos = AppState.get("kudos");
    const counts = {};
    kudos.forEach((k) => {
      counts[k.to] = (counts[k.to] || 0) + 1;
    });
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const rankClass = ["gold", "silver", "bronze", "", ""];
    sorted.forEach(([name, count], i) => {
      const item = Utils.make("div", "leaderboard-item");
      item.innerHTML = `
        <span class="lb-rank ${rankClass[i]}">${["🥇", "🥈", "🥉", "4", "5"][i]}</span>
        <div class="avatar" style="width:28px;height:28px;font-size:0.65rem">${Utils.initials(name)}</div>
        <span class="lb-name">${name}</span>
        <span class="lb-kudos">⭐ ${count}</span>`;
      container.appendChild(item);
    });
  }

  return { render, sendKudos, addReaction, filterWall, renderLeaderboard };
})();

/* ════════════════════════════════════════════════════════════
   EMPLOYEE DIRECTORY
════════════════════════════════════════════════════════════ */
const Directory = (() => {
  function render() {
    filter();
  }

  function filter() {
    const search = (Utils.el("dir-search") || {}).value || "";
    const dept = (Utils.el("dir-dept") || {}).value || "";
    const s = search.toLowerCase();
    const employees = AppState.get("employees").filter((e) => {
      const matchSearch =
        !s ||
        e.name.toLowerCase().includes(s) ||
        e.role.toLowerCase().includes(s);
      const matchDept = !dept || e.dept === dept;
      return matchSearch && matchDept;
    });
    renderCards(employees);
  }

  function renderCards(employees) {
    const grid = Utils.el("directory-grid");
    if (!grid) return;
    Utils.empty(grid);
    employees.forEach((e) => {
      const card = Utils.make("div", "emp-card");
      card.innerHTML = `
        <div class="emp-avatar">
          ${Utils.initials(e.name)}
          <div class="emp-online-dot ${e.online ? "online" : "offline"}"></div>
        </div>
        <div class="emp-name">${e.name}</div>
        <div class="emp-title">${e.role}</div>
        <div class="emp-dept">${e.dept}</div>
        <div class="emp-actions">
          <button class="emp-action-btn" onclick="Chat.render();Router.navigate('chat')">💬 Message</button>
          <button class="emp-action-btn" onclick="Directory.viewProfile('${e.id}')">👤 View</button>
        </div>`;
      grid.appendChild(card);
    });
    if (!employees.length) {
      grid.innerHTML =
        '<div style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:2rem">No employees found</div>';
    }
  }

  function viewProfile(id) {
    const e = AppState.get("employees").find((e) => e.id === id);
    if (!e) return;
    const modal = Utils.el("emp-modal");
    const content = Utils.el("emp-modal-content");
    content.innerHTML = `
      <div class="modal-header">
        <h2>${e.name}</h2>
        <button class="modal-close" onclick="Directory.closeModal()">✕</button>
      </div>
      <div class="emp-modal-body">
        <div class="emp-modal-avatar">${Utils.initials(e.name)}</div>
        <div class="emp-modal-info">
          <h2>${e.name}</h2>
          <p>${e.role} · ${e.dept}</p>
          <p style="margin-top:0.5rem"><span>✉</span> ${e.email}</p>
          <p style="margin-top:0.25rem"><span>⭐</span> ${e.kudos} kudos received</p>
          <div style="margin-top:0.75rem;display:flex;flex-wrap:wrap;gap:0.35rem">
            ${e.skills.map((s) => `<span class="tag">${s}</span>`).join("")}
          </div>
          <div style="margin-top:1rem">
            <span class="emp-online-dot ${e.online ? "online" : "offline"}" style="display:inline-block;width:10px;height:10px;margin-right:0.4rem;border:none"></span>
            <span style="font-size:0.82rem;color:var(--text-secondary)">${e.online ? "Online now" : "Offline"}</span>
          </div>
        </div>
      </div>`;
    modal.classList.remove("hidden");
  }

  function closeModal() {
    Utils.el("emp-modal").classList.add("hidden");
  }
  function closeIfOutside(e) {
    if (e.target.id === "emp-modal") closeModal();
  }

  return { render, filter, viewProfile, closeModal, closeIfOutside };
})();

/* ════════════════════════════════════════════════════════════
   NOTES — Rich text editor
════════════════════════════════════════════════════════════ */
const Notes = (() => {
  let currentId = null;
  let saveTimer = null;

  function render() {
    renderList();
    if (currentId) openNote(currentId);
  }

  function renderList(query = "") {
    const list = Utils.el("notes-list");
    if (!list) return;
    Utils.empty(list);
    const q = query.toLowerCase();
    let notes = AppState.get("notes");
    if (q)
      notes = notes.filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
      );
    notes = [
      ...notes.filter((n) => n.pinned),
      ...notes.filter((n) => !n.pinned),
    ];

    notes.forEach((n) => {
      const item = Utils.make(
        "div",
        `note-item${n.id === currentId ? " active" : ""}`,
      );
      const plainBody = n.body.replace(/<[^>]+>/g, "");
      item.innerHTML = `
        <div class="note-item-title">${n.pinned ? "📌 " : ""}${n.title || "Untitled"}</div>
        <div class="note-item-preview">${plainBody.slice(0, 60) || "Empty note…"}</div>
        <div class="note-item-date">${Utils.relativeTime(n.updatedAt)}</div>`;
      item.onclick = () => openNote(n.id);
      list.appendChild(item);
    });

    if (!notes.length) {
      list.innerHTML =
        '<div style="color:var(--text-muted);font-size:0.82rem;padding:0.5rem">No notes yet</div>';
    }
  }

  function newNote() {
    const note = {
      id: Utils.id(),
      title: "",
      body: "",
      tags: [],
      pinned: false,
      updatedAt: Date.now(),
    };
    AppState.update("notes", (ns) => [note, ...ns]);
    openNote(note.id);
    setTimeout(() => Utils.el("note-title-input").focus(), 50);
  }

  function openNote(id) {
    const note = AppState.get("notes").find((n) => n.id === id);
    if (!note) return;
    currentId = id;

    Utils.el("note-editor-placeholder").classList.add("hidden");
    Utils.el("note-editor").classList.remove("hidden");
    Utils.el("note-title-input").value = note.title;
    Utils.el("note-body").innerHTML = note.body;
    Utils.el("pin-btn").textContent = note.pinned ? "📌 Pinned" : "📌 Pin";

    renderNoteTags(note.tags);
    renderList();
    updateSaveStatus("Saved");
  }

  function renderNoteTags(tags) {
    const container = Utils.el("note-tags");
    if (!container) return;
    Utils.empty(container);
    (tags || []).forEach((tag) => {
      const el = Utils.make("span", "tag");
      el.innerHTML = `${tag}<span class="tag-remove" onclick="Notes.removeTag('${tag}')">✕</span>`;
      container.appendChild(el);
    });
  }

  function autoSave() {
    clearTimeout(saveTimer);
    updateSaveStatus("Saving…");
    saveTimer = setTimeout(saveCurrentNote, 800);
  }

  function saveCurrentNote() {
    if (!currentId) return;
    const notes = AppState.get("notes");
    const note = notes.find((n) => n.id === currentId);
    if (note) {
      note.title = Utils.el("note-title-input").value;
      note.body = Utils.el("note-body").innerHTML;
      note.updatedAt = Date.now();
      AppState.set("notes", notes);
      updateSaveStatus("Saved");
    }
  }

  function updateSaveStatus(msg) {
    const el = Utils.el("note-save-status");
    if (el) el.textContent = msg;
  }

  function format(cmd, value) {
    document.execCommand(cmd, false, value || null);
    Utils.el("note-body").focus();
    autoSave();
  }

  function togglePin() {
    if (!currentId) return;
    const notes = AppState.get("notes");
    const note = notes.find((n) => n.id === currentId);
    if (note) {
      note.pinned = !note.pinned;
      AppState.set("notes", notes);
      Utils.el("pin-btn").textContent = note.pinned ? "📌 Pinned" : "📌 Pin";
    }
  }

  function addTag() {
    const tag = prompt("Enter tag name:");
    if (!tag || !currentId) return;
    const notes = AppState.get("notes");
    const note = notes.find((n) => n.id === currentId);
    if (note && !note.tags.includes(tag)) {
      note.tags.push(tag.toLowerCase().trim());
      AppState.set("notes", notes);
    }
  }

  function removeTag(tag) {
    if (!currentId) return;
    const notes = AppState.get("notes");
    const note = notes.find((n) => n.id === currentId);
    if (note) {
      note.tags = note.tags.filter((t) => t !== tag);
      AppState.set("notes", notes);
    }
  }

  function deleteNote() {
    if (!currentId || !confirm("Delete this note?")) return;
    AppState.update("notes", (ns) => ns.filter((n) => n.id !== currentId));
    currentId = null;
    Utils.el("note-editor").classList.add("hidden");
    Utils.el("note-editor-placeholder").classList.remove("hidden");
    Notifications.toast("Note deleted", "", "warning");
  }

  function search(query) {
    renderList(query);
  }

  return {
    render,
    renderList,
    newNote,
    openNote,
    autoSave,
    format,
    togglePin,
    addTag,
    removeTag,
    deleteNote,
    search,
  };
})();

/* ════════════════════════════════════════════════════════════
   ACTIVITY TIMELINE
════════════════════════════════════════════════════════════ */
const Timeline = (() => {
  let currentFilter = "all";

  function render() {
    renderList();
  }

  function renderList() {
    const container = Utils.el("timeline-list");
    if (!container) return;
    Utils.empty(container);
    let items = AppState.get("timeline");
    if (currentFilter !== "all")
      items = items.filter((i) => i.type === currentFilter);
    items.forEach((item) => {
      const el = Utils.make("div", "timeline-item");
      el.innerHTML = `
        <div class="timeline-dot ${item.type}"></div>
        <div class="timeline-content">
          <div>${item.text}</div>
          <div class="timeline-time">${item.time}</div>
        </div>`;
      container.appendChild(el);
    });
    if (!items.length) {
      container.innerHTML =
        '<div style="color:var(--text-muted);padding:1rem">No activity yet.</div>';
    }
  }

  function filter(type, btn) {
    currentFilter = type;
    document
      .querySelectorAll(".timeline-filters .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderList();
  }

  return { render, filter };
})();

/* ════════════════════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════════════════════ */
const Profile = (() => {
  function render() {
    const u = AppState.get("user");
    const fullName = `${u.firstName} ${u.lastName}`;

    Utils.el("profile-name").textContent = fullName;
    Utils.el("profile-role").textContent = u.role;
    Utils.el("profile-dept").textContent = u.department
      ? `${u.department} · San Francisco, CA`
      : "";
    Utils.el("profile-email").textContent = u.email;
    Utils.el("profile-bio").textContent = u.bio;

    const initials = u.initials || Utils.initials(fullName);
    Utils.el("profile-avatar").textContent = initials;

    const tasks = AppState.get("tasks").filter((t) => t.col === "done").length;
    const kudos = AppState.get("kudos").filter((k) => k.to === fullName).length;
    const projects = AppState.get("projects").filter(
      (p) => p.status === "active",
    ).length;

    Utils.animateCount(Utils.el("pstat-tasks"), tasks);
    Utils.animateCount(Utils.el("pstat-kudos"), kudos);
    Utils.animateCount(Utils.el("pstat-projects"), projects);
    Utils.animateCount(Utils.el("pstat-streak"), 14);

    renderProfileTimeline();
  }

  function renderProfileTimeline() {
    const container = Utils.el("profile-timeline");
    if (!container) return;
    Utils.empty(container);
    AppState.get("timeline")
      .slice(0, 5)
      .forEach((item) => {
        const el = Utils.make("div", "profile-timeline-item");
        el.innerHTML = `<span>•</span><div>${item.text} <span class="activity-time">${item.time}</span></div>`;
        container.appendChild(el);
      });
  }

  function changeAvatar() {
    Notifications.toast(
      "Avatar Upload",
      "Avatar upload coming in v2.0! Using initials for now.",
      "info",
    );
  }

  return { render, changeAvatar };
})();

/* ════════════════════════════════════════════════════════════
   SETTINGS
════════════════════════════════════════════════════════════ */
const Settings = (() => {
  function init() {
    populateForm();
    renderToggles();
  }

  function populateForm() {
    const u = AppState.get("user");
    const setVal = (id, val) => {
      const el = Utils.el(id);
      if (el) el.value = val || "";
    };
    setVal("settings-fname", u.firstName);
    setVal("settings-lname", u.lastName);
    setVal("settings-email", u.email);
    setVal("settings-role", u.role);
    setVal("settings-dept", u.department);
    setVal("settings-bio", u.bio);
    const av = Utils.el("settings-avatar");
    if (av)
      av.textContent =
        u.initials || Utils.initials(`${u.firstName} ${u.lastName}`);
  }

  function saveProfile() {
    const u = AppState.get("user");
    u.firstName = Utils.el("settings-fname").value.trim() || u.firstName;
    u.lastName = Utils.el("settings-lname").value.trim() || u.lastName;
    u.email = Utils.el("settings-email").value.trim() || u.email;
    u.role = Utils.el("settings-role").value.trim() || u.role;
    u.department = Utils.el("settings-dept").value.trim() || u.department;
    u.bio = Utils.el("settings-bio").value.trim() || u.bio;
    u.initials = Utils.initials(`${u.firstName} ${u.lastName}`);
    AppState.set("user", u);
    Notifications.toast(
      "Profile saved! ✅",
      "Your changes have been saved.",
      "success",
    );
  }

  function renderToggles() {
    const notifDefs = [
      {
        key: "taskUpdates",
        label: "Task Updates",
        desc: "Get notified when tasks are updated",
      },
      {
        key: "kudos",
        label: "Kudos",
        desc: "Get notified when you receive kudos",
      },
      {
        key: "meetings",
        label: "Meetings",
        desc: "Meeting reminders and updates",
      },
      {
        key: "mentions",
        label: "Mentions",
        desc: "When someone @mentions you",
      },
      {
        key: "weeklyReport",
        label: "Weekly Report",
        desc: "Weekly performance summary",
      },
    ];
    const privDefs = [
      {
        key: "showOnline",
        label: "Show Online Status",
        desc: "Let others see when you are online",
      },
      {
        key: "shareActivity",
        label: "Share Activity",
        desc: "Share your activity timeline with the team",
      },
      {
        key: "allowDM",
        label: "Allow Direct Messages",
        desc: "Allow teammates to send you DMs",
      },
    ];

    renderToggleList("notif-settings", notifDefs, "notifSettings");
    renderToggleList("privacy-settings", privDefs, "privacySettings");
  }

  function renderToggleList(containerId, defs, settingKey) {
    const container = Utils.el(containerId);
    if (!container) return;
    Utils.empty(container);
    const u = AppState.get("user");
    defs.forEach((d) => {
      const item = Utils.make("div", "settings-toggle-item");
      const isOn = u[settingKey] && u[settingKey][d.key];
      item.innerHTML = `
        <div class="toggle-info">
          <div class="toggle-label">${d.label}</div>
          <div class="toggle-desc">${d.desc}</div>
        </div>
        <div class="toggle-switch${isOn ? " on" : ""}" data-setting="${settingKey}" data-key="${d.key}"></div>`;
      item.querySelector(".toggle-switch").onclick = function () {
        this.classList.toggle("on");
        const u = AppState.get("user");
        if (!u[settingKey]) u[settingKey] = {};
        u[settingKey][d.key] = this.classList.contains("on");
        AppState.set("user", u);
      };
      container.appendChild(item);
    });
  }

  function switchTab(tab, btn) {
    document
      .querySelectorAll(".settings-pane")
      .forEach((p) => p.classList.remove("active"));
    document
      .querySelectorAll(".settings-tab")
      .forEach((b) => b.classList.remove("active"));
    const pane = Utils.el(`settings-${tab}`);
    if (pane) pane.classList.add("active");
    if (btn) btn.classList.add("active");
  }

  function clearData() {
    if (!confirm("This will clear all local data and reset the app. Continue?"))
      return;
    AppState.reset();
    localStorage.removeItem("workflowx_session");
    location.reload();
  }

  return { init, saveProfile, switchTab, clearData, populateForm };
})();

/* ════════════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  Auth.init();

  document.addEventListener("click", (e) => {
    const notifWrap = e.target.closest(".notif-wrap");
    const notifDD = Utils.el("notif-dropdown");
    if (!notifWrap && notifDD && !notifDD.classList.contains("hidden")) {
      Notifications.closeDropdown();
    }
    if (!e.target.closest(".emoji-btn") && !e.target.closest(".emoji-picker")) {
      const picker = Utils.el("emoji-picker");
      if (picker) picker.classList.add("hidden");
    }
  });

  // Real-time performance gauge animation (updates every 5s)
  setInterval(() => {
    const canvas = Utils.el("gauge-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const score = 80 + Math.round(Math.random() * 15);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Dashboard.drawGauge) {
      Dashboard.drawGauge(ctx, score, canvas.width, canvas.height);
    }
    const el = Utils.el("gauge-value");
    if (el) Utils.animateCount(el, score);
  }, 5000);
});
