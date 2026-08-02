import {
  MapPin,
  Home,
  Tag,
  CheckCircle,
  Phone,
  Mail,
  User,
} from "lucide-react";
import type { IPropertyDetail } from "@/lib/types";

interface PropertyInfoProps {
  property: IPropertyDetail;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 mt-1 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="mt-3">
          <span className="font-heading text-3xl font-bold text-[#1F4D3E]">
            ৳{property.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 ml-1">/month</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase rounded bg-[#1F4D3E]/10 text-[#1F4D3E]">
          <Home className="w-3 h-3" />
          {property.propertyType}
        </span>
        {property.category && (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase rounded bg-[#C98A2C]/10 text-[#C98A2C]">
            <Tag className="w-3 h-3" />
            {property.category.name}
          </span>
        )}
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase rounded ${
            property.status === "AVAILABLE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <CheckCircle className="w-3 h-3" />
          {property.status}
        </span>
      </div>

      {/* Description */}
      {property.description && (
        <div>
          <h2 className="font-heading font-bold text-sm text-[#1F4D3E] uppercase tracking-wider mb-2">
            DESCRIPTION
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {property.description}
          </p>
        </div>
      )}

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <div>
          <h2 className="font-heading font-bold text-sm text-[#1F4D3E] uppercase tracking-wider mb-2">
            AMENITIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1 text-xs bg-[#F4F5F1] border border-[#D8DBD3] rounded text-gray-600"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Landlord Card */}
      <div className="bg-[#F4F5F1] border border-[#D8DBD3] rounded-lg p-4">
        <h2 className="font-heading font-bold text-sm text-[#1F4D3E] uppercase tracking-wider mb-3">
          LANDLORD
        </h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1F4D3E] flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
           <p className="font-medium text-sm text-[#1B211E] truncate">
              {property.landlord.name}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500 min-w-0">
              <Mail className="w-3 h-3" />
               <span className="truncate">{property.landlord.email}</span>
            </div>
            {property.landlord.profiles?.[0]?.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <Phone className="w-3 h-3" />
                {property.landlord.profiles[0].phone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
