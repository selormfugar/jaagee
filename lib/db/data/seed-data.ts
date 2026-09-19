// ===============================================================================
// JaaGee Scientific - Clean Seed Data Package
// Source: C:\xampp\htdocs\jaagee-source\jaagee-content
// ===============================================================================

export interface BrandSeed {
  id: string
  slug: string
  name: string
  country: string
  description: string
  website_url: string
  parent_brand?: string
}

export interface CategorySeed {
  id: string
  slug: string
  name: string
  description: string
}

export interface IndustrySeed {
  id: string
  slug: string
  name: string
  description: string
  icon_name: string
}

export interface ProductSeed {
  id: string
  slug: string
  name: string
  brand_slug: string
  category_slug: string
  industry_slugs: string[]
  short_description: string
  full_description: string
  specifications: Array<{ label: string; value: string }>
  features: string[]
  applications: string[]
  status: 'draft' | 'published' | 'archived' | 'discontinued'
  verification_status: 'unverified' | 'verified'
  is_featured: boolean
  replacement_product_slug?: string
  image_url?: string
}

export interface ServiceSeed {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  icon_name: string
}

// 1. BRANDS SEED DATA
export const SEED_BRANDS: BrandSeed[] = [
  {
    id: 'b-opsis',
    slug: 'opsis',
    name: 'OPSIS',
    country: 'Sweden',
    description: 'OPSIS and OPSIS LiquidLINE provide world-leading systems for Kjeldahl protein analysis, fat extraction, steam distillation and wet chemistry sample preparation.',
    website_url: 'https://www.opsis.se'
  },
  {
    id: 'b-liquidline',
    slug: 'liquidline',
    name: 'OPSIS LiquidLINE',
    country: 'Sweden',
    description: 'OPSIS LiquidLINE is the analytical wet chemistry division of OPSIS, specialising in Kjeldahl, Soxhlet and hydrolysis instrumentation.',
    website_url: 'https://www.liquidline.se',
    parent_brand: 'opsis'
  },
  {
    id: 'b-ankom',
    slug: 'ankom',
    name: 'ANKOM Technology',
    country: 'USA',
    description: 'ANKOM Technology is the pioneer of Filter Bag Technology for dietary fiber, crude fiber, total fat extraction, and in vitro gas production analysis.',
    website_url: 'https://www.ankom.com'
  },
  {
    id: 'b-chopin',
    slug: 'chopin',
    name: 'CHOPIN Technologies',
    country: 'France',
    description: 'CHOPIN Technologies (KPM Analytics) manufactures standard-setting instruments for wheat, flour and dough quality analysis, including the Alveograph and Mixolab.',
    website_url: 'https://www.kpmanalytics.com'
  },
  {
    id: 'b-perten',
    slug: 'perten',
    name: 'PERTEN Instruments',
    country: 'Sweden',
    description: 'PERTEN Instruments (PerkinElmer) is a world leader in NIR grain analyzers, Falling Number sprout damage testing, and rheology instruments.',
    website_url: 'https://www.perkinelmer.com'
  },
  {
    id: 'b-neogen',
    slug: 'neogen',
    name: 'NEOGEN Corporation',
    country: 'USA',
    description: 'NEOGEN Corporation develops rapid food safety diagnostic solutions for mycotoxins, food allergens, pathogen detection, and hygiene monitoring.',
    website_url: 'https://www.neogen.com'
  },
  {
    id: 'b-dds',
    slug: 'dds',
    name: 'DDS Calorimeters',
    country: 'South Africa',
    description: 'DDS Calorimeters designs and manufactures high-precision digital oxygen bomb calorimeter systems for industrial calorific value determination.',
    website_url: 'https://www.ddscalorimeters.com'
  }
]

// 2. CATEGORIES SEED DATA
export const SEED_CATEGORIES: CategorySeed[] = [
  {
    id: 'c-sample-prep',
    slug: 'sample-preparation',
    name: 'Sample Preparation & Digestion',
    description: 'Digestion blocks, acid hydrolysis, scrubbers, and grinding mills for analytical sample prep.'
  },
  {
    id: 'c-protein-kjeldahl',
    slug: 'protein-nitrogen-kjeldahl',
    name: 'Protein & Nitrogen Analysis (Kjeldahl)',
    description: 'Automatic distillation units, analyzers, and autosamplers for Nitrogen/Protein determination.'
  },
  {
    id: 'c-fat-extraction',
    slug: 'fat-extraction',
    name: 'Fat & Solvent Extraction',
    description: 'Automated Soxhlet extractors and solvent recovery systems for total and crude fat.'
  },
  {
    id: 'c-fiber-analysis',
    slug: 'fiber-analysis',
    name: 'Fiber & Digestibility Analysis',
    description: 'Crude fiber, ADF, NDF, total dietary fiber (TDF), and in vitro incubators.'
  },
  {
    id: 'c-nir-spectroscopy',
    slug: 'nir-spectroscopy',
    name: 'Near-Infrared (NIR) Spectroscopy',
    description: 'Diode array NIR analyzers for rapid multi-parameter grain, feed, and food testing.'
  },
  {
    id: 'c-rheology-dough',
    slug: 'rheology-dough-testing',
    name: 'Rheology & Flour Testing',
    description: 'Instruments for dough tenacity, extensibility, starch damage, and mixing behavior.'
  },
  {
    id: 'c-food-safety',
    slug: 'food-safety-diagnostics',
    name: 'Food Safety & Mycotoxin Diagnostics',
    description: 'Lateral flow readers and rapid quantitative test strips for mycotoxins and allergens.'
  },
  {
    id: 'c-calorimetry',
    slug: 'bomb-calorimetry',
    name: 'Oxygen Bomb Calorimetry',
    description: 'Isoperibol and dry bomb calorimeters for gross calorific value measurement.'
  }
]

// 3. INDUSTRIES SEED DATA
export const SEED_INDUSTRIES: IndustrySeed[] = [
  {
    id: 'i-agri-feed',
    slug: 'agricultural-feed',
    name: 'Agricultural & Feed',
    description: 'Forage testing, animal feed formulation, crude fiber, protein, and digestibility analysis.',
    icon_name: 'Wheat'
  },
  {
    id: 'i-grain-milling',
    slug: 'grain-flour-milling',
    name: 'Grain & Flour Milling',
    description: 'Wheat grading, moisture, protein, gluten quality, sprout damage, and dough performance.',
    icon_name: 'Factory'
  },
  {
    id: 'i-food-processing',
    slug: 'food-processing',
    name: 'Food Processing & Safety',
    description: 'Proximate analysis, mycotoxin testing, allergen detection, and quality control.',
    icon_name: 'Utensils'
  },
  {
    id: 'i-dairy',
    slug: 'dairy-milk',
    name: 'Dairy & Milk Processing',
    description: 'FTIR milk analysis, fat, protein, lactose, total solids, and somatic cell count.',
    icon_name: 'Milk'
  },
  {
    id: 'i-beverages',
    slug: 'beverages',
    name: 'Beverages & Brewing',
    description: 'Raw material testing, wort analysis, moisture, and alcohol process control.',
    icon_name: 'GlassWater'
  },
  {
    id: 'i-environmental',
    slug: 'environmental-soil',
    name: 'Environmental & Soil',
    description: 'Anaerobic gas production, soil nitrogen, water testing, and biomass energy.',
    icon_name: 'Leaf'
  },
  {
    id: 'i-industrial-energy',
    slug: 'industrial-energy',
    name: 'Industrial & Energy',
    description: 'Calorific testing of coal, biomass, waste fuel, and petroleum products.',
    icon_name: 'Flame'
  }
]

// 4. SERVICES SEED DATA
export const SEED_SERVICES: ServiceSeed[] = [
  {
    id: 's-supply-install',
    slug: 'equipment-supply-installation',
    title: 'Equipment Supply & Installation',
    summary: 'Turnkey supply and expert commissioning of analytical laboratory instrumentation.',
    description: 'JaaGee supplies genuine analytical equipment from leading international partners (ANKOM, OPSIS, CHOPIN, PERTEN, NEOGEN, DDS). Our technical team handles site inspection, uncrating, physical installation, and initial bench commissioning to manufacturer specifications.',
    icon_name: 'Truck'
  },
  {
    id: 's-application-guidance',
    slug: 'application-guidance-method-development',
    title: 'Application Guidance & Calibration',
    summary: 'Method development, NIR calibration setup, and operator analytical training.',
    description: 'Buying an analytical instrument is only the first step. JaaGee helps laboratory staff establish standard operating protocols, NIR calibration curves for local grain and feed samples, Kjeldahl digestion profiles, and method validation to ISO standards.',
    icon_name: 'BookOpen'
  },
  {
    id: 's-technical-support',
    slug: 'technical-support-preventive-maintenance',
    title: 'Technical Support & Service',
    summary: 'Routine maintenance, emergency field repair, and genuine spare parts supply.',
    description: 'We provide technical support across Nigeria and the surrounding West African sub-region. Services include scheduled preventive maintenance, lamp replacements, burette recalibration, seal replacement, and emergency field troubleshooting.',
    icon_name: 'Wrench'
  },
  {
    id: 's-lab-furniture',
    slug: 'laboratory-furniture-design',
    title: 'Laboratory Furniture & Design',
    summary: 'Ergonomic benching, fume extraction hoods, and clean laboratory layout services.',
    description: 'Complementing our instrument line, JaaGee designs and supplies modular laboratory workbenches, chemical-resistant counter surfaces, fume extraction hoods, and storage cabinets built for heavy-duty analytical environments.',
    icon_name: 'Layout'
  }
]

// 5. PRODUCTS SEED DATA (Grounded strictly in clean recovered package)
export const SEED_PRODUCTS: ProductSeed[] = [
  // --- OPSIS / LiquidLINE ---
  {
    id: 'p-kjelroc-analyzer',
    slug: 'kjelroc-analyzer',
    name: 'KJELROC ANALYZER',
    brand_slug: 'liquidline',
    category_slug: 'protein-nitrogen-kjeldahl',
    industry_slugs: ['agricultural-feed', 'grain-flour-milling', 'food-processing', 'dairy-milk'],
    short_description: 'Fully automated Kjeldahl analyzer with predictive titration system and 50 ml automatic burette.',
    full_description: 'The KjelROC Analyzer offers full automation for nitrogen and protein determination. Features a unique predictive titration system that lowers RSD and speeds up analysis. The integrated 50 ml burette with automatic refill allows easy switching between high and low protein levels.',
    specifications: [
      { label: 'Method', value: 'Kjeldahl Distillation & Titration' },
      { label: 'Burette Volume', value: '50 ml with auto refill' },
      { label: 'Automation', value: 'Full distillation, titration, and tube emptying' },
      { label: 'Titration System', value: 'Colorimetric & predictive micro-titration' }
    ],
    features: [
      'Predictive titration system lowers RSD and shortens analysis time',
      'Automatic refill 50 ml burette for high precision',
      'Full traceability and raw data export via wireless or Ethernet',
      'Adaptive workflow reducing chemical consumption'
    ],
    applications: ['Crude protein in feed & grain', 'Total Kjeldahl Nitrogen (TKN) in soil & water', 'Protein in dairy products'],
    status: 'published',
    verification_status: 'verified',
    is_featured: true,
    image_url: '/images/products/opsis-ANALYZER.jpg'
  },
  {
    id: 'p-kjelroc-distillation-unit',
    slug: 'kjelroc-distillation-unit',
    name: 'KJELROC DISTILLATION UNIT',
    brand_slug: 'opsis',
    category_slug: 'protein-nitrogen-kjeldahl',
    industry_slugs: ['agricultural-feed', 'food-processing', 'dairy-milk'],
    short_description: 'Steam distillation unit for Kjeldahl analysis with expandable automation features.',
    full_description: 'The KjelROC Distillation Unit provides reliable steam distillation for laboratories requiring manual or external titration. Built with high-grade chemical resistance and an expandable modular architecture.',
    specifications: [
      { label: 'Steam Generator', value: 'Adjustable steam output 30-100%' },
      { label: 'Safety', value: 'Safety doors, tube sensor, and steam generator over-temperature protection' }
    ],
    features: [
      'Unique service system reducing maintenance costs',
      'Modular expandable system with low upgrade costs',
      'Automatic alkali addition and steam generator standby'
    ],
    applications: ['Kjeldahl steam distillation', 'Ammonium nitrogen in soil', 'Volatile acid distillation'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false,
    image_url: '/images/products/opsis-OpsisDistillationUnit180206-3856_s.jpg'
  },
  {
    id: 'p-kjelroc-digestor',
    slug: 'kjelroc-digestor',
    name: 'KJELROC DIGESTION BLOCKS',
    brand_slug: 'opsis',
    category_slug: 'sample-preparation',
    industry_slugs: ['agricultural-feed', 'food-processing', 'environmental-soil'],
    short_description: 'Automated block digestion system with multi-stage temperature programming.',
    full_description: 'KjelROC Digestion Blocks provide precise temperature control for acid digestions. Heavy aluminum heating blocks ensure uniform temperature distribution across all test tubes.',
    specifications: [
      { label: 'Capacity', value: '10 or 20 tube configurations (250 ml tubes)' },
      { label: 'Temperature Range', value: 'Ambient to 450 °C' }
    ],
    features: [
      'Automatic program storage with multi-step temperature ramps',
      'Extremely uniform heating across block',
      'Low maintenance costs with corrosion-proof coating'
    ],
    applications: ['Acid digestion for Kjeldahl nitrogen', 'Trace metal wet digestion'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false,
    image_url: '/images/products/opsis-DIGESTOR.jpg'
  },
  {
    id: 'p-kjelroc-scrubber',
    slug: 'kjelroc-scrubbers',
    name: 'KJELROC SCRUBBER',
    brand_slug: 'opsis',
    category_slug: 'sample-preparation',
    industry_slugs: ['agricultural-feed', 'environmental-soil'],
    short_description: 'Compact acid fume scrubber for safe neutralization during block digestion.',
    full_description: 'The KjelROC Scrubber efficiently neutralizes acid fumes produced during Kjeldahl digestion, protecting laboratory staff and bench infrastructure.',
    specifications: [
      { label: 'Neutralization', value: 'Two-step alkali wash and activated carbon filter' },
      { label: 'Footprint', value: 'Compact desktop design' }
    ],
    features: ['High neutralization capacity', 'Small laboratory footprint', 'Water-saving recirculation pump'],
    applications: ['Acid fume extraction and neutralization'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false,
    image_url: '/images/products/opsis-KjelROC-Scrubber-Free_0001-1-480x320.jpg'
  },
  {
    id: 'p-kjelroc-autosampler',
    slug: 'kjelroc-autosampler',
    name: 'KJELROC AUTOSAMPLER',
    brand_slug: 'liquidline',
    category_slug: 'protein-nitrogen-kjeldahl',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Robotic autosampler for unattended batch processing with KjelROC Analyzer.',
    full_description: 'Integrates with the KjelROC Analyzer to process large sample batches automatically, increasing lab throughput while maintaining strict analytical precision.',
    specifications: [
      { label: 'Batch Capacity', value: 'Up to 24 or 60 digestion tubes' },
      { label: 'Operation', value: 'Fully automated tube loading and unloading' }
    ],
    features: ['Unattended overnight operation', 'Reduces labor costs per sample', 'Full barcode tracking integration'],
    applications: ['High-throughput commercial testing labs'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false,
    image_url: '/images/products/opsis-OPSISLiquidLine-KjelROC-Autosampler.jpg'
  },
  {
    id: 'p-soxroc-extractor',
    slug: 'soxroc-extraction-unit',
    name: 'SOXROC EXTRACTION UNIT',
    brand_slug: 'opsis',
    category_slug: 'fat-extraction',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Automated hot solvent extraction system for rapid crude fat determination.',
    full_description: 'SoxROC Extraction Unit performs fat extraction up to 5 times faster than traditional Soxhlet methods using batch boiling, rinsing, and solvent recovery.',
    specifications: [
      { label: 'Capacity', value: '2 or 6 sample positions' },
      { label: 'Solvent Recovery', value: '>90% automated recovery' }
    ],
    features: ['Reduces extraction time by 75%', 'High solvent recovery rates', 'Explosion-proof safety design'],
    applications: ['Crude fat in feed and grain', 'Fat content in processed food'],
    status: 'published',
    verification_status: 'verified',
    is_featured: true,
    image_url: '/images/products/opsis-SoxROC_Front_open_140916-3937.jpg'
  },
  {
    id: 'p-hydroc-hydrolysis',
    slug: 'hydroc-hydrolysis-unit',
    name: 'HYDROC HYDROLYSIS UNIT',
    brand_slug: 'liquidline',
    category_slug: 'sample-preparation',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Acid hydrolysis unit for total fat preparation prior to solvent extraction.',
    full_description: 'HydROC / HydroC allows safe acid hydrolysis of food and feed samples to release bound fats before Soxhlet extraction.',
    specifications: [
      { label: 'Capacity', value: '6 samples per batch' },
      { label: 'Filter Technology', value: 'Clever filter bag design' }
    ],
    features: ['Eliminates sample transfer errors', 'Reduces acid exposure for lab technicians'],
    applications: ['Total fat acid hydrolysis'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false,
    image_url: '/images/products/opsis-HYDROC.jpg'
  },

  // --- PERTEN ---
  {
    id: 'p-da-7250',
    slug: 'da-7250-nir-analyzer',
    name: 'DA 7250™ NIR Analyzer',
    brand_slug: 'perten',
    category_slug: 'nir-spectroscopy',
    industry_slugs: ['agricultural-feed', 'grain-flour-milling', 'food-processing', 'dairy-milk'],
    short_description: 'Fast 6-second NIR diode array analyzer for grains, powders, pastes, and liquids.',
    full_description: 'The DA 7250 is a third-generation Diode Array NIR instrument. Analyzes samples in just 6 seconds without requiring grinding or sample preparation for most grains and pellets.',
    specifications: [
      { label: 'Analysis Time', value: '6 seconds' },
      { label: 'Wavelength Range', value: '950 - 1650 nm Diode Array' },
      { label: 'Sample Types', value: 'Grains, pellets, powders, pastes, liquids' },
      { label: 'Compliance', value: 'ISO 12099' }
    ],
    features: [
      'No sample grinding needed for whole grains',
      'Large color touchscreen interface',
      'Factory pre-calibrated for major agricultural commodities',
      'IP65 dust and water splash proof rating'
    ],
    applications: ['Moisture, protein, oil in grain and oilseeds', 'Proximate analysis in animal feed', 'Dairy powder composition'],
    status: 'published',
    verification_status: 'verified',
    is_featured: true,
    image_url: '/images/products/in-line-nir-sensor-da-7300-DA-7250-300x272.jpg'
  },
  {
    id: 'p-da-7300',
    slug: 'in-line-nir-sensor-da-7300',
    name: 'NIR Sensor – DA 7300™',
    brand_slug: 'perten',
    category_slug: 'nir-spectroscopy',
    industry_slugs: ['grain-flour-milling', 'food-processing', 'industrial-energy'],
    short_description: 'In-line continuous NIR process sensor with camera for real-time production monitoring.',
    full_description: 'The DA 7300 is mounted directly into process lines, pipes, or flume systems to measure moisture, protein, ash, and color continuously in flour mills and feed production plants.',
    specifications: [
      { label: 'Mounting', value: 'Flange / Pipe / Chute process mount' },
      { label: 'Interface', value: 'OPC DA/UA, Modbus, 4-20mA' },
      { label: 'Features', value: 'High-res camera for color & speck measurement' }
    ],
    features: [
      'Real-time continuous process control',
      'Dual lamp system with automatic switchover',
      'Rugged industrial enclosure'
    ],
    applications: ['Flour stream ash and protein monitoring', 'In-line feed moisture control'],
    status: 'published',
    verification_status: 'verified',
    is_featured: true,
    image_url: '/images/products/in-line-nir-sensor-da-7300-DA-7300-1.jpg'
  },
  {
    id: 'p-inframatic-9500',
    slug: 'inframatic-9500',
    name: 'Inframatic 9500 NIR Grain Analyzer',
    brand_slug: 'perten',
    category_slug: 'nir-spectroscopy',
    industry_slugs: ['grain-flour-milling', 'agricultural-feed'],
    short_description: 'Official NIR grain analyzer for moisture, protein, and oil testing in under 30 seconds.',
    full_description: 'The Inframatic 9500 is designed specifically for grain intake, grain trading, and flour milling. Delivers official NIR accuracy for wheat, barley, corn, soybean, and oilseeds.',
    specifications: [
      { label: 'Analysis Time', value: '~25 seconds' },
      { label: 'Technology', value: 'Monochromator NIR transmission' }
    ],
    features: [
      'Official grain trade approval in multiple countries',
      'Robust steel construction for grain intake stations',
      'NIR networking capability across grain elevators'
    ],
    applications: ['Grain intake payment testing', 'Flour wheat blending'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-falling-number',
    slug: 'falling-number',
    name: 'Falling Number® – Sprout Damage Detection',
    brand_slug: 'perten',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'The world standard instrument for alpha-amylase activity and sprout damage testing.',
    full_description: 'The original Falling Number instrument created by Harald Perten. Measures alpha-amylase enzyme activity in wheat and flour to detect sprout damage before baking.',
    specifications: [
      { label: 'Standard Method', value: 'ICC 107/1, AACC 56-81.01, ISO 3093' },
      { label: 'Test Time', value: 'Variable (~3-5 minutes)' }
    ],
    features: ['World standard reference method', 'Critical for grain grading and flour mill blending'],
    applications: ['Sprout damage detection in wheat', 'Fungal alpha-amylase enzyme supplementation'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-glutomatic',
    slug: 'glutomatic',
    name: 'Glutomatic® System',
    brand_slug: 'perten',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'World standard for determining wet gluten quantity, dry gluten, and Gluten Index.',
    full_description: 'The Glutomatic system measures the quantity and quality of gluten in wheat flour and semolina. Provides Gluten Index to evaluate gluten strength for bread and pasta manufacturing.',
    specifications: [
      { label: 'Parameters', value: 'Wet Gluten %, Dry Gluten %, Gluten Index, Water Binding' }
    ],
    features: ['Official ICC and AACC international standard', 'Rapid test under 10 minutes'],
    applications: ['Flour mill quality control', 'Durum wheat semolina grading'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-rapid-visco-analyser',
    slug: 'rapid-visco-analyser-rva',
    name: 'Rapid Visco Analyser (RVA)',
    brand_slug: 'perten',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling', 'food-processing'],
    short_description: 'Rotational viscometer with variable temperature and shear for starch gelatinization.',
    full_description: 'The RVA measures cooking and pasting properties of starches, flour, and ingredients under controlled heating, cooling, and shearing cycles.',
    specifications: [
      { label: 'Temperature Ramp', value: 'Up to 15 °C/minute heating/cooling' },
      { label: 'Software', value: 'Thermocline for Windows (TCW)' }
    ],
    features: ['Monitors starch gelatinization and retrogradation', 'Custom profile programming'],
    applications: ['Native and modified starch characterization', 'Extrusion cooking simulation'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-texture-analyzer-tvt',
    slug: 'texture-analyzer-tvt-6700',
    name: 'Texture Analyzer – TVT 6700',
    brand_slug: 'perten',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['food-processing', 'grain-flour-milling', 'dairy-milk'],
    short_description: 'Rapid physical texture analyzer for firmness, springiness, crispness, and stickiness.',
    full_description: 'The TVT 6700 performs physical compression and tension testing on baked goods, pasta, confectionery, dairy products, and gel formulations.',
    specifications: [
      { label: 'Force Range', value: 'Load cells up to 100 kg' }
    ],
    features: ['Versatile rigs and probes for bakery, dairy, and meat', 'Objective texture profile analysis (TPA)'],
    applications: ['Bread crumb firmness', 'Pasta firmness and stickiness', 'Gel strength'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-combiscope',
    slug: 'combiscope',
    name: 'CombiScope FTIR Milk Analyzer',
    brand_slug: 'perten',
    category_slug: 'nir-spectroscopy',
    industry_slugs: ['dairy-milk'],
    short_description: 'Integrated FTIR spectrometer and somatic cell counter for raw milk quality testing.',
    full_description: 'Combines Mid-Infrared FTIR spectroscopy with flow cytometry to measure fat, protein, lactose, total solids, and somatic cell counts (SCC) in raw milk samples.',
    specifications: [
      { label: 'Throughput', value: 'Up to 600 samples per hour' }
    ],
    features: ['De novo fatty acid profiling', 'Blood NEFA screening'],
    applications: ['Payment testing in dairy plants', 'Herd improvement testing'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },

  // --- ANKOM TECHNOLOGY ---
  {
    id: 'p-ankom-2000',
    slug: 'ankom-2000-automated-fiber-analyzer',
    name: 'ANKOM 2000 Automated Fiber Analyzer',
    brand_slug: 'ankom',
    category_slug: 'fiber-analysis',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Automated crude fiber, ADF, and NDF analysis using Filter Bag Technology.',
    full_description: 'The ANKOM 2000 automates Acid Detergent Fiber (ADF), Neutral Detergent Fiber (NDF), and Crude Fiber determinations. Eliminates manual filtration and technician variability.',
    specifications: [
      { label: 'Batch Capacity', value: 'Up to 24 samples simultaneously' },
      { label: 'Daily Capacity', value: 'Up to 120 assays per day' }
    ],
    features: [
      'Filter Bag Technology eliminates manual filtration steps',
      'Automated chemical addition and rinsing',
      'Reduces labor cost per assay by over 50%'
    ],
    applications: ['ADF, NDF, Crude Fiber in feeds and forages', 'Dietary fiber in food'],
    status: 'published',
    verification_status: 'verified',
    is_featured: true
  },
  {
    id: 'p-ankom-tdf',
    slug: 'ankom-tdf-fiber-analyzer',
    name: 'ANKOM TDF Dietary Fiber Analyzer',
    brand_slug: 'ankom',
    category_slug: 'fiber-analysis',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Automated total dietary fiber analysis following official AOAC 985.29 and 991.43 methods.',
    full_description: 'The ANKOM Total Dietary Fiber (TDF) Analyzer automates official AOAC 985.29, 991.43, and 2001.03 methods. An advanced computer-controlled multichannel pump automates the addition of chemical solutions, enzymes, and rinses. Advanced Filter Bag Technology increases filtering surface area, eliminating water baths, vacuum flasks, and crucibles.',
    specifications: [
      { label: 'Official Methods', value: 'AOAC 991.43, AOAC 985.29, AACC 32.07.01 (upgradeable to AOAC 2009.01 & 2011.25)' },
      { label: 'Sample Capacity', value: '3 runs – 9 samples in duplicate per day/shift' },
      { label: 'Operation', value: 'Computer controlled multichannel automated pump' },
      { label: 'Filtration', value: 'Advanced Filter Bag Technology (no clogged filters)' }
    ],
    features: [
      'Follows AOAC 991.43 and 985.29 official standards',
      'Automated enzyme and chemical addition with temperature and agitation control',
      'Eliminates water baths, filtration flasks, and vacuum manifolds',
      'Reduces technician labor and per-assay costs significantly'
    ],
    applications: ['Total dietary fiber in human foods', 'Nutritional labeling compliance', 'Food quality control and research'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-ankom-200',
    slug: 'ankom-200-fiber-analyzer',
    name: 'ANKOM 200 Fiber Analyzer',
    brand_slug: 'ankom',
    category_slug: 'fiber-analysis',
    industry_slugs: ['agricultural-feed'],
    short_description: 'Semi-automated fiber analyzer for economical crude fiber, ADF, and NDF testing.',
    full_description: 'The ANKOM 200 Fiber Analyzer provides accurate fiber determinations using Filter Bag Technology at a budget-friendly entry level.',
    specifications: [
      { label: 'Batch Capacity', value: 'Up to 24 samples' }
    ],
    features: ['Economical filter bag system', 'Low space footprint'],
    applications: ['Crude fiber, ADF, NDF in livestock feeds'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-ankom-hci',
    slug: 'ankom-hci-hydrolysis-system',
    name: 'ANKOM HCl Hydrolysis System',
    brand_slug: 'ankom',
    category_slug: 'sample-preparation',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Automated acid hydrolysis system for total fat preparation.',
    full_description: 'Automates hydrochloric acid hydrolysis of food and feed samples prior to total fat extraction, eliminating hazardous manual acid handling.',
    specifications: [
      { label: 'Batch Capacity', value: 'Up to 15 samples' }
    ],
    features: ['Closed acid digestion system', 'Automated acid rinse cycle'],
    applications: ['Total fat acid hydrolysis'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-ankom-rf-gas',
    slug: 'ankom-rf-gas-production-system',
    name: 'ANKOM RF Gas Production System',
    brand_slug: 'ankom',
    category_slug: 'fiber-analysis',
    industry_slugs: ['agricultural-feed', 'environmental-soil'],
    short_description: 'Wireless gas production system for in vitro rumen fermentation and biogas monitoring.',
    full_description: 'Monitors kinetics of gas generation wirelessly from up to 50 reaction modules. Ideal for ruminant nutrition research and anaerobic digestion kinetics.',
    specifications: [
      { label: 'Communication', value: '2.4 GHz RF wireless transmission' },
      { label: 'Module Capacity', value: 'Expandable up to 50 modules' }
    ],
    features: ['Real-time continuous pressure recording', 'Automated gas venting'],
    applications: ['In vitro rumen digestibility', 'Biogas production potential'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-ankom-xt10',
    slug: 'ankom-xt10-extractor',
    name: 'ANKOM XT10 Extractor',
    brand_slug: 'ankom',
    category_slug: 'fat-extraction',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'Semi-automated solvent fat extractor using filter bag technology.',
    full_description: 'Performs crude fat extraction at elevated temperature and pressure to accelerate extraction times to under 40 minutes.',
    specifications: [
      { label: 'Batch Capacity', value: 'Up to 15 samples per batch' },
      { label: 'Extraction Time', value: '30-45 minutes' }
    ],
    features: ['High temperature extraction', 'Automated solvent recovery'],
    applications: ['Crude fat in feed and food'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-ankom-xt15',
    slug: 'ankom-xt15-extractor',
    name: 'ANKOM XT15 Extractor',
    brand_slug: 'ankom',
    category_slug: 'fat-extraction',
    industry_slugs: ['agricultural-feed', 'food-processing'],
    short_description: 'High-temperature automated fat extraction system with solvent recovery.',
    full_description: 'The ANKOM XT15 automates crude fat extraction for up to 15 samples per batch. High temperature extraction reduces solvent volume and extraction time.',
    specifications: [
      { label: 'Capacity', value: '15 samples/batch' },
      { label: 'Daily Capacity', value: 'Up to 150 samples per day' }
    ],
    features: ['Fully automated solvent recycling', 'Fast 40-minute cycle time'],
    applications: ['Crude fat determination'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-daisy-incubator',
    slug: 'daisy-incubator',
    name: 'Daisy Incubator',
    brand_slug: 'ankom',
    category_slug: 'fiber-analysis',
    industry_slugs: ['agricultural-feed'],
    short_description: 'In vitro digestibility incubator for animal feed and forage evaluation.',
    full_description: 'Maintains precise temperature and continuous rotation for up to 92 samples simultaneously in 4 incubator digestion jars.',
    specifications: [
      { label: 'Capacity', value: '4 jars (up to 23 samples per jar = 92 samples total)' }
    ],
    features: ['Simulates rumen digestion', 'Eliminates lab tube shaking'],
    applications: ['In vitro true digestibility (IVTD)', 'Apparent digestibility'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },

  // --- NEOGEN ---
  {
    id: 'p-accuscan-gold',
    slug: 'accuscan-gold',
    name: 'AccuScan ® Gold Lateral Flow Reader',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['food-processing', 'agricultural-feed', 'grain-flour-milling'],
    short_description: 'Ruggedized digital lateral flow reader for objective, permanent, and traceable mycotoxin test results.',
    full_description: 'AccuScan Gold removes subjectivity from reading lateral flow test strips from Neogen. Provides consistent interpretation and permanent, traceable record keeping for BetaStar, Reveal, Reveal Q+, and Reveal Q+ MAX test kits. Features an IP67 ruggedized housing, daylight-readable color touchscreen, and PC Data Manager interface.',
    specifications: [
      { label: 'CPU & Speed', value: 'Samsung S3C2440 / 400 MHz' },
      { label: 'Operating System', value: 'WinCE 5.x' },
      { label: 'Display', value: '240 x 320 TFT daylight-readable with LED backlight' },
      { label: 'Environmental Sealing', value: 'IP67 dust and waterproof' },
      { label: 'Power', value: '7.2 V, 1,700 mAh Li-Ion rechargeable battery' },
      { label: 'Interface', value: 'USB 1.1 client, RS-232 serial, IrDA 1.1' },
      { label: 'Memory', value: '64 MB SDRAM / 128 MB Flash + 2.0 GB SD storage' }
    ],
    features: [
      'Digital reading eliminates operator interpretation subjectivity',
      'Automatic recording of result, sample ID, date, and time for audit trails',
      'Exports to AccuScan Gold Data Manager for trend analysis and reporting',
      'Compact, lightweight (16.9 oz) and battery powered for mobile fieldwork'
    ],
    applications: ['Quantitative mycotoxin detection (Aflatoxin, DON, Fumonisin)', 'Food allergen testing', 'Field and laboratory diagnostic screening'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-accuscan-pro',
    slug: 'accuscan-pro',
    name: 'AccuScan ® Pro Reader',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['agricultural-feed', 'grain-flour-milling', 'food-processing'],
    short_description: 'Digital lateral flow strip reader for quantitative mycotoxin and allergen testing.',
    full_description: 'The AccuScan Pro reader provides objective digital reading of Neogen Reveal lateral flow test strips, eliminating visual interpretation subjectivity.',
    specifications: [
      { label: 'Display', value: 'Touchscreen LCD' },
      { label: 'Data Export', value: 'USB / Ethernet / LIMS output' }
    ],
    features: ['Objective numerical concentration results', 'Fast scan in seconds'],
    applications: ['Aflatoxin, Ochratoxin, DON, Fumonisin quantitative analysis'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-raptor-platform',
    slug: 'raptor-integrated-analysis-platform',
    name: 'Raptor ® Integrated Analysis Platform',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['agricultural-feed', 'grain-flour-milling', 'food-processing'],
    short_description: 'Automated 3-port lateral flow test reader with controlled incubation.',
    full_description: 'The Raptor platform allows testing of up to 3 samples simultaneously with automated timing, incubation, and strip reading.',
    specifications: [
      { label: 'Ports', value: '3 independent incubation & reading channels' }
    ],
    features: ['Integrated incubation controls', 'Barcode sample tracking'],
    applications: ['Multiplex mycotoxin testing in grain elevators'],
    status: 'published',
    verification_status: 'verified',
    is_featured: true
  },
  {
    id: 'p-reveal-3d',
    slug: 'reveal-3-d',
    name: 'Reveal ® 3-D Allergen Test Kits',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['food-processing'],
    short_description: 'Rapid 3-line lateral flow tests for food allergen environmental swabbing.',
    full_description: 'Qualitative lateral flow test kits for detecting trace food allergens (peanut, egg, milk, soy, gluten, hazelnut) on equipment surfaces and rinse waters.',
    specifications: [
      { label: 'Result Time', value: '5-10 minutes' }
    ],
    features: ['3-line system prevents false negatives from high overload'],
    applications: ['Sanitation validation in food processing'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-reveal-q-plus',
    slug: 'reveal-q',
    name: 'Reveal ® Q+ Quantitative Mycotoxin Strips',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['agricultural-feed', 'grain-flour-milling'],
    short_description: 'Quantitative lateral flow test strips for Aflatoxin, DON, Fumonisin, and Zearalenone.',
    full_description: 'Single-step lateral flow quantitative test kits for rapid grain screening at elevators and feed mills.',
    specifications: [
      { label: 'Detection Range', value: 'ppb / ppm quantitative range' }
    ],
    features: ['Rapid 6-minute assay time', 'Simple extraction protocol'],
    applications: ['Grain intake mycotoxin screening'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-reveal-q-max',
    slug: 'reveal-q-max',
    name: 'Reveal ® Q+ MAX Water-Based Extraction Strips',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['agricultural-feed', 'grain-flour-milling'],
    short_description: 'Water-extracted quantitative mycotoxin strips eliminating organic solvent extraction.',
    full_description: 'Uses an eco-friendly aqueous extraction buffer to test for mycotoxins without requiring hazardous organic solvents like methanol.',
    specifications: [
      { label: 'Extraction', value: 'Water-based eco buffer' }
    ],
    features: ['No hazardous solvent disposal', 'Common extraction for multiple toxins'],
    applications: ['Safe field grain testing'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },

  // --- DDS CALORIMETERS ---
  {
    id: 'p-cal3k-a',
    slug: 'cal3k-a-oxygen-bomb-calorimeter-system',
    name: 'CAL3K-A Oxygen Bomb Calorimeter System',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['agricultural-feed', 'industrial-energy'],
    short_description: 'Automated air-jacketed dry oxygen bomb calorimeter system.',
    full_description: 'The CAL3K-A is an automated dry calorimeter requiring no water jacket. Uses advanced isothermal thermodynamic algorithms to determine calorific values.',
    specifications: [
      { label: 'Jacket Type', value: 'Dry Air-Jacketed (No water container required)' },
      { label: 'Resolution', value: '0.0001 MJ/kg' }
    ],
    features: ['Eco-friendly waterless operation', 'Fast determination under 10 minutes'],
    applications: ['Animal feed energy value', 'Coal and biomass calorific testing'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-cal3k-ap',
    slug: 'cal3k-ap-oxygen-bomb-calorimeter-system',
    name: 'CAL3K-AP Pressurized Calorimeter System',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['industrial-energy'],
    short_description: 'Automatic pressurized oxygen bomb calorimeter for high-throughput testing.',
    full_description: 'Features automated oxygen filling and vessel pressure management for high-throughput commercial energy testing laboratories.',
    specifications: [
      { label: 'Oxygen Filling', value: 'Automated pressure fill' }
    ],
    features: ['Automated oxygen charging and venting', 'High sample throughput'],
    applications: ['Coal, coke, and oil energy determination'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-cal3k-f',
    slug: 'cal3k-f-oxygen-bomb-calorimeter-system',
    name: 'CAL3K-F Fast Oxygen Bomb Calorimeter',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['industrial-energy', 'agricultural-feed'],
    short_description: 'High-speed calorimeter for rapid energy measurement.',
    full_description: 'Optimized for high-speed routine calorific determination where rapid turnaround is required.',
    specifications: [
      { label: 'Test Time', value: '5-7 minutes' }
    ],
    features: ['High speed calculation algorithm'],
    applications: ['Routine calorific value screening'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-cal3k-s',
    slug: 'cal3k-s-oxygen-bomb-calorimeter-system',
    name: 'CAL3K-S Standard Oxygen Bomb Calorimeter',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['agricultural-feed', 'industrial-energy'],
    short_description: 'Standard reliable bomb calorimeter for quality control labs.',
    full_description: 'Standard workhorse calorimeter providing reliable gross calorific value (GCV) determination for agricultural and fuel samples.',
    specifications: [
      { label: 'Accuracy', value: '< 0.1% RSD' }
    ],
    features: ['Compact desktop footprint', 'Low maintenance requirements'],
    applications: ['Gross calorific value determination'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-cal3k-u',
    slug: 'cal3k-u-oxygen-bomb-calorimeter-system',
    name: 'CAL3K-U Isoperibol Bomb Calorimeter',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['industrial-energy'],
    short_description: 'Isoperibol bomb calorimeter for high-precision scientific testing.',
    full_description: 'Isoperibol design maintaining constant jacket temperature for research-grade calorific measurements.',
    specifications: [
      { label: 'Precision', value: 'Research grade isoperibol control' }
    ],
    features: ['High thermal stability'],
    applications: ['Research laboratory energy measurements'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },
  {
    id: 'p-e2k',
    slug: 'e2k-oxygen-bomb-calorimeter-system',
    name: 'E2K Educational Bomb Calorimeter',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['industrial-energy'],
    short_description: 'Entry-level educational bomb calorimeter system.',
    full_description: 'Designed for university teaching laboratories and entry-level quality control testing.',
    specifications: [
      { label: 'Operation', value: 'Manual bomb vessel handling' }
    ],
    features: ['Cost effective teaching tool'],
    applications: ['Academic teaching and simple calorific testing'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },

  // --- CHOPIN TECHNOLOGIES ---
  {
    id: 'p-infraneo',
    slug: 'infraneo-grain-analyzer',
    name: 'Infraneo Multi-Purpose Infrared Grain Analyzer',
    brand_slug: 'chopin',
    category_slug: 'nir-spectroscopy',
    industry_slugs: ['grain-flour-milling', 'agricultural-feed', 'food-processing'],
    short_description: 'Multi-purpose grating monochromator NIR transmission analyzer for whole grains and powders.',
    full_description: 'The Infraneo features a latest-generation grating monochromator coupled with SAM (Self Adjustment of Monochromator) technology for unparalleled optical stability. Generates comprehensive quality results in 60 seconds for protein, moisture, specific weight, Zeleny sedimentation, gluten, oil, and ash content across whole grains, flours, and semolina.',
    specifications: [
      { label: 'Technology', value: 'High-resolution grating monochromator with SAM auto-adjustment' },
      { label: 'Analysis Time', value: 'Results in 60 seconds for all parameters' },
      { label: 'Parameters', value: 'Protein, moisture, specific weight, gluten, Zeleny, ash, oil' },
      { label: 'Data Storage', value: 'Up to 100,000 saved analyses in internal memory' },
      { label: 'Sample Types', value: 'Whole grains (wheat, corn, barley, canola) and flours/powders' }
    ],
    features: [
      'Self-Adjusting Monochromator (SAM) for durable vibration resistance',
      'No sample grinding required for whole grains',
      'Self-adjusting measuring cell automatically adapts to product type',
      'Networkable across multiple NIR sites with open PLS calibration system'
    ],
    applications: ['Commercial grain elevator intake inspection', 'Flour milling stream optimization', 'Bakery raw material verification'],
    status: 'published',
    verification_status: 'verified',
    is_featured: false
  },

  // --- DISCONTINUED PRODUCT (Linked to CAL3K-A) ---
  {
    id: 'p-cal2k',
    slug: 'cal2k-oxygen-bomb-calorimeter-system',
    name: 'CAL2K Oxygen Bomb Calorimeter (Discontinued)',
    brand_slug: 'dds',
    category_slug: 'bomb-calorimetry',
    industry_slugs: ['industrial-energy'],
    short_description: 'Legacy bomb calorimeter system (Discontinued). Replaced by CAL3K-A and CAL3K-AP.',
    full_description: 'Please note the CAL2K Oxygen Bomb Calorimeter System has been discontinued by DDS Calorimeters and is no longer available. The CAL3K-AP Oxygen Bomb Calorimeter System and CAL3K-A Oxygen Bomb Calorimeter System have replaced this unit.',
    specifications: [
      { label: 'Status', value: 'Discontinued by Manufacturer' }
    ],
    features: ['Legacy unit replaced by CAL3K-A'],
    applications: ['Replaced by CAL3K-A'],
    status: 'discontinued',
    verification_status: 'verified',
    is_featured: false,
    replacement_product_slug: 'cal3k-a-oxygen-bomb-calorimeter-system'
  },

  // --- UNVERIFIED / DRAFT RECORDS (Chopin & Neogen raw items requiring verification) ---
  {
    id: 'p-alveopc',
    slug: 'alveopc',
    name: 'AlveoPC',
    brand_slug: 'chopin',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'Dough tenacity (P), extensibility (L), and baking strength (W) measurement.',
    full_description: 'The AlveoPC measures the rheological properties of dough during bubble inflation. Unverified raw record.',
    specifications: [],
    features: ['Measures P, L, P/L, and W parameters'],
    applications: ['Wheat flour baking quality'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-labmill',
    slug: 'labmill',
    name: 'LabMill',
    brand_slug: 'chopin',
    category_slug: 'sample-preparation',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'Laboratory milling of hard and soft wheats.',
    full_description: 'Laboratory roller mill reproducing industrial flour milling yields. Unverified raw record.',
    specifications: [],
    features: ['Gradual reduction milling'],
    applications: ['Experimental flour milling'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-rheo-f4',
    slug: 'rheo-f4',
    name: 'Rheo F4',
    brand_slug: 'chopin',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'Measures dough characteristics during proofing and yeast fermentation.',
    full_description: 'Monitors carbon dioxide development and dough volume increase during fermentation. Unverified raw record.',
    specifications: [],
    features: ['Measures gas production and retention'],
    applications: ['Yeast dough proofing analysis'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-sdmatic',
    slug: 'sdmatic',
    name: 'SDmatic',
    brand_slug: 'chopin',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'Starch damage analysis in flour in less than 10 minutes.',
    full_description: 'Uses amperometric iodine absorption to measure starch damage in flour. Unverified raw record.',
    specifications: [],
    features: ['Rapid iodine absorption method'],
    applications: ['Damaged starch in flour milling'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-alveolab',
    slug: 'alveolab',
    name: 'Alveolab',
    brand_slug: 'chopin',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'Advanced automated Alveograph for complete dough rheology.',
    full_description: 'Automated Alveograph with temperature and humidity control. Unverified raw record.',
    specifications: [],
    features: ['Automated dough patty preparation and inflation'],
    applications: ['Flour quality control'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-mixolab-2',
    slug: 'mixolab-2',
    name: 'Mixolab 2',
    brand_slug: 'chopin',
    category_slug: 'rheology-dough-testing',
    industry_slugs: ['grain-flour-milling'],
    short_description: 'Measures dough characteristics during mixing and heating.',
    full_description: 'Evaluates protein quality, starch gelatinization, enzymatic activity, and starch retrogradation in a single test. Unverified raw record.',
    specifications: [],
    features: ['Complete torque and temperature curve'],
    applications: ['Flour performance profiling'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-reveal-base',
    slug: 'reveal',
    name: 'Reveal ® Base Test Line',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['food-processing'],
    short_description: 'Neogen Reveal base diagnostic strip product line.',
    full_description: 'Base record for Reveal strip family. Unverified raw record.',
    specifications: [],
    features: ['Rapid lateral flow'],
    applications: ['Food safety screening'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-reveal-2-0',
    slug: 'reveal-2-0',
    name: 'Reveal ® 2.0 Test Line',
    brand_slug: 'neogen',
    category_slug: 'food-safety-diagnostics',
    industry_slugs: ['food-processing'],
    short_description: 'Second generation Neogen Reveal lateral flow strips.',
    full_description: 'Base record for Reveal 2.0 pathogen and toxin strips. Unverified raw record.',
    specifications: [],
    features: ['Enhanced sensitivity'],
    applications: ['Pathogen screening'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  },
  {
    id: 'p-lactoscope-unverified',
    slug: 'lactoscope',
    name: 'LactoScope FTIR Milk Analyzer (Unverified)',
    brand_slug: 'perten',
    category_slug: 'nir-spectroscopy',
    industry_slugs: ['dairy-milk'],
    short_description: 'Liquid milk FTIR analyzer. Unverified brand attribution record.',
    full_description: 'FTIR analyzer for milk fat and protein. Requires verification of exact brand attribution before publishing.',
    specifications: [],
    features: ['FTIR liquid milk analysis'],
    applications: ['Raw milk analysis'],
    status: 'draft',
    verification_status: 'unverified',
    is_featured: false
  }
]
