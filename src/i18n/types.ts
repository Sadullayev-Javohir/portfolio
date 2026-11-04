export type Language = "en" | "uz" | "ru";

export interface NavTranslations {
  home: string;
  about: string;
  projects: string;
  experience: string;
  skills: string;
  blog: string;
  resume: string;
  contact: string;
  getInTouch: string;
  roleTag: string;
  selectLanguage: string;
}

export interface HeroTranslations {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaProjects: string;
  ctaContact: string;
  metrics: {
    learners: { value: string; label: string };
    latency: { value: string; label: string };
    uptime: { value: string; label: string };
    tests: { value: string; label: string };
  };
}

export interface IntroTranslations {
  eyebrow: string;
  title: string;
  p1: string;
  bullet1Title: string;
  bullet1Desc: string;
  bullet2Title: string;
  bullet2Desc: string;
  bullet3Title: string;
  bullet3Desc: string;
  quote: string;
}

export interface FeaturedWorkTranslations {
  eyebrow: string;
  title: string;
  viewAll: string;
  viewCaseStudy: string;
}

export interface ExperiencePreviewTranslations {
  eyebrow: string;
  title: string;
  viewAll: string;
  currentBadge: string;
}

export interface EducationSectionTranslations {
  eyebrow: string;
  title: string;
  degree: string;
  uni: string;
  years: string;
  viewFull: string;
}

export interface JournalTeaserTranslations {
  eyebrow: string;
  title: string;
  viewAll: string;
  minRead: string;
}

export interface NowCtaTranslations {
  title: string;
  subtitle: string;
  ctaChat: string;
  ctaResume: string;
}

export interface AboutTranslations {
  header: {
    eyebrow: string;
    title: string;
    location: string;
    role: string;
    quickStats: {
      locationLabel: string;
      roleLabel: string;
      experienceLabel: string;
      experienceValue: string;
    };
  };
  bio: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    quote: string;
    stats: {
      speed: string;
      speedDesc: string;
      reliability: string;
      reliabilityDesc: string;
      testing: string;
      testingDesc: string;
    };
  };
  principles: {
    eyebrow: string;
    title: string;
    p1_title: string;
    p1_desc: string;
    p2_title: string;
    p2_desc: string;
    p3_title: string;
    p3_desc: string;
    p4_title: string;
    p4_desc: string;
  };
  journey: {
    eyebrow: string;
    title: string;
  };
  interests: {
    eyebrow: string;
    title: string;
    chess: string;
    chessDesc: string;
    reading: string;
    readingDesc: string;
    openSource: string;
    openSourceDesc: string;
  };
  goals: {
    eyebrow: string;
    title: string;
    g1Title: string;
    g1Desc: string;
    g2Title: string;
    g2Desc: string;
    g3Title: string;
    g3Desc: string;
  };
}

export interface ProjectsPageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  filterAll: string;
  filterBackend: string;
  filterAI: string;
  filterFullStack: string;
  filterRealTime: string;
  searchPlaceholder: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
}

export interface ExperiencePageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  statRoles: string;
  statUsers: string;
  statUptime: string;
  statTests: string;
  currentNoteLabel: string;
  currentNoteSub: string;
  beyondEyebrow: string;
  beyondTitle: string;
  beyondSubtitle: string;
  certificationsLabel: string;
  languagesLabel: string;
}

export interface SkillsPageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  filterAll: string;
  filterBackend: string;
  filterData: string;
  filterArch: string;
  filterAI: string;
  primaryStack: string;
  primarySubtitle: string;
  allGroups: string;
  certsEyebrow: string;
  certsTitle: string;
}

export interface EducationPageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  uniTitle: string;
  degreeTitle: string;
  statusBadge: string;
  courseworkTitle: string;
  builtWhileStudying: string;
  credentialsTitle: string;
}

export interface BlogPageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  allCategory: string;
  plannedTitle: string;
  latestTitle: string;
  writeArticle: string;
  readArticle: string;
}

export interface ResumePageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  downloadBtn: string;
  printBtn: string;
  summaryLabel: string;
  experienceLabel: string;
  educationLabel: string;
  skillsLabel: string;
  projectsLabel: string;
}

export interface ContactPageTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitBtn: string;
  sendingBtn: string;
  successMsg: string;
  errorMsg: string;
  channelsTitle: string;
  availabilityBadge: string;
  locationTitle: string;
  locationValue: string;
}

export interface ChatWidgetTranslations {
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  suggestions: string[];
}

export interface CaseStudyTranslations {
  roleLabel: string;
  timelineLabel: string;
  deliverablesLabel: string;
  statusLabel: string;
  problemTitle: string;
  whatIBuiltTitle: string;
  architectureTitle: string;
  resultsTitle: string;
  allProjects: string;
  nextProject: string;
  prevProject: string;
  backToProjects: string;
}

export interface FooterTranslations {
  tagline: string;
  pagesLabel: string;
  projectsLabel: string;
  connectLabel: string;
  colophon: string;
  rights: string;
  backToTop: string;
}

export interface ProjectTranslationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics?: { label: string; value: string }[];
}

export interface RoleTranslationItem {
  id: string;
  role: string;
  place: string;
  summary: string;
  bullets: string[];
}

export interface TranslationDictionary {
  nav: NavTranslations;
  hero: HeroTranslations;
  intro: IntroTranslations;
  featuredWork: FeaturedWorkTranslations;
  experiencePreview: ExperiencePreviewTranslations;
  educationSection: EducationSectionTranslations;
  journalTeaser: JournalTeaserTranslations;
  nowCta: NowCtaTranslations;
  about: AboutTranslations;
  projectsPage: ProjectsPageTranslations;
  experiencePage: ExperiencePageTranslations;
  skillsPage: SkillsPageTranslations;
  educationPage: EducationPageTranslations;
  blogPage: BlogPageTranslations;
  resumePage: ResumePageTranslations;
  contactPage: ContactPageTranslations;
  chatWidget: ChatWidgetTranslations;
  caseStudy: CaseStudyTranslations;
  footer: FooterTranslations;
  projects: Record<string, ProjectTranslationItem>;
  roles: Record<string, RoleTranslationItem>;
}
