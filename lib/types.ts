import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  name?: string;
  message: string;
  error?: string;
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
  profiles: {
    id: string;
    phone: string | null;
    bio: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface IProperty {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  propertyType: string;
  amenities: string[];
  status: "AVAILABLE" | "RENTED";
  images: string[];
  createdAt: string;
  updatedAt: string;
  landlordId: string;
  categoryId: string | null;
  landlord: {
    id: string;
    name: string;
    email: string;
    profiles: { phone: string | null }[];
  };
  category: {
    id: string;
    name: string;
    description: string | null;
  } | null;
  averageRating: number | null;
  reviewCount: number;
}

export interface ICategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  propertyId: string;
  rentalRequestId: string;
  tenant: {
    id: string;
    name: string;
  };
}

export interface IPropertyDetail extends IProperty {
  reviews: IReview[];
}

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "REJECTED"
  | "COMPLETED";

export interface IRentalRequest {
  id: string;
  status: RentalStatus;
  moveInDate: string | null;
  message: string | null;
  tenantId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
  };
}
export type NavbarProps = {
  user: UserProfile | null;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export type PropertyType =
  | "All"
  | "Apartment"
  | "House"
  | "Studio"
  | "Room"
  | "Sublet"
  | "Duplex"
  | "Bachelor Mess";

export interface SearchFilters {
  city: string;
  neighborhood: string;
  propertyType: PropertyType;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "any";
  searchQuery: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  rating: number;
  name: string;
  role: string;
  avatar: string | null;
  badge: string;
}