/**
 * @fileoverview About Domain Types
 * @module features/about/types
 */

export interface Milestone {
  number: string;
  title: string;
  description: string;
}

export interface EquipmentFeature {
  title: string;
  gradientClass: string;
  description: string;
}

export interface AboutData {
  title: string;
  storyHeading: string;
  storySubheading: string;
  milestones: Milestone[];
  equipment: EquipmentFeature[];
}
