import { StudyProtocol } from '../types/contrast';

export const STUDY_PROTOCOLS: StudyProtocol[] = [
  // ==========================================
  // CT PROTOCOLS
  // ==========================================
  // --- BRAIN & NEURO ---
  {
    id: 'ct-brain-routine',
    modality: 'CT',
    bodyPartId: 'brain',
    bodyPartName: 'Brain / Head',
    name: 'CT Brain with Contrast (Routine)',
    category: 'Neuro / Head',
    description: 'Post-contrast brain CT for mass lesion, metastasis, abscess or infection evaluation.',
    clinicalIndications: ['Intracranial neoplasm', 'Abscess', 'Meningitis', 'Post-operative follow-up'],
    standardFlowRate: 2.0,
    minGaugeRecommended: '22G',
    salineVolume: 30,
    salineFlowRate: 2.0,
    phases: [
      {
        name: 'Equilibrium / Parenchymal Phase',
        delaySeconds: 65,
        timingMethod: 'Fixed Delay',
        description: 'Scan starts ~60-70 seconds after initiation of contrast injection.'
      }
    ],
    clinicalCaveats: [
      'Perform non-contrast head CT first if acute intracranial hemorrhage is suspected.',
      'Maintain head positioning in head holder without tilting to prevent beam-hardening artifacts.'
    ],
    targetIodineDosePerKg: 450
  },
  {
    id: 'ct-stroke-cta',
    modality: 'CT',
    bodyPartId: 'brain',
    bodyPartName: 'Brain / Head',
    name: 'CTA Head & Neck (Acute Stroke / TIA Protocol)',
    category: 'Neuro / Head',
    description: 'Rapid bolus arterial acquisition from aortic arch to vertex for vessel occlusion and collateral assessment.',
    clinicalIndications: ['Acute ischemic stroke (within window)', 'LVO (Large Vessel Occlusion)', 'TIA', 'Dissection'],
    standardFlowRate: 4.5,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 4.5,
    phases: [
      {
        name: 'Arterial Phase (Arch to Vertex)',
        timingMethod: 'Bolus Tracking',
        triggerHU: 120,
        roiLocation: 'Aortic Arch or Common Carotid Artery (C4 level)',
        description: 'Automatic trigger with 4-second prep delay once ROI reaches 120 HU.'
      }
    ],
    clinicalCaveats: [
      'High injection rate (4.0-5.0 mL/s) is mandatory for sharp arterial contrast column.',
      'Check IV line patency with 10 mL saline flush test before arm positioning.',
      'Follow immediately with multiphase CTA or perfusion CT if indicated.'
    ],
    targetIodineDosePerKg: 500
  },
  {
    id: 'ct-brain-ctv',
    modality: 'CT',
    bodyPartId: 'brain',
    bodyPartName: 'Brain / Head',
    name: 'CT Venography (CTV Brain - Dural Venous Sinus)',
    category: 'Neuro / Head',
    description: 'Venous phase imaging for dural venous sinus thrombosis (CVST).',
    clinicalIndications: ['Cerebral venous sinus thrombosis', 'Pseudotumor cerebri', 'Dural AV fistula'],
    standardFlowRate: 3.5,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 3.5,
    phases: [
      {
        name: 'Venous Phase',
        delaySeconds: 45,
        timingMethod: 'Fixed Delay',
        description: '40-45 seconds scan delay from start of injection to ensure homogeneous opacification of superior sagittal and transverse sinuses.'
      }
    ],
    clinicalCaveats: [
      'Do not scan too early (arterial phase causes pseudothrombosis artifact in sinuses).'
    ],
    targetIodineDosePerKg: 500
  },

  // --- NECK ---
  {
    id: 'ct-neck-soft-tissue',
    modality: 'CT',
    bodyPartId: 'neck',
    bodyPartName: 'Neck / Cervical',
    name: 'CT Neck Soft Tissue with Contrast',
    category: 'ENT / Soft Tissue',
    description: 'Detailed opacification of cervical lymph nodes, pharynx, larynx, and deep neck spaces.',
    clinicalIndications: ['Head & neck cancer staging', 'Deep neck abscess / infection', 'Cervical lymphadenopathy', 'Thyroid mass'],
    standardFlowRate: 2.5,
    minGaugeRecommended: '20G',
    salineVolume: 30,
    salineFlowRate: 2.5,
    phases: [
      {
        name: 'Venous / Soft Tissue Phase',
        delaySeconds: 65,
        timingMethod: 'Fixed Delay',
        description: '60-70 seconds post-injection delay or split-bolus.'
      }
    ],
    clinicalCaveats: [
      'Instruct patient strictly: "Do not swallow and breathe quietly during scanning".',
      'Remove dentures or dental metal protheses if removable to reduce streak artifact.'
    ],
    targetIodineDosePerKg: 525
  },

  // --- CHEST ---
  {
    id: 'ct-chest-routine',
    modality: 'CT',
    bodyPartId: 'chest',
    bodyPartName: 'Chest / Thorax',
    name: 'CT Chest with Contrast (Routine)',
    category: 'Thoracic',
    description: 'Standard diagnostic chest CT for lung nodule, mediastinal adenopathy, or pleural disease.',
    clinicalIndications: ['Lung cancer workup', 'Mediastinal mass', 'Empyema / Pleural effusion', 'Lymphoma'],
    standardFlowRate: 2.5,
    minGaugeRecommended: '22G',
    salineVolume: 30,
    salineFlowRate: 2.5,
    phases: [
      {
        name: 'Systemic Venous / Thoracic Phase',
        delaySeconds: 35,
        timingMethod: 'Fixed Delay',
        description: '30-40 seconds delay to opacify both pulmonary and systemic thoracic vessels and mediastinal nodes.'
      }
    ],
    clinicalCaveats: [
      'Instruct patient to inspire gently and hold breath; avoid excessive Valsalva which transiently reduces SVC contrast delivery.'
    ],
    targetIodineDosePerKg: 500
  },
  {
    id: 'ct-chest-ctpa',
    modality: 'CT',
    bodyPartId: 'chest',
    bodyPartName: 'Chest / Thorax',
    name: 'CT Pulmonary Angiography (CTPA / PE Protocol)',
    category: 'Thoracic / Vascular',
    description: 'High-speed pulmonary arterial phase protocol for acute pulmonary embolism detection.',
    clinicalIndications: ['Suspected acute pulmonary embolism (PE)', 'DVT with acute dyspnea', 'Right heart strain'],
    standardFlowRate: 4.5,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 4.5,
    phases: [
      {
        name: 'Pulmonary Arterial Phase',
        timingMethod: 'Bolus Tracking',
        triggerHU: 120,
        roiLocation: 'Main Pulmonary Artery Trunk',
        description: 'ROI positioned in main pulmonary artery trunk, trigger threshold 100-130 HU. Prep delay 3-4s.'
      }
    ],
    clinicalCaveats: [
      'CRITICAL: Transient interruption of contrast (TIC) occurs with deep forced inspiration (negative intrathoracic pressure sucks unopacified IVC blood into right atrium). Instruct: "Stop breathing gently, do not take a giant deep gasp".',
      'Prefer 18G or 20G in right antecubital vein to prevent brachiocephalic vein reflux.'
    ],
    targetIodineDosePerKg: 450
  },

  // --- CARDIOVASCULAR & AORTA ---
  {
    id: 'ct-aorta-dissection',
    modality: 'CT',
    bodyPartId: 'cardiovascular',
    bodyPartName: 'Cardiovascular / Aorta',
    name: 'CTA Whole Aorta (Dissection / TAVR / Aneurysm)',
    category: 'Cardiovascular',
    description: 'From thoracic inlet through femoral heads to evaluate Stanford Type A/B dissection, endoleaks, or TAVR access.',
    clinicalIndications: ['Acute aortic dissection', 'Thoracoabdominal aortic aneurysm (TAAA)', 'TAVR workup', 'Traumatic aortic transection'],
    standardFlowRate: 4.5,
    minGaugeRecommended: '18G',
    salineVolume: 50,
    salineFlowRate: 4.5,
    phases: [
      {
        name: 'Arterial Phase',
        timingMethod: 'Bolus Tracking',
        triggerHU: 150,
        roiLocation: 'Ascending Aorta or Carina level',
        description: 'Trigger at 150 HU with 4s delay. Craniocaudal scan from thoracic inlet to groin.'
      },
      {
        name: 'Delayed Phase (Dissection / Endoleak)',
        delaySeconds: 90,
        timingMethod: 'Fixed Delay',
        description: 'Optional delayed scan of abdomen/pelvis at 90s to confirm false lumen thrombosis or endoleak.'
      }
    ],
    clinicalCaveats: [
      'ECG-gating recommended for ascending aorta evaluation if scanner allows.',
      'High volume (90-110 mL) and 4.0-5.0 mL/s rate required for full length aortic opacification.'
    ],
    targetIodineDosePerKg: 550
  },
  {
    id: 'ct-coronary-cta',
    modality: 'CT',
    bodyPartId: 'cardiovascular',
    bodyPartName: 'Cardiovascular / Aorta',
    name: 'Coronary CTA (Cardiac CT with Heart Rate Control)',
    category: 'Cardiovascular',
    description: 'ECG-synchronized coronary artery assessment for stenosis and plaque characterization.',
    clinicalIndications: ['Atypical chest pain', 'Rule out CAD', 'Bypass graft patency', 'Anomalous coronary arteries'],
    standardFlowRate: 5.0,
    minGaugeRecommended: '18G',
    salineVolume: 50,
    salineFlowRate: 5.0,
    phases: [
      {
        name: 'Coronary Arterial Phase',
        timingMethod: 'Bolus Tracking',
        triggerHU: 180,
        roiLocation: 'Ascending Aorta (mid-lumen)',
        description: 'ROI mid ascending aorta, trigger at 180 HU. Scan with prospective or retrospective ECG gating.'
      }
    ],
    clinicalCaveats: [
      'Target heart rate < 65 bpm with beta-blockers if needed.',
      'Sublingual nitroglycerin given 3-5 min prior unless contraindicated.',
      'Dual-head injector required with saline flush to clear right heart density.'
    ],
    targetIodineDosePerKg: 500
  },

  // --- ABDOMEN & PELVIS ---
  {
    id: 'ct-abdomen-portal-venous',
    modality: 'CT',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen & Pelvis',
    name: 'CT Abdomen & Pelvis (Portal Venous Phase)',
    category: 'Abdominal',
    description: 'Standard workhorse abdominal CT for oncology staging, acute abdominal pain, diverticulitis, appendicitis.',
    clinicalIndications: ['Acute abdominal pain', 'Appendicitis', 'Diverticulitis', 'Bowel obstruction', 'Oncology restaging'],
    standardFlowRate: 2.5,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 2.5,
    phases: [
      {
        name: 'Portal Venous Phase',
        delaySeconds: 70,
        timingMethod: 'Fixed Delay',
        description: '65-75 seconds from start of injection. Maximizes liver parenchyma-to-hypovascular metastasis contrast.'
      }
    ],
    clinicalCaveats: [
      'Weight-tailored iodine dosing is especially valuable to maintain parenchymal enhancement >50 HU.',
      'Oral contrast may be indicated if un-opacified bowel loops mimic pelvic abscess.'
    ],
    targetIodineDosePerKg: 525
  },
  {
    id: 'ct-liver-triphasic',
    modality: 'CT',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen & Pelvis',
    name: 'CT Liver Multiphase (HCC / Cirrhosis Protocol)',
    category: 'Abdominal / Hepatic',
    description: 'Triphasic hepatic imaging for hepatocellular carcinoma (HCC) arterial hyperenhancement and washout.',
    clinicalIndications: ['Cirrhosis screening', 'HCC surveillance (LI-RADS)', 'Hypervascular metastases (neuroendocrine/RCC)'],
    standardFlowRate: 4.0,
    minGaugeRecommended: '18G',
    salineVolume: 40,
    salineFlowRate: 4.0,
    phases: [
      {
        name: 'Late Hepatic Arterial Phase',
        timingMethod: 'Bolus Tracking',
        triggerHU: 150,
        roiLocation: 'Abdominal Aorta at Celiac Axis',
        description: 'Trigger at 150 HU + 15-18s delay (scan around 35-40s from start).'
      },
      {
        name: 'Portal Venous Phase',
        delaySeconds: 70,
        timingMethod: 'Fixed Delay',
        description: '65-75s from start of injection.'
      },
      {
        name: 'Delayed Equilibrium Phase',
        delaySeconds: 180,
        timingMethod: 'Fixed Delay',
        description: '3 minutes (180s) to assess LI-RADS capsule and washout.'
      }
    ],
    clinicalCaveats: [
      'Arterial phase MUST be late arterial (portal vein opacified, hepatic veins not yet). Early arterial misses HCC hyperenhancement!',
      'Minimum 4.0 mL/s flow rate is critical.'
    ],
    targetIodineDosePerKg: 550
  },
  {
    id: 'ct-pancreas-protocol',
    modality: 'CT',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen & Pelvis',
    name: 'CT Pancreas Protocol (Adenocarcinoma / Mass)',
    category: 'Abdominal / Pancreatic',
    description: 'Biphasic pancreatic imaging optimized for pancreatic parenchymal enhancement and vascular encasement.',
    clinicalIndications: ['Pancreatic adenocarcinoma', 'Painless jaundice', 'IPMN', 'Pancreatic neuroendocrine tumor'],
    standardFlowRate: 4.0,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 4.0,
    phases: [
      {
        name: 'Pancreatic Parenchymal Phase',
        delaySeconds: 45,
        timingMethod: 'Fixed Delay',
        description: '40-45 seconds delay. Peak parenchymal enhancement differentiates hypo-enhancing adenocarcinoma.'
      },
      {
        name: 'Portal Venous Phase',
        delaySeconds: 70,
        timingMethod: 'Fixed Delay',
        description: '70 seconds delay for mesenteric/portal venous invasion and liver metastasis assessment.'
      }
    ],
    clinicalCaveats: [
      'Give 500-750 mL neutral oral contrast (water) 15-20 min prior to distend stomach and duodenum.'
    ],
    targetIodineDosePerKg: 550
  },
  {
    id: 'ct-renal-hematuria',
    modality: 'CT',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen & Pelvis',
    name: 'CT Urography / Renal Mass Protocol (4-Phase)',
    category: 'Abdominal / Renal',
    description: 'Comprehensive evaluation of renal parenchyma, urothelium, and collecting system for hematuria.',
    clinicalIndications: ['Macroscopic hematuria', 'Renal cell carcinoma (RCC)', 'Transitional cell carcinoma (TCC)', 'Renal cyst Bosniak staging'],
    standardFlowRate: 3.0,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 3.0,
    phases: [
      {
        name: 'Corticomedullary Phase',
        delaySeconds: 35,
        timingMethod: 'Fixed Delay',
        description: '35-40s delay. Optimal for renal cortical vascularity and RCC detection.'
      },
      {
        name: 'Nephrographic Phase',
        delaySeconds: 95,
        timingMethod: 'Fixed Delay',
        description: '90-100s delay. Homogeneous enhancement of medulla; best for renal medullary lesions and Bosniak cyst wall enhancement.'
      },
      {
        name: 'Excretory / Pyelographic Phase',
        delaySeconds: 480,
        timingMethod: 'Fixed Delay',
        description: '8-10 minutes delay to opacify calyces, renal pelvis, ureters, and bladder.'
      }
    ],
    clinicalCaveats: [
      'Consider IV saline hydration (250-500 mL) or 5-10 mg IV furosemide (if kidneys healthy) to distend ureters.',
      'Split-bolus technique can combine nephrographic + excretory into a single scan to spare radiation dose.'
    ],
    targetIodineDosePerKg: 525
  },
  {
    id: 'ct-enterography',
    modality: 'CT',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen & Pelvis',
    name: 'CT Enterography (CTE - Crohn\'s / Small Bowel)',
    category: 'Abdominal / GI',
    description: 'Optimized for small bowel wall thickening, hyperemia, ulcers, and fistula detection.',
    clinicalIndications: ['Crohn\'s disease activity & complications', 'Small bowel bleeding', 'Suspected carcinoid/lymphoma'],
    standardFlowRate: 3.5,
    minGaugeRecommended: '20G',
    salineVolume: 40,
    salineFlowRate: 3.5,
    phases: [
      {
        name: 'Enteric Phase',
        delaySeconds: 50,
        timingMethod: 'Fixed Delay',
        description: '50-55 seconds delay. Shows mucosal hyperenhancement and mural stratification before venous washout.'
      }
    ],
    clinicalCaveats: [
      'Patient must drink 1000-1500 mL low-density neutral oral agent (VoLumen or polyethylene glycol) over 45-60 min before scan.',
      'IV antispasmodic (e.g. hyoscine butylbromide or glucagon) can reduce bowel peristalsis artifact.'
    ],
    targetIodineDosePerKg: 525
  },

  // --- EXTREMITIES ---
  {
    id: 'ct-extremity-runoff',
    modality: 'CT',
    bodyPartId: 'extremities',
    bodyPartName: 'Extremities / Peripheral',
    name: 'CTA Lower Extremity Runoff (Aorto-Iliac to Feet)',
    category: 'Vascular / Extremities',
    description: 'Peripheral arterial occlusive disease (PAD), critical limb ischemia, bypass graft assessment.',
    clinicalIndications: ['Peripheral arterial disease (PAD)', 'Claudication', 'Critical limb ischemia', 'Arterial trauma'],
    standardFlowRate: 4.0,
    minGaugeRecommended: '20G',
    salineVolume: 50,
    salineFlowRate: 4.0,
    phases: [
      {
        name: 'Peripheral Arterial Phase',
        timingMethod: 'Bolus Tracking',
        triggerHU: 150,
        roiLocation: 'Abdominal Aorta at L3 level (infrarenal)',
        description: 'Trigger at 150 HU with 6-8s prep delay. Table travel speed adjusted to match distal arterial bolus wavefront.'
      }
    ],
    clinicalCaveats: [
      'In severe PAD with slow flow, scan speed must be slowed to avoid out-running the contrast bolus in the tibiopedal vessels.',
      'Keep patient warm to avoid peripheral vasoconstriction.'
    ],
    targetIodineDosePerKg: 550
  },

  // --- PEDIATRIC CT ---
  {
    id: 'ct-pediatric-routine',
    modality: 'CT',
    bodyPartId: 'pediatric',
    bodyPartName: 'Pediatric Protocols',
    name: 'Pediatric Contrast-Enhanced CT (Body / Chest / Abdomen)',
    category: 'Pediatric',
    description: 'Strict weight-based pediatric protocol (1.5 - 2.0 mL/kg) with reduced kVp and radiation protection.',
    clinicalIndications: ['Pediatric abdominal pain', 'Pediatric lymphoma / tumor staging', 'Pediatric trauma'],
    standardFlowRate: 1.5,
    minGaugeRecommended: '24G',
    salineVolume: 15,
    salineFlowRate: 1.5,
    phases: [
      {
        name: 'Pediatric Systemic Phase',
        delaySeconds: 55,
        timingMethod: 'Fixed Delay',
        description: '50-60 seconds post-injection. Tailored for pediatric circulation velocity.'
      }
    ],
    clinicalCaveats: [
      'Dosing strictly: 1.5 - 2.0 mL/kg (max adult dose clamp).',
      'Use 70 or 80 kVp for infants and toddlers; 100 kVp for older children to exploit higher iodine attenuation.',
      'Check IV line patency carefully; pediatric veins extravasate easily.'
    ],
    targetIodineDosePerKg: 500
  },

  // ==========================================
  // MRI PROTOCOLS
  // ==========================================
  // --- BRAIN & NEURO ---
  {
    id: 'mri-brain-routine',
    modality: 'MRI',
    bodyPartId: 'brain',
    bodyPartName: 'Brain / Neuro',
    name: 'MRI Brain with Contrast (Routine Post-Gad)',
    category: 'Neuro / MRI',
    description: 'Standard post-contrast brain MRI for intra-axial mass, infection, white matter disease, meningeal enhancement.',
    clinicalIndications: ['Brain metastasis', 'Glioma follow-up', 'Multiple Sclerosis (active plaque)', 'Meningitis'],
    standardFlowRate: 1.5,
    minGaugeRecommended: '22G',
    salineVolume: 20,
    salineFlowRate: 1.5,
    phases: [
      {
        name: 'Delayed Post-Contrast T1 (Axial / Coronal / 3D Space)',
        delaySeconds: 300,
        timingMethod: 'Delayed',
        description: 'Optimal lesion conspicuity and leptomeningeal enhancement is achieved 4-6 minutes after injection.'
      }
    ],
    clinicalCaveats: [
      'Do not scan immediately; 3-5 minute delay significantly increases detection of small cortical metastases.',
      'Standard dose: 0.1 mmol/kg body weight.'
    ],
    targetGadDosePerKg: 0.1
  },
  {
    id: 'mri-brain-tumor-perfusion',
    modality: 'MRI',
    bodyPartId: 'brain',
    bodyPartName: 'Brain / Neuro',
    name: 'MRI Brain Tumor Perfusion (DSC-MRI / DCE-MRI)',
    category: 'Neuro / MRI',
    description: 'Dynamic susceptibility contrast (DSC) or DCE perfusion for rCBV calculation and high-grade glioma grading.',
    clinicalIndications: ['High-grade glioma', 'Radiation necrosis vs tumor recurrence', 'Post-bevacizumab assessment'],
    standardFlowRate: 3.5,
    minGaugeRecommended: '20G',
    salineVolume: 25,
    salineFlowRate: 3.5,
    phases: [
      {
        name: 'Preload Bolus (Optional)',
        delaySeconds: 0,
        timingMethod: 'Immediate',
        description: 'Low-dose preload bolus (0.025 mmol/kg) to saturate T1 leakage effects.'
      },
      {
        name: 'Dynamic Susceptibility Contrast (DSC) Run',
        timingMethod: 'Dynamic DCE',
        description: 'T2* EPI baseline 10s, then rapid bolus 3.5-4.0 mL/s with immediate 25 mL saline flush.'
      },
      {
        name: 'High-Resolution 3D T1 Post-Contrast',
        delaySeconds: 300,
        timingMethod: 'Delayed',
        description: '3D T1 MPRAGE/BRAVO acquired 5 min post-injection.'
      }
    ],
    clinicalCaveats: [
      'High injection rate (3.0-4.0 mL/s) is mandatory for compact bolus profile in DSC-MRI.',
      'Ensure 18G or 20G IV line in antecubital fossa.'
    ],
    targetGadDosePerKg: 0.1
  },
  {
    id: 'mri-pituitary-dynamic',
    modality: 'MRI',
    bodyPartId: 'brain',
    bodyPartName: 'Brain / Neuro',
    name: 'MRI Pituitary Dynamic Microadenoma',
    category: 'Neuro / MRI',
    description: 'Rapid coronal dynamic T1 imaging through the sella turcica to capture hypo-enhancing microadenomas.',
    clinicalIndications: ['Cushing disease (ACTH)', 'Prolactinoma', 'Acromegaly (GH)', 'Non-functioning microadenoma'],
    standardFlowRate: 2.0,
    minGaugeRecommended: '22G',
    salineVolume: 20,
    salineFlowRate: 2.0,
    phases: [
      {
        name: 'Coronal Dynamic T1 Sequence',
        delaySeconds: 0,
        timingMethod: 'Dynamic DCE',
        description: 'Continuous serial coronal T1 frames every 10-15s for 60-90 seconds. Normal pituitary tuft enhances early; microadenoma lags behind.'
      },
      {
        name: 'Delayed Coronal & Sagittal T1',
        delaySeconds: 120,
        timingMethod: 'Delayed',
        description: 'Detailed high-resolution thin slice (2 mm) post-contrast views.'
      }
    ],
    clinicalCaveats: [
      'Half-dose (0.05 mmol/kg) may be requested by some institutions to prevent excessive glandular blooming.'
    ],
    targetGadDosePerKg: 0.1
  },

  // --- SPINE ---
  {
    id: 'mri-spine-postop',
    modality: 'MRI',
    bodyPartId: 'spine',
    bodyPartName: 'Spine (Cervical / Lumbar)',
    name: 'MRI Spine with Contrast (Post-Op / Infection / Tumor)',
    category: 'Spine / MSK',
    description: 'Differentiating epidural fibrosis (scar tissue) from recurrent disc herniation; spinal cord tumor or epidural abscess.',
    clinicalIndications: ['Failed back surgery syndrome', 'Epidural abscess / Spondylodiscitis', 'Spinal ependymoma / Schwannoma'],
    standardFlowRate: 1.5,
    minGaugeRecommended: '22G',
    salineVolume: 20,
    salineFlowRate: 1.5,
    phases: [
      {
        name: 'Immediate Post-Contrast T1 & Fat-Sat',
        delaySeconds: 60,
        timingMethod: 'Immediate',
        description: 'Start scanning promptly (scar tissue enhances immediately; recurrent disc herniation only shows peripheral rim on delayed frames).'
      }
    ],
    clinicalCaveats: [
      'Scan immediately without prolonged waiting to avoid delayed contrast diffusion into avascular disc material.'
    ],
    targetGadDosePerKg: 0.1
  },

  // --- ABDOMEN & LIVER ---
  {
    id: 'mri-liver-routine',
    modality: 'MRI',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen / Liver',
    name: 'MRI Liver Dynamic (Extracellular GBCA)',
    category: 'Abdominal / MRI',
    description: 'Dynamic multiphase liver MRI using standard extracellular agent (Dotarem, Gadavist, ProHance).',
    clinicalIndications: ['Hepatic hemangioma', 'Focal Nodular Hyperplasia (FNH)', 'Liver metastases', 'Hepatic adenoma'],
    standardFlowRate: 2.0,
    minGaugeRecommended: '20G',
    salineVolume: 30,
    salineFlowRate: 2.0,
    phases: [
      {
        name: 'Late Arterial Phase',
        delaySeconds: 22,
        timingMethod: 'Fixed Delay',
        description: '20-25 seconds delay with MR fluoroscopic trigger or CareBolus.'
      },
      {
        name: 'Portal Venous Phase',
        delaySeconds: 65,
        timingMethod: 'Fixed Delay',
        description: '60-70 seconds delay.'
      },
      {
        name: 'Transitional / Equilibrium Phase',
        delaySeconds: 180,
        timingMethod: 'Fixed Delay',
        description: '3 minutes (180s) delay.'
      }
    ],
    clinicalCaveats: [
      'Breath-hold coaching prior to contrast injection is essential for artifact-free 3D T1 gradient echo.'
    ],
    targetGadDosePerKg: 0.1
  },
  {
    id: 'mri-liver-eovist',
    modality: 'MRI',
    bodyPartId: 'abdomen',
    bodyPartName: 'Abdomen / Liver',
    name: 'MRI Liver Hepatobiliary (Eovist / Primovist Protocol)',
    category: 'Abdominal / Hepatic',
    description: 'Hepatocyte-specific agent with 50% biliary excretion. Crucial for HCC LI-RADS and FNH vs Adenoma.',
    clinicalIndications: ['HCC surveillance in cirrhosis', 'FNH vs Hepatic Adenoma', 'Colorectal liver metastases resection planning'],
    standardFlowRate: 1.0,
    minGaugeRecommended: '20G',
    salineVolume: 30,
    salineFlowRate: 1.0,
    phases: [
      {
        name: 'Arterial Phase',
        delaySeconds: 18,
        timingMethod: 'Bolus Tracking',
        roiLocation: 'Celiac Axis / Abdominal Aorta',
        description: 'Fluoroscopic trigger. Note: Transient severe dyspnea may occur in 10-15% of patients with rapid Eovist bolus.'
      },
      {
        name: 'Portal Venous Phase',
        delaySeconds: 60,
        timingMethod: 'Fixed Delay',
        description: '60 seconds delay.'
      },
      {
        name: 'Transitional Phase',
        delaySeconds: 180,
        timingMethod: 'Fixed Delay',
        description: '3 minutes (180s) delay.'
      },
      {
        name: 'Hepatobiliary Phase (HBP)',
        delaySeconds: 1200,
        timingMethod: 'Delayed',
        description: '20 minutes delay. Normal functioning hepatocytes take up Eovist; HCC/metastases appear dark (defective OATP transporters).'
      }
    ],
    clinicalCaveats: [
      'Standard dose is strictly 0.025 mmol/kg (which equals 0.1 mL/kg of the 0.25 M formulation).',
      'Inject at moderate rate (1.0-1.5 mL/s) or dilute with saline to prevent transient tachypnea/dyspnea motion artifacts during arterial phase.'
    ],
    targetGadDosePerKg: 0.025
  },

  // --- PELVIS ---
  {
    id: 'mri-prostate-mpmri',
    modality: 'MRI',
    bodyPartId: 'pelvis',
    bodyPartName: 'Pelvis / Genitourinary',
    name: 'Multiparametric MRI Prostate (mpMRI PI-RADS v2.1)',
    category: 'Pelvic / GU',
    description: 'High-temporal resolution Dynamic Contrast Enhanced (DCE) MRI for prostate cancer localization.',
    clinicalIndications: ['Elevated PSA', 'Prostate cancer staging', 'Targeted biopsy guidance', 'Active surveillance'],
    standardFlowRate: 2.5,
    minGaugeRecommended: '20G',
    salineVolume: 25,
    salineFlowRate: 2.5,
    phases: [
      {
        name: 'DCE-MRI Dynamic Acquisition',
        delaySeconds: 0,
        timingMethod: 'Dynamic DCE',
        description: 'Temporal resolution <= 10 seconds per volume, continuous scanning for >= 2 minutes. Focal early focal enhancement indicates PI-RADS focal malignancy.'
      }
    ],
    clinicalCaveats: [
      'Temporal resolution must be under 10 seconds (preferably <= 7 seconds) per dynamic volume.',
      'Pre-scan enema or bowel preparation recommended to reduce rectal gas susceptibility.'
    ],
    targetGadDosePerKg: 0.1
  },
  {
    id: 'mri-breast-dce',
    modality: 'MRI',
    bodyPartId: 'breast',
    bodyPartName: 'Breast',
    name: 'MRI Breast Dynamic Contrast Enhanced (BI-RADS)',
    category: 'Women\'s Imaging',
    description: 'Bilateral fat-suppressed 3D T1 acquisitions before and at serial intervals up to 6-8 minutes post-contrast.',
    clinicalIndications: ['High risk screening (BRCA)', 'Extent of disease in newly diagnosed breast cancer', 'Neoadjuvant response', 'Occult primary'],
    standardFlowRate: 2.0,
    minGaugeRecommended: '20G',
    salineVolume: 25,
    salineFlowRate: 2.0,
    phases: [
      {
        name: 'Pre-Contrast 3D T1 Mask',
        delaySeconds: 0,
        timingMethod: 'Immediate',
        description: 'Baseline unenhanced 3D T1 with fat saturation for subtraction.'
      },
      {
        name: 'Dynamic Serial Phases (1 to 5)',
        delaySeconds: 60,
        timingMethod: 'Dynamic DCE',
        description: '60s per sequence for 5-7 minutes. Generates kinetic curves: Type 1 (persistent), Type 2 (plateau), Type 3 (washout/malignant).'
      }
    ],
    clinicalCaveats: [
      'Optimal timing: Day 7-14 of menstrual cycle in premenopausal women to reduce background parenchymal enhancement (BPE).'
    ],
    targetGadDosePerKg: 0.1
  },

  // --- CARDIAC MRI ---
  {
    id: 'mri-cardiac-viability',
    modality: 'MRI',
    bodyPartId: 'cardiac',
    bodyPartName: 'Cardiac',
    name: 'Cardiac MRI Viability / Late Gadolinium Enhancement (LGE)',
    category: 'Cardiac MRI',
    description: 'Myocardial infarct transmurality, scar detection, and non-ischemic cardiomyopathy characterization.',
    clinicalIndications: ['Post-MI viability assessment', 'Hypertrophic cardiomyopathy (HCM)', 'Myocarditis / Sarcoidosis', 'Amyloidosis'],
    standardFlowRate: 2.0,
    minGaugeRecommended: '20G',
    salineVolume: 30,
    salineFlowRate: 2.0,
    phases: [
      {
        name: 'Late Gadolinium Enhancement (LGE / PSIR)',
        delaySeconds: 600,
        timingMethod: 'Delayed',
        description: '10-15 minutes delay. Inversion time (TI) scout performed to null normal myocardium.'
      }
    ],
    clinicalCaveats: [
      'Dose often given at 0.15 - 0.20 mmol/kg (or 0.1 mmol/kg with high-relaxivity agent like Gadobutrol).',
      'Accurate TI (nulling time, typically 250-320 ms) must be set via TI scout sequence.'
    ],
    targetGadDosePerKg: 0.15
  },

  // --- VASCULAR MRA ---
  {
    id: 'mri-carotid-mra',
    modality: 'MRI',
    bodyPartId: 'vascular',
    bodyPartName: 'Vascular / MRA',
    name: 'MR Angiography (MRA) Carotid & Vertebral Arteries',
    category: 'Vascular MRA',
    description: 'High-resolution contrast-enhanced 3D MRA from aortic arch through Circle of Willis.',
    clinicalIndications: ['Carotid artery stenosis', 'Carotid dissection', 'Pulsatile tinnitus', 'Subclavian steal syndrome'],
    standardFlowRate: 2.5,
    minGaugeRecommended: '20G',
    salineVolume: 30,
    salineFlowRate: 2.5,
    phases: [
      {
        name: 'Arterial 3D Volume',
        timingMethod: 'Bolus Tracking',
        triggerHU: 0,
        roiLocation: 'Aortic Arch (CareBolus or test bolus)',
        description: 'Fluoroscopic real-time visual tracking in arch. Trigger scan precisely when contrast reaches proximal common carotid arteries.'
      }
    ],
    clinicalCaveats: [
      'Timing must be precise to avoid jugular venous overlay.',
      'Centric k-space ordering recommended.'
    ],
    targetGadDosePerKg: 0.1
  },

  // --- PEDIATRIC MRI ---
  {
    id: 'mri-pediatric-routine',
    modality: 'MRI',
    bodyPartId: 'pediatric',
    bodyPartName: 'Pediatric Protocols',
    name: 'Pediatric Contrast MRI (Brain / Body)',
    category: 'Pediatric MRI',
    description: 'Strict weight-based 0.1 mmol/kg protocol using ACR Group II macrocyclic agent.',
    clinicalIndications: ['Pediatric brain tumor', 'Neurofibromatosis', 'Pediatric infection', 'Congenital malformation'],
    standardFlowRate: 1.0,
    minGaugeRecommended: '24G',
    salineVolume: 10,
    salineFlowRate: 1.0,
    phases: [
      {
        name: 'Pediatric Post-Contrast T1',
        delaySeconds: 180,
        timingMethod: 'Delayed',
        description: '3 minutes delay.'
      }
    ],
    clinicalCaveats: [
      'Always prefer ACR Group II macrocyclic agents (Gadobutrol, Gadoterate, Gadoteridol) for pediatrics.',
      'Use dead-space volume calculation for low-weight infants (weight < 5 kg).'
    ],
    targetGadDosePerKg: 0.1
  }
];
