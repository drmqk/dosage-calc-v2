import {
  PatientProfile,
  ContrastAgent,
  StudyProtocol,
  CalculationResult,
  IVGauge,
} from '../types/contrast';

export function convertWeightToKg(weight: number, unit: 'kg' | 'lbs'): number {
  return unit === 'kg' ? weight : weight * 0.45359237;
}

export function convertHeightToCm(height: number, unit: 'cm' | 'in'): number {
  return unit === 'cm' ? height : height * 2.54;
}

export function convertCreatinineToMgDl(creatinine: number, unit: 'mg/dL' | 'umol/L'): number {
  return unit === 'mg/dL' ? creatinine : creatinine / 88.42;
}

/**
 * Calculates Body Mass Index (kg/m^2)
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

/**
 * Calculates Body Surface Area (Mosteller formula)
 */
export function calculateBSA(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  return Number(Math.sqrt((heightCm * weightKg) / 3600).toFixed(2));
}

/**
 * Calculates Lean Body Weight (James Formula)
 */
export function calculateLeanBodyWeight(weightKg: number, heightCm: number, gender: 'male' | 'female'): number {
  if (heightCm <= 0 || weightKg <= 0) return weightKg;
  let lbw = 0;
  if (gender === 'male') {
    lbw = 1.10 * weightKg - 128 * Math.pow(weightKg / heightCm, 2);
  } else {
    lbw = 1.07 * weightKg - 148 * Math.pow(weightKg / heightCm, 2);
  }
  // Clamp between 40% and 100% of actual weight
  const minLbw = weightKg * 0.45;
  return Number(Math.max(minLbw, Math.min(weightKg, lbw)).toFixed(1));
}

/**
 * Calculates Ideal Body Weight (Devine Formula)
 */
export function calculateIdealBodyWeight(heightCm: number, gender: 'male' | 'female'): number {
  const heightInches = heightCm / 2.54;
  if (heightInches < 60) {
    return gender === 'male' ? 50 : 45.5;
  }
  const inchesOver60 = heightInches - 60;
  const ibw = gender === 'male' ? 50 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60;
  return Number(ibw.toFixed(1));
}

/**
 * Calculates eGFR using:
 * - CKD-EPI 2021 Creatinine Equation (race-free standard recommended by ASN/NKF) for adults (>= 18)
 * - Bedside Schwartz formula for pediatrics (< 18)
 */
export function calculateEGFR(
  age: number,
  gender: 'male' | 'female',
  serumCreatinineMgDl: number,
  heightCm: number
): { eGFR: number; ckdStage: string } | null {
  if (serumCreatinineMgDl <= 0) return null;

  let egfr = 0;

  if (age < 18) {
    // Bedside Schwartz Equation for Pediatrics
    // eGFR = (0.413 * height_cm) / Scr
    if (heightCm <= 0) return null;
    egfr = (0.413 * heightCm) / serumCreatinineMgDl;
  } else {
    // CKD-EPI 2021 Race-Free Equation
    const scr = serumCreatinineMgDl;
    if (gender === 'female') {
      const kappa = 0.7;
      const alpha = -0.241;
      const minVal = Math.min(scr / kappa, 1);
      const maxVal = Math.max(scr / kappa, 1);
      egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * 1.012;
    } else {
      const kappa = 0.9;
      const alpha = -0.302;
      const minVal = Math.min(scr / kappa, 1);
      const maxVal = Math.max(scr / kappa, 1);
      egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age);
    }
  }

  const rounded = Math.round(egfr);

  let ckdStage = 'Stage 1: Normal or high (>= 90 mL/min/1.73m²)';
  if (rounded >= 90) {
    ckdStage = 'Stage 1: Normal (>= 90)';
  } else if (rounded >= 60) {
    ckdStage = 'Stage 2: Mildly decreased (60-89)';
  } else if (rounded >= 45) {
    ckdStage = 'Stage 3a: Mild to moderate (45-59)';
  } else if (rounded >= 30) {
    ckdStage = 'Stage 3b: Moderate to severe (30-44)';
  } else if (rounded >= 15) {
    ckdStage = 'Stage 4: Severely decreased (15-29)';
  } else {
    ckdStage = 'Stage 5: Kidney failure (< 15)';
  }

  return { eGFR: rounded, ckdStage };
}

/**
 * Checks IV gauge safety limits against recommended flow rate
 */
export function checkIVGauge(
  gauge: IVGauge,
  flowRate: number
): { safe: boolean; maxGaugeRate: number; warning?: string } {
  let maxRate = 5.5;
  switch (gauge) {
    case '18G':
      maxRate = 5.5;
      break;
    case '20G':
      maxRate = 4.0;
      break;
    case '22G':
      maxRate = 2.5;
      break;
    case '24G':
      maxRate = 1.5;
      break;
    case 'CVC_PICC':
      maxRate = 2.0;
      break;
  }

  if (gauge === 'CVC_PICC') {
    if (flowRate > 2.0) {
      return {
        safe: false,
        maxGaugeRate: 2.0,
        warning: `Selected flow rate (${flowRate.toFixed(1)} mL/s) exceeds standard CVC/PICC threshold (max 2.0 mL/s). Verify if catheter is specifically labeled 'Power-Injectable' (up to 300 psi) prior to high-pressure injection.`
      };
    }
    return {
      safe: true,
      maxGaugeRate: 2.0,
      warning: 'Confirm port/PICC is power-injectable (rated 300 psi) before connecting dual-head injector.'
    };
  }

  if (flowRate > maxRate) {
    return {
      safe: false,
      maxGaugeRate: maxRate,
      warning: `Selected flow rate of ${flowRate.toFixed(1)} mL/s exceeds safe limit for ${gauge} IV catheter (max ~${maxRate.toFixed(1)} mL/s). High risk of extravasation or line rupture. Upgrade IV line or reduce injection rate.`
    };
  }

  return {
    safe: true,
    maxGaugeRate: maxRate
  };
}

/**
 * Calculate recommended commercial vial combination and waste volume
 */
export function calculateVialPackaging(
  volumeMl: number,
  vialSizes: number[]
): { vialSize: number; vialCount: number; wasteVolumeMl: number } {
  if (!vialSizes || vialSizes.length === 0) {
    return { vialSize: 100, vialCount: 1, wasteVolumeMl: 0 };
  }

  const sortedSizes = [...vialSizes].sort((a, b) => a - b);
  
  // Find single vial that covers volume
  for (const size of sortedSizes) {
    if (size >= volumeMl) {
      return {
        vialSize: size,
        vialCount: 1,
        wasteVolumeMl: Number((size - volumeMl).toFixed(1))
      };
    }
  }

  // If larger than largest single vial, use multiples of largest vial
  const largest = sortedSizes[sortedSizes.length - 1];
  const count = Math.ceil(volumeMl / largest);
  const totalProvided = count * largest;
  return {
    vialSize: largest,
    vialCount: count,
    wasteVolumeMl: Number((totalProvided - volumeMl).toFixed(1))
  };
}

/**
 * Master Contrast Dosing Calculation Function
 */
export function calculateContrastProtocol(
  profile: PatientProfile,
  agent: ContrastAgent,
  protocol: StudyProtocol
): CalculationResult {
  const weightKg = convertWeightToKg(profile.weight, profile.weightUnit);
  const heightCm = convertHeightToCm(profile.height, profile.heightUnit);
  const serumCreatinineMgDl = convertCreatinineToMgDl(profile.serumCreatinine, profile.creatinineUnit);
  const isPediatric = profile.age < 18;

  const bmi = calculateBMI(weightKg, heightCm);
  const bsa = calculateBSA(weightKg, heightCm);
  const lbw = calculateLeanBodyWeight(weightKg, heightCm, profile.gender);

  // Effective dosing weight
  // For CT in overweight/obese patients (BMI >= 30), dosing based on Lean Body Weight
  // prevents parenchymal overdosing of hypovascular adipose tissue
  let effectiveDosingWeight = weightKg;
  if (protocol.modality === 'CT' && bmi >= 30 && profile.useLeanBodyWeight) {
    effectiveDosingWeight = lbw;
  }

  // 1. Dosing calculation
  let contrastVolume = 0;
  let totalActiveSubstance = 0; // grams Iodine or mmol Gadolinium
  let activeSubstanceUnit = 'g I';
  let dosePerKgActual = 0;
  let dosePerKgUnit = 'mg I/kg';

  if (protocol.modality === 'CT') {
    activeSubstanceUnit = 'g Iodine';
    dosePerKgUnit = 'mg I/kg';

    // Concentration in mg I/mL (e.g. 350)
    const concentration = profile.customConcentration || agent.concentrationValue;

    // kVp scaling factor: lower kVp allows iodine dose reduction because of higher k-edge photoelectric absorption
    let kvpFactor = 1.0;
    if (profile.ctKvp === 80) kvpFactor = 0.70;
    else if (profile.ctKvp === 100) kvpFactor = 0.82;
    else if (profile.ctKvp === 120) kvpFactor = 1.0;
    else if (profile.ctKvp === 140) kvpFactor = 1.15;

    if (isPediatric) {
      // Pediatric CT guideline: 1.5 - 2.0 mL/kg (max 100-120 mL adult equivalent)
      const pedsDoseMlPerKg = 1.5;
      contrastVolume = Math.min(100, weightKg * pedsDoseMlPerKg);
      totalActiveSubstance = (contrastVolume * concentration) / 1000;
      dosePerKgActual = Number(((totalActiveSubstance * 1000) / weightKg).toFixed(0));
    } else if (protocol.fixedAdultVolumeOverride) {
      contrastVolume = protocol.fixedAdultVolumeOverride * kvpFactor;
      totalActiveSubstance = (contrastVolume * concentration) / 1000;
      dosePerKgActual = Number(((totalActiveSubstance * 1000) / weightKg).toFixed(0));
    } else {
      // Tailored weight-based target: default 525 mg I/kg (adjusted by protocol or kVp)
      const targetIodinePerKg = (protocol.targetIodineDosePerKg || agent.standardDoseFactor) * kvpFactor;
      // Total Iodine in grams
      totalActiveSubstance = (effectiveDosingWeight * targetIodinePerKg) / 1000;
      // Volume = (Total grams * 1000) / concentration
      contrastVolume = (totalActiveSubstance * 1000) / concentration;
      dosePerKgActual = Number(targetIodinePerKg.toFixed(0));
    }

    // Safety volume cap for CT (routine maximum safe single administration is 150 mL, or up to 200 mL for heavy CTA runoff)
    const maxVolumeCap = protocol.id.includes('runoff') ? 160 : 140;
    contrastVolume = Math.min(maxVolumeCap, Math.max(10, contrastVolume));
    contrastVolume = Math.round(contrastVolume);
    totalActiveSubstance = Number(((contrastVolume * concentration) / 1000).toFixed(1));

  } else {
    // --- MRI MODALITY ---
    activeSubstanceUnit = 'mmol Gd';
    dosePerKgUnit = 'mmol/kg';

    const concentration = profile.customConcentration || agent.concentrationValue; // mmol/mL (e.g. 0.5 or 1.0 or 0.25)
    
    // Target dose in mmol/kg (e.g. 0.1 mmol/kg for standard extracellular, or 0.025 for Eovist)
    const targetGadPerKg = protocol.targetGadDosePerKg || agent.standardDoseFactor;

    totalActiveSubstance = Number((effectiveDosingWeight * targetGadPerKg).toFixed(2));
    contrastVolume = Number((totalActiveSubstance / concentration).toFixed(1));
    dosePerKgActual = targetGadPerKg;

    // Pediatric clamp: strictly weight-based
    if (isPediatric) {
      contrastVolume = Number(((weightKg * targetGadPerKg) / concentration).toFixed(1));
      totalActiveSubstance = Number((contrastVolume * concentration).toFixed(2));
    }
  }

  // 2. Flow rate & saline chaser
  const flowRate = protocol.standardFlowRate;
  const salineVolume = protocol.salineVolume;
  const salineRate = protocol.salineFlowRate;
  const injectionDuration = Number((contrastVolume / flowRate).toFixed(1));

  // 3. Packaging & Waste
  const vialPackaging = calculateVialPackaging(contrastVolume, agent.vialSizes);

  // 4. Renal Function (eGFR & CKD Staging)
  const egfrResult = calculateEGFR(profile.age, profile.gender, serumCreatinineMgDl, heightCm);
  const eGFR = profile.isDialysis ? 5 : egfrResult ? egfrResult.eGFR : null;
  const ckdStage = profile.isDialysis ? 'Stage 5 (Dialysis)' : egfrResult ? egfrResult.ckdStage : 'Creatinine not provided';

  // 5. Risk Assessment (ACR Manual on Contrast Media v2024 / ESUR 10.0)
  let renalRiskLevel: CalculationResult['renalRiskLevel'] = 'safe';
  const renalRecommendations: string[] = [];
  const clinicalAlerts: CalculationResult['clinicalAlerts'] = [];

  if (profile.isDialysis) {
    renalRiskLevel = 'contraindicated';
    if (protocol.modality === 'CT') {
      clinicalAlerts.push({
        severity: 'warning',
        title: 'Dialysis Dependent Patient (Anuric/Oliguric)',
        message: 'No risk of osmotic nephropathy if anuric. Do NOT schedule extra dialysis post-CT unless volume overloaded. Ensure volume administered does not cause fluid overload.'
      });
    } else {
      if (agent.nsfGroup === 'Group I') {
        clinicalAlerts.push({
          severity: 'danger',
          title: 'ACR Contraindication: Group I GBCA on Dialysis',
          message: 'Group I GBCAs (Magnevist, Omniscan) are STRICTLY CONTRAINDICATED in dialysis patients due to high Nephrogenic Systemic Fibrosis (NSF) risk. Switch immediately to a Group II agent (Gadobutrol, Gadoterate, Gadoteridol).'
        });
      } else {
        clinicalAlerts.push({
          severity: 'info',
          title: 'Group II GBCA on Dialysis',
          message: 'ACR guidelines: Group II GBCAs carry negligible unconfounded NSF risk. Hemodialysis within 2-3 hours post-scan is recommended by some centers to clear gadolinium, but not strictly required by ACR if Group II is used.'
        });
      }
    }
  } else if (profile.isAKI) {
    renalRiskLevel = 'high-risk';
    clinicalAlerts.push({
      severity: 'danger',
      title: 'Acute Kidney Injury (AKI) Present',
      message: 'Severe risk of Contrast-Associated Acute Kidney Injury (CA-AKI). Contrast should be avoided unless urgently needed for life-threatening management. Consult nephrology and consider pre-hydration.'
    });
  } else if (eGFR !== null) {
    if (eGFR >= 60) {
      renalRiskLevel = 'safe';
      renalRecommendations.push('Normal/adequate renal clearance. No special contrast-sparing or pre-hydration required.');
    } else if (eGFR >= 45) {
      renalRiskLevel = 'low-risk';
      renalRecommendations.push('Mildly decreased eGFR (45-59 mL/min/1.73m²). ACR considers this safe for routine intravenous contrast with voluntary oral hydration.');
    } else if (eGFR >= 30) {
      renalRiskLevel = 'moderate-risk';
      if (protocol.modality === 'CT') {
        renalRecommendations.push('ACR CI-AKI relative risk threshold (eGFR 30-44 mL/min/1.73m²). Consider intravenous hydration (0.9% Normal Saline 1 mL/kg/h for 3-4 hours pre- and post-exam) if multiple comorbidities exist.');
        clinicalAlerts.push({
          severity: 'warning',
          title: 'Renal Caution: eGFR 30-44 mL/min/1.73m²',
          message: 'Borderline CI-AKI risk. Recommend IV volume expansion (saline) and lowest diagnostic contrast volume. Iso-osmolar agent (Visipaque) may be considered.'
        });
      } else {
        if (agent.nsfGroup === 'Group I') {
          renalRecommendations.push('Group I GBCA carries moderate risk of NSF in stage 3b CKD. Group II agent preferred.');
        } else {
          renalRecommendations.push('Group II GBCA is safe. Routine renal screening is not mandatory for Group II according to ACR guidelines.');
        }
      }
    } else {
      // eGFR < 30
      renalRiskLevel = 'high-risk';
      if (protocol.modality === 'CT') {
        renalRecommendations.push('Severe CKD (eGFR < 30 mL/min/1.73m²). High risk of Contrast-Induced AKI. Assess risk vs benefit. If exam is mandatory: administer isotonic saline hydration (1 mL/kg/h 6-12h pre and 6-12h post) and minimize iodine mass.');
        clinicalAlerts.push({
          severity: 'danger',
          title: 'High CI-AKI Risk: eGFR < 30 mL/min/1.73m²',
          message: 'Significant risk of non-recovery renal deterioration. Obtain informed consent, consult ordering clinician/nephrologist, and provide IV saline hydration.'
        });
      } else {
        if (agent.nsfGroup === 'Group I') {
          renalRiskLevel = 'contraindicated';
          clinicalAlerts.push({
            severity: 'danger',
            title: 'CONTRAINDICATED: Group I GBCA in Severe Renal Failure',
            message: 'Group I linear gadolinium agents are contraindicated when eGFR < 30 mL/min/1.73m² due to high risk of Nephrogenic Systemic Fibrosis (NSF). Use a Group II macrocyclic agent (Gadobutrol, Gadoterate, Gadoteridol).'
          });
        } else if (agent.nsfGroup === 'Group II') {
          clinicalAlerts.push({
            severity: 'info',
            title: 'Group II GBCA Safe in eGFR < 30 mL/min',
            message: 'ACR Manual on Contrast Media confirms near-zero NSF risk with Group II macrocyclic agents. Can be administered when clinically indicated without routine hemodialysis.'
          });
        }
      }
    }
  }

  // 6. IV Compatibility check
  const ivCompatibility = checkIVGauge(profile.ivGauge, flowRate);
  if (!ivCompatibility.safe && ivCompatibility.warning) {
    clinicalAlerts.push({
      severity: 'warning',
      title: 'IV Access / Flow Rate Incompatibility',
      message: ivCompatibility.warning
    });
  }

  // 7. Metformin Check
  let metforminAlert: CalculationResult['metforminAlert'];
  if (profile.hasMetformin && protocol.modality === 'CT') {
    const needWithhold = (eGFR !== null && eGFR < 30) || profile.isAKI;
    metforminAlert = {
      withholdRequired: needWithhold,
      instructions: needWithhold
        ? 'ACR Policy: Patient has eGFR < 30 or AKI. Withhold Metformin at time of exam and for 48 hours post-procedure. Restart ONLY after re-evaluating renal function to confirm stable baseline.'
        : 'ACR Policy: Patient has eGFR >= 30 and no AKI. Metformin does NOT need to be withheld before or after intravenous iodinated contrast. Renal re-testing is not required.'
    };
    if (needWithhold) {
      clinicalAlerts.push({
        severity: 'warning',
        title: 'Metformin Withholding Required',
        message: metforminAlert.instructions
      });
    }
  }

  // 8. Allergy Check & Premedication
  let allergyAlert: CalculationResult['allergyAlert'];
  if (profile.allergyHistory !== 'none') {
    const isSevere = profile.allergyHistory === 'severe';
    const regimen = isSevere
      ? 'Severe prior reaction: Consider non-contrast alternative. If contrast is critical, use 13-hour elective oral premedication regimen (Prednisone 50 mg PO at 13h, 7h, 1h prior + Diphenhydramine 50 mg PO/IM 1h prior) AND change contrast agent class/brand. Have resuscitation cart ready with Epinephrine (1:1000 IM 0.3 mg).'
      : 'Mild/Moderate prior reaction: Standard ACR 13-hour elective premedication regimen (Prednisone 50 mg PO at 13, 7, and 1 hour before scan + Diphenhydramine 50 mg PO 1 hour before). In emergency: Methylprednisolone 32 mg IV 4 hours before + Diphenhydramine 50 mg IV.';
    
    allergyAlert = {
      premedicationRequired: true,
      regimen
    };

    clinicalAlerts.push({
      severity: isSevere ? 'danger' : 'warning',
      title: `Prior Contrast Allergy Reported (${profile.allergyHistory.toUpperCase()})`,
      message: regimen
    });
  }

  // 9. Lean body weight optimization notification
  if (protocol.modality === 'CT' && bmi >= 30 && profile.useLeanBodyWeight) {
    clinicalAlerts.push({
      severity: 'info',
      title: 'Lean Body Weight Dosing Applied',
      message: `Patient BMI is ${bmi} kg/m² (Obese). Dosing calculated on Lean Body Weight (${lbw} kg) instead of Total Weight (${weightKg} kg), reducing contrast load by ${(weightKg - lbw).toFixed(0)} kg equivalent while preserving liver/parenchymal signal-to-noise ratio.`
    });
  }

  // 10. Low kVp optimization notification
  if (protocol.modality === 'CT' && profile.ctKvp < 120) {
    const pctReduction = profile.ctKvp === 80 ? '30%' : '18%';
    clinicalAlerts.push({
      severity: 'info',
      title: `kVp-Adapted Iodine Reduction (${profile.ctKvp} kVp)`,
      message: `Operating at ${profile.ctKvp} kVp increases the photoelectric effect closer to the Iodine k-edge (33.2 keV). Iodine dose has been automatically scaled down by ${pctReduction} without compromising HU contrast enhancement.`
    });
  }

  return {
    contrastVolumeMl: contrastVolume,
    flowRateMlPerSec: flowRate,
    injectionDurationSec: injectionDuration,
    totalActiveSubstance,
    activeSubstanceUnit,
    dosePerKgActual,
    dosePerKgUnit,
    salineVolumeMl: salineVolume,
    salineFlowRateMlPerSec: salineRate,
    weightKg: Number(weightKg.toFixed(1)),
    heightCm: Number(heightCm.toFixed(1)),
    bmi,
    bsa,
    leanBodyWeightKg: lbw,
    effectiveDosingWeightKg: Number(effectiveDosingWeight.toFixed(1)),
    eGFR,
    ckdStage,
    renalRiskLevel,
    renalRecommendations,
    ivCompatibility,
    vialPackaging,
    metforminAlert,
    allergyAlert,
    clinicalAlerts
  };
}
