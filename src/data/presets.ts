import { PatientProfile } from '../types/contrast';

export interface ClinicalPreset {
  id: string;
  title: string;
  subtitle: string;
  category: 'CT Vascular' | 'CT Abdomen' | 'MRI Neuro' | 'MRI Hepatic' | 'Pediatric' | 'Renal Sensitive';
  profile: Partial<PatientProfile>;
}

export const CLINICAL_PRESETS: ClinicalPreset[] = [
  {
    id: 'preset-ctpa',
    title: 'Acute Pulmonary Embolism (CTPA)',
    subtitle: '72 kg Adult · 4.5 mL/s · Bolus Tracking Main PA · Isovue 370',
    category: 'CT Vascular',
    profile: {
      age: 58,
      gender: 'male',
      weight: 72,
      weightUnit: 'kg',
      height: 175,
      heightUnit: 'cm',
      serumCreatinine: 0.9,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: false,
      allergyHistory: 'none',
      ivGauge: '20G',
      ctKvp: 100,
      useLeanBodyWeight: true,
      selectedProtocolId: 'ct-chest-ctpa',
      selectedAgentId: 'isovue-370'
    }
  },
  {
    id: 'preset-liver-hcc',
    title: 'Multiphase Liver HCC Protocol',
    subtitle: '80 kg Cirrhotic · Late Arterial + Portal + Delayed · Omnipaque 350',
    category: 'CT Abdomen',
    profile: {
      age: 63,
      gender: 'male',
      weight: 80,
      weightUnit: 'kg',
      height: 172,
      heightUnit: 'cm',
      serumCreatinine: 1.1,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: true,
      allergyHistory: 'none',
      ivGauge: '18G',
      ctKvp: 120,
      useLeanBodyWeight: true,
      selectedProtocolId: 'ct-liver-triphasic',
      selectedAgentId: 'omnipaque-350'
    }
  },
  {
    id: 'preset-renal-caution-ct',
    title: 'Elderly Renal Impairment (eGFR 34)',
    subtitle: '78yo Female · Iso-osmolar Visipaque 320 · Metformin user · Low kVp',
    category: 'Renal Sensitive',
    profile: {
      age: 78,
      gender: 'female',
      weight: 65,
      weightUnit: 'kg',
      height: 160,
      heightUnit: 'cm',
      serumCreatinine: 1.6,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: true,
      allergyHistory: 'none',
      ivGauge: '22G',
      ctKvp: 100,
      useLeanBodyWeight: true,
      selectedProtocolId: 'ct-abdomen-portal-venous',
      selectedAgentId: 'visipaque-320'
    }
  },
  {
    id: 'preset-obese-lbw',
    title: 'Obese Patient (BMI 38 - LBW Dosing)',
    subtitle: '118 kg Patient · James LBW formula applied · Prevents over-dosing',
    category: 'CT Abdomen',
    profile: {
      age: 49,
      gender: 'female',
      weight: 118,
      weightUnit: 'kg',
      height: 165,
      heightUnit: 'cm',
      serumCreatinine: 0.8,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: false,
      allergyHistory: 'none',
      ivGauge: '18G',
      ctKvp: 120,
      useLeanBodyWeight: true,
      selectedProtocolId: 'ct-abdomen-portal-venous',
      selectedAgentId: 'omnipaque-350'
    }
  },
  {
    id: 'preset-mri-brain-tumor',
    title: 'Brain Tumor Dynamic & Post-Gad MRI',
    subtitle: '68 kg Adult · Gadavist 1.0 M (Macrocyclic Group II) · Delayed T1',
    category: 'MRI Neuro',
    profile: {
      age: 52,
      gender: 'female',
      weight: 68,
      weightUnit: 'kg',
      height: 168,
      heightUnit: 'cm',
      serumCreatinine: 0.7,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: false,
      allergyHistory: 'none',
      ivGauge: '20G',
      ctKvp: 120,
      useLeanBodyWeight: false,
      selectedProtocolId: 'mri-brain-tumor-perfusion',
      selectedAgentId: 'gadavist-10'
    }
  },
  {
    id: 'preset-mri-eovist',
    title: 'Hepatobiliary MRI (Eovist / Primovist)',
    subtitle: '75 kg Adult · 0.025 mmol/kg dose · 20 min Hepatobiliary phase',
    category: 'MRI Hepatic',
    profile: {
      age: 60,
      gender: 'male',
      weight: 75,
      weightUnit: 'kg',
      height: 178,
      heightUnit: 'cm',
      serumCreatinine: 1.0,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: false,
      allergyHistory: 'none',
      ivGauge: '20G',
      ctKvp: 120,
      useLeanBodyWeight: false,
      selectedProtocolId: 'mri-liver-eovist',
      selectedAgentId: 'eovist-025'
    }
  },
  {
    id: 'preset-pediatric-ct',
    title: 'Pediatric Contrast CT (6-year-old)',
    subtitle: '22 kg Child · 1.5 mL/kg strict dosing · 80 kVp · 24G IV safety',
    category: 'Pediatric',
    profile: {
      age: 6,
      gender: 'male',
      weight: 22,
      weightUnit: 'kg',
      height: 115,
      heightUnit: 'cm',
      serumCreatinine: 0.4,
      creatinineUnit: 'mg/dL',
      isDialysis: false,
      isAKI: false,
      hasMetformin: false,
      allergyHistory: 'none',
      ivGauge: '24G',
      ctKvp: 80,
      useLeanBodyWeight: false,
      selectedProtocolId: 'ct-pediatric-routine',
      selectedAgentId: 'omnipaque-300'
    }
  }
];
