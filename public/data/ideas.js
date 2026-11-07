/**
 * Ideas & Reflections Collection Data Source
 * 
 * To add a new document or reflection to your digital bookshelf:
 * Simply append a new object to the IDEAS_COLLECTION array below.
 * No UI components need to be modified.
 * 
 * @typedef {Object} IdeaDocument
 * @property {string} id - Unique slug identifier
 * @property {string} title - Document title
 * @property {string} category - Category (e.g. Philosophy, Technology, Reading, Research, Personal)
 * @property {string} description - Brief summary/thesis of the document
 * @property {string} cover - Path to cover artwork (relative to repo root)
 * @property {string} googleDriveUrl - Shareable Google Drive view link for the PDF
 * @property {string[]} tags - Associated topic tags
 * @property {string} [date] - Publication / reflection year or date
 * @property {string} [actionLabel] - CTA button label (default: "Read Reflection ↗")
 * @property {boolean} [featured] - Whether this item is featured on the homepage
 * 
 * Future Document Example (Philosophy):
 * {
 *   id: "notes-on-kant",
 *   title: "Notes on Kant",
 *   category: "Philosophy",
 *   description: "Reflections on duty, perception, and Critique of Pure Reason.",
 *   cover: "images/ideas/kant.jpg",
 *   googleDriveUrl: "https://drive.google.com/...",
 *   tags: ["Kant", "Philosophy", "Epistemology"]
 * }
 * 
 * Future Document Example (Technology):
 * {
 *   id: "flutter-architecture-notes",
 *   title: "Flutter Architecture Notes",
 *   category: "Technology",
 *   description: "Scalable state management patterns and clean architecture in Flutter.",
 *   cover: "images/ideas/flutter.jpg",
 *   googleDriveUrl: "https://drive.google.com/...",
 *   tags: ["Flutter", "Engineering", "Architecture"]
 * }
 */

window.IDEAS_COLLECTION = [
  {
    id: "beyond-the-title",
    title: "Beyond the Title",
    category: "Philosophy",
    description: "A personal reflection on ambition, recognition, freedom, and self-worth.",
    cover: "images/bagaimana_saya_ingin_menjalani_hidup.png",
    googleDriveUrl: "https://drive.google.com/file/d/1YEcnd4U2qnnLSNF6PnGBmftrFmpH0nSW/view?usp=sharing",
    tags: ["Diogenes", "Philosophy", "Reflection", "Career", "Self-worth"],
    date: "2026",
    actionLabel: "Read Reflection ↗",
    featured: true
  },
  {
    id: "what-remains-of-me",
    title: "What Remains of Me?",
    category: "Philosophy",
    description: "A personal reflection on desire, recognition, ambition, and what remains when professional status no longer defines self-worth.",
    cover: "images/what_remains_of_me.png",
    googleDriveUrl: "https://drive.google.com/file/d/1rz5rGg04TTUm8e0VkVphQ6cAjpDPHRw3/view?usp=sharing",
    tags: ["Schopenhauer", "Philosophy", "Reflection", "Career", "Recognition", "Self-worth"],
    date: "2026",
    actionLabel: "Read Reflection ↗",
    featured: false
  },
  {
    id: "the-weight-of-being-unseen",
    title: "The Weight of Being Unseen",
    category: "Philosophy",
    description: "A personal reflection through Crime and Punishment on responsibility, recognition, isolation, ambition, and finding self-worth beyond professional status.",
    cover: "images/the_weight_of_being_unseen.jpg",
    googleDriveUrl: "https://drive.google.com/file/d/1QhlAGPnvLyxMOAsnLZgVvx5D2XnRCNX3/view?usp=sharing",
    tags: ["Dostoevsky", "Crime and Punishment", "Philosophy", "Reflection", "Career", "Recognition", "Self-worth", "Agency"],
    date: "2026",
    actionLabel: "Read Reflection ↗",
    featured: false
  }
];
