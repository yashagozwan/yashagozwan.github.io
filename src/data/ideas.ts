import type { IdeaDocument } from '@/types/portfolio'

/**
 * Ideas & Reflections Collection Data Source
 *
 * To add a new document or reflection to your digital bookshelf:
 * Simply append a new object to the IDEAS_COLLECTION array below.
 * No UI components need to be modified.
 */
export const IDEAS_COLLECTION: IdeaDocument[] = [
  {
    id: 'beyond-the-title',
    title: 'Beyond the Title',
    category: 'Philosophy',
    description: 'A personal reflection on ambition, recognition, freedom, and self-worth.',
    cover: '/images/bagaimana_saya_ingin_menjalani_hidup.png',
    googleDriveUrl: 'https://drive.google.com/file/d/1YEcnd4U2qnnLSNF6PnGBmftrFmpH0nSW/view?usp=sharing',
    tags: ['Diogenes', 'Philosophy', 'Reflection', 'Career', 'Self-worth'],
    date: '2026',
    actionLabel: 'Read Reflection ↗',
    featured: true,
  },
  {
    id: 'what-remains-of-me',
    title: 'What Remains of Me?',
    category: 'Philosophy',
    description:
      'A personal reflection on desire, recognition, ambition, and what remains when professional status no longer defines self-worth.',
    cover: '/images/what_remains_of_me.png',
    googleDriveUrl: 'https://drive.google.com/file/d/1rz5rGg04TTUm8e0VkVphQ6cAjpDPHRw3/view?usp=sharing',
    tags: ['Schopenhauer', 'Philosophy', 'Reflection', 'Career', 'Recognition', 'Self-worth'],
    date: '2026',
    actionLabel: 'Read Reflection ↗',
    featured: false,
  },
  {
    id: 'the-weight-of-being-unseen',
    title: 'The Weight of Being Unseen',
    category: 'Philosophy',
    description:
      'A personal reflection through Crime and Punishment on responsibility, recognition, isolation, ambition, and finding self-worth beyond professional status.',
    cover: '/images/the_weight_of_being_unseen.jpg',
    googleDriveUrl: 'https://drive.google.com/file/d/1QhlAGPnvLyxMOAsnLZgVvx5D2XnRCNX3/view?usp=sharing',
    tags: [
      'Dostoevsky',
      'Crime and Punishment',
      'Philosophy',
      'Reflection',
      'Career',
      'Recognition',
      'Self-worth',
      'Agency',
    ],
    date: '2026',
    actionLabel: 'Read Reflection ↗',
    featured: false,
  },
]

