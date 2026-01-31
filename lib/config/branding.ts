export const branding = {
  company: {
    name: process.env.NEXT_PUBLIC_BRANDING_NAME || "PetCompanion India",
    tagline: "India's Trusted Pet Marketplace",
    description: "Connect with ethical breeders and find your perfect pet companion. All our pets are vet-checked and vaccinated for your peace of mind.",
    mission: "Ethical pet breeding connecting trusted breeders with loving homes",
    values: ["Trust", "Quality", "Ethics", "Animal Welfare", "Transparency"],
    foundingYear: 2023,
  },
  
  colors: {
    primary: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
      400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
      800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
    },
    accent: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
      400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
      800: '#065f46', 900: '#064e3b', 950: '#022c22',
    },
    warmBeige: '#F5E6D3',
    lightGrey: '#F3F4F6',
  },
  
  contact: {
    email: "contact@petcompanion.in",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@petcompanion.in",
    phone: "+91-XXXX-XXXX-XXXX",
    address: { street: "123 Pet Street", city: "Bangalore", state: "Karnataka", zipCode: "560001", country: "India" },
  },
  
  social: {
    instagram: "https://instagram.com/petcompanion",
    facebook: "https://facebook.com/petcompanion",
    youtube: "https://youtube.com/petcompanion",
    twitter: "https://twitter.com/petcompanion",
    linkedin: "https://linkedin.com/company/petcompanion",
  },
  
  certifications: [
    { name: "ISO 9001:2015", icon: "Award" },
    { name: "PETA Approved", icon: "Heart" },
    { name: "Ethical Breeding Standards", icon: "ShieldCheck" },
    { name: "Veterinary Certified", icon: "Stethoscope" },
  ],
  
  stats: {
    happyHomes: "10,000+", verifiedSellers: "500+", satisfactionRate: "98%", petsAdopted: "15,000+", yearsExperience: "2+",
  },
  
  commission: { defaultRate: 10, minimumPayout: 1000 },
  payment: { currency: "INR", currencySymbol: "₹", taxRate: 18, razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "" },
  features: { maxImagesPerListing: 10, maxVideoSizeMB: 50, sellerVerificationRequired: true, enableReviews: true, enableMessaging: true, enableAnalytics: true },
};

export type BrandingConfig = typeof branding;
export const getCompanyName = () => branding.company.name;
export const getSupportEmail = () => branding.contact.supportEmail;
export const getPrimaryColor = () => branding.colors.primary[600];
export const getAccentColor = () => branding.colors.accent[500];
