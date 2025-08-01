export interface DomainResult {
  domain: string;
  available: boolean;
  price: number;
  suggestions?: string[];
}

export interface DomainExtension {
  id: string;
  name: string;
  price: number;
} 