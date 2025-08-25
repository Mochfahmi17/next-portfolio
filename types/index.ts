export interface Level {
  id: string;
  name: string;
  competencyLevel: number;
  skills: Skills[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Skills {
  id: string;
  name: string;
  levelId: string;
  experienceLevel: Level;
  iconUrl: string;
  icon_public_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Categories {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Projects {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryProjectId: string;
  categoryProject: Categories;
  imageUrl: string;
  image_pubic_id: string;
  linkDemo?: string;
  linkRepository?: string;
  skills: Skills[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryProjectId: string;
  categoryProject: Categories;
  imageUrl: string;
  image_pubic_id: string;
  linkDemo?: string;
  linkRepository?: string;
  skills: Skills[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Cerificates {
  id: string;
  title: string;
  certificateUrl: string;
  certificate_public_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileUrl?: string;
  profile_public_id?: string;
  myCVUrl?: string;
  myCV_public_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LevelsResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Level[];
}

export interface SkillsResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Skills[];
}

export interface CategoriesResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Categories[];
}

export interface ProjectsResponse {
  success: boolean;
  error: boolean;
  message?: string;
  page: number;
  limit: number;
  totalPages: number;
  data: Projects[];
}

export interface ProjectDetailResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: ProjectDetail;
}

export interface SkillDetailResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Skills;
}

export interface CertificateResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Cerificates[];
}

export interface CertificateDetailResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Cerificates;
}

export interface UserResponse {
  success: boolean;
  error: boolean;
  data: User[];
}

export interface UserDetailResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: User;
}
