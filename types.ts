export enum RiskLevel {
  LOW = 'Düşük',
  MODERATE = 'Orta',
  HIGH = 'Yüksek',
  VERY_HIGH = 'Çok Yüksek'
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface DataPoint {
  name: string;
  value: number;
}

export interface DiagnosticCriteria {
  test: string;
  normal: string;
  prediabetes: string;
  diabetes: string;
}