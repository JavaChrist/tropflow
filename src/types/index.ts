// Types centralisés pour l'application TripFlow

// Déplacement (container principal)
export interface Trip {
  id: string;
  userId: string;
  name: string; // "PI Planning Lyon"
  destination: string; // "Lyon"
  purpose: string; // "PI Planning"
  departureDate: string;
  returnDate: string;
  contractNumber: string; // Du profil utilisateur
  collaborator: {
    firstName: string;
    lastName: string;
  };
  remarks?: string;
  status: 'draft' | 'submitted' | 'paid';
  createdAt: string;
  updatedAt: string;
}

// Note de frais (rattachée à un déplacement)
export interface ExpenseNote {
  id: string;
  tripId: string; // Rattachée au déplacement
  userId: string;
  category: 'transport_long' | 'transport_short' | 'accommodation' | 'meals' | 'other';
  subcategory: string;
  description: string;
  amount: number;
  date: string;
  receiptUrl?: string;
  receiptName?: string;
  isVeloce: boolean;
  isPersonal: boolean;
  createdAt: string;
  updatedAt: string;
}

// Résumé d'un déplacement avec totaux
export interface TripSummary extends Trip {
  notes: ExpenseNote[];
  totalAmount: number;
  totalVeloce: number;
  totalPersonal: number;
  notesCount: number;
}

// === NOUVEAU SYSTÈME DE PLANS ===

// Types de plans disponibles
export type PlanType = 'free' | 'pro_individual' | 'pro_enterprise';

// Plan de tarification
export interface Plan {
  id: PlanType;
  name: string;
  price: number; // Prix en centimes (ex: 999 = 9.99€)
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    maxTrips: number | null; // null = illimité
    maxUsers: number | null; // null = illimité
  };
  stripePriceId?: string; // ID Stripe pour l'abonnement
}

// Abonnement utilisateur
export interface Subscription {
  id: string;
  userId: string;
  planType: PlanType;
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

// Profil utilisateur étendu avec informations de plan
export interface UserProfileWithPlan {
  uid: string;
  email: string;
  displayName: string;
  contractNumber: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  // Nouveau : informations de plan
  planType: PlanType;
  subscription?: Subscription;
  organizationId?: string; // Pour les plans entreprise
}

// Organisation (pour les plans entreprise)
export interface Organization {
  id: string;
  name: string;
  adminUserId: string; // Propriétaire de l'organisation
  memberIds: string[]; // Liste des membres
  planType: 'pro_enterprise';
  subscription: Subscription;
  createdAt: string;
  updatedAt: string;
}

// Statistiques d'utilisation
export interface UsageStats {
  userId: string;
  currentTripsCount: number;
  maxTripsAllowed: number | null;
  isLimitReached: boolean;
  planType: PlanType;
} 