/**
 * Types globaux - Agence Web
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
