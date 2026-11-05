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

export interface ExpertiseTranslations {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  backendTitle: string;
  backendDesc: string;
  dataTitle: string;
  dataDesc: string;
  realtimeTitle: string;
  realtimeDesc: string;
  deliveryTitle: string;
  deliveryDesc: string;
}

export interface AboutTimelineItem {
  year: string;
  title: string;
  description: string;
  company: string;
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
    timeline: AboutTimelineItem[];
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
  allProjectsLabel: string;
  showingCount: string;
  caseStudyBtn: string;
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
  allStack: string;
  searchPlaceholder: string;
  colTech: string;
  colCategory: string;
  colUsed: string;
  noMatchingTech: string;
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
  featuredEssay: string;
  latestPost: string;
  publishedBadge: string;
  articlesPublished: string;
  nothingToScroll: string;
  seeProjectsBtn: string;
  allPublishedArticles: string;
  noArticlesYet: string;
  noMatchingArticles: string;
  readArticleBtn: string;
  onTheDesk: string;
  plannedSubtitle: string;
  like: string;
  liked: string;
  likePrompt: string;
  likeThanks: string;
  viewsLabel: string;
  share: string;
  copied: string;
  onThisPage: string;
  prevArticle: string;
  nextArticle: string;
  relatedArticles: string;
  relatedEmpty: string;
  plannedTopicsBtn: string;
  commentsTitle: string;
  writeTab: string;
  previewTab: string;
  attachImage: string;
  removeImage: string;
  namePlaceholder: string;
  commentPlaceholder: string;
  postCommentBtn: string;
  replyBtn: string;
  editBtn: string;
  deleteBtn: string;
  cancelBtn: string;
  saveBtn: string;
  noCommentsYet: string;
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
  preferPdfTitle: string;
  preferPdfDesc: string;
  downloadPdfBtn: string;
  rolesCount: string;
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
  formHeadTitle: string;
  formHeadSubtitle: string;
  onlineBadge: string;
  subjectHint: string;
  directInboxNotice: string;
  successTitle: string;
  successDesc: string;
  sendAnotherBtn: string;
  telegramBtn: string;
  nameError: string;
  emailError: string;
  messageError: string;
  trustResponseLabel: string;
  trustResponseValue: string;
  trustResponseDesc: string;
  trustDirectLabel: string;
  trustDirectValue: string;
  trustDirectDesc: string;
  trustPrivacyLabel: string;
  trustPrivacyValue: string;
  trustPrivacyDesc: string;
  topics: {
    backend: string;
    ai: string;
    redis: string;
    job: string;
  };
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

export interface NotFoundTranslations {
  eyebrow: string;
  routeNotFound: string;
  title: string;
  description: string;
  backHome: string;
  browseProjects: string;
}

export interface FooterTranslations {
  sayHello: string;
  title: string;
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
  expertise: ExpertiseTranslations;
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
  notFound: NotFoundTranslations;
  footer: FooterTranslations;
  projects: Record<string, ProjectTranslationItem>;
  roles: Record<string, RoleTranslationItem>;
}
