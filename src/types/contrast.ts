export type Modality = 'CT' | 'MRI';

export type Gender = 'male' | 'female';

export type WeightUnit = 'kg' | 'lbs';
export type HeightUnit = 'cm' | 'in';
export type CreatinineUnit = 'mg/dL' | 'umol/L';

export type IVGauge = '18G' | '20G' | '22G' | '24G' | 'CVC_PICC';

export type AllergySeverity = 'none' | 'mild' | 'moderate' | 'severe';

export interface ContrastAgent {
  id: string;
  brandName: string;
  genericName: string;
  manufacturer: string;
  modality: Modality;
  concentrationValue: number; // e.g. 350 for 350 mg I/mL or 1.0 for 1.0 mmol/mL
  concentrationUnit: 'mg I/mL' | 'mmol/mL';
  osmolality: number; // mOsm/kg H2O
  osmolarityType: 'iso-osmolar' | 'low-osmolar' | 'high-osmolar';
  viscosity37: number; // mPa.s at 37 deg C
  structure: 'monomeric' | 'dimeric' | 'macrocyclic' | 'linear';
  ionicity: 'non-ionic' | 'ionic';
  nsfGroup?: 'Group I' | 'Group II' | 'Group III'; // For MRI agents
  standardDoseFactor: number; // standard CT mg I/kg (e.g. 525) or standard MRI mmol/kg (e.g. 0.1 or 0.025)
  vialSizes: number[]; // mL available sizes
  isPediatricApproved: boolean;
  notes?: string;
}

export interface PhaseTiming {
  name: string;
  delaySeconds?: number;
  timingMethod: 'Bolus Tracking' | 'Fixed Delay' | 'Test Bolus' | 'Dynamic DCE' | 'Immediate' | 'Delayed';
  triggerHU?: number;
  roiLocation?: string;
  description: string;
}

export interface StudyProtocol {
  id: string;
  modality: Modality;
  bodyPartId: string;
  bodyPartName: string;
  name: string;
  category: string;
  description: string;
  clinicalIndications: string[];
  standardFlowRate: number; // mL/s
  minGaugeRecommended: IVGauge;
  salineVolume: number; // mL
  salineFlowRate: number; // mL/s
  phases: PhaseTiming[];
  clinicalCaveats: string[];
  fixedAdultVolumeOverride?: number; // mL if strictly fixed
  targetIodineDosePerKg?: number; // mg I/kg for CT
  targetGadDosePerKg?: number; // mmol/kg for MRI
}

export interface PatientProfile {
  age: number;
  gender: Gender;
  weight: number;
  weightUnit: WeightUnit;
  height: number;
  heightUnit: HeightUnit;
  serumCreatinine: number;
  creatinineUnit: CreatinineUnit;
  isDialysis: boolean;
  isAKI: boolean; // Acute kidney injury
  hasMetformin: boolean;
  allergyHistory: AllergySeverity;
  ivGauge: IVGauge;
  ctKvp: 80 | 100 | 120 | 140;
  useLeanBodyWeight: boolean;
  selectedAgentId: string;
  customConcentration?: number;
  selectedProtocolId: string;
}

export interface CalculationResult {
  contrastVolumeMl: number;
  flowRateMlPerSec: number;
  injectionDurationSec: number;
  totalActiveSubstance: number; // grams Iodine or mmol Gadolinium
  activeSubstanceUnit: string;
  dosePerKgActual: number;
  dosePerKgUnit: string;
  salineVolumeMl: number;
  salineFlowRateMlPerSec: number;
  
  // Body metrics
  weightKg: number;
  heightCm: number;
  bmi: number;
  bsa: number; // m^2
  leanBodyWeightKg: number;
  effectiveDosingWeightKg: number;

  // Renal & Safety
  eGFR: number | null;
  ckdStage: string;
  renalRiskLevel: 'safe' | 'low-risk' | 'moderate-risk' | 'high-risk' | 'contraindicated';
  renalRecommendations: string[];
  
  // IV Line Compatibility
  ivCompatibility: {
    safe: boolean;
    maxGaugeRate: number;
    warning?: string;
  };

  // Packaging
  vialPackaging: {
    vialSize: number;
    vialCount: number;
    wasteVolumeMl: number;
  };

  // Metformin & Allergies
  metforminAlert?: {
    withholdRequired: boolean;
    instructions: string;
  };
  allergyAlert?: {
    premedicationRequired: boolean;
    regimen: string;
  };

  // Guidance alerts
  clinicalAlerts: {
    severity: 'danger' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  }[];
}
