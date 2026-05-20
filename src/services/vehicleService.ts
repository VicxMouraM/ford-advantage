import vehiclesData from "../data/vehicles.json";

export interface Vehicle {
  name: string;
  brand?: string;
  model: string;
  version?: string;
  specs: Record<string, any>;
  wheels?: Record<string, any>;
  connectivity?: Record<string, any>;
  iceLineUp?: Record<string, any>;
  airConditioning?: Record<string, any>;
  safety?: Record<string, any>;
  highTech?: Record<string, any>;
  globalClosing?: Record<string, any>;
  trim?: Record<string, any>;
  sunRoof?: Record<string, any>;
  seats?: Record<string, any>;
  lights?: Record<string, any>;
  fourXFour?: Record<string, any>;
  others?: Record<string, any>;
}

const normalizeText = (text: string) =>
  String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const VEHICLE_MAP: Record<string, string> = {
  "ranger raptor": "Ranger Raptor",
  "ford ranger raptor": "Ranger Raptor",

  "ranger xlt": "XLT 3.0L V6 AT 26MY",
  "ford ranger xlt": "XLT 3.0L V6 AT 26MY",

  "ranger limited": "Limited 3.0L V6 26MY",
  "ford ranger limited": "Limited 3.0L V6 26MY",

  "ranger limited+": "Limited + 3.0L V6 26MY",
  "ranger limited plus": "Limited + 3.0L V6 26MY",
  "ford ranger limited+": "Limited + 3.0L V6 26MY",
  "ford ranger limited plus": "Limited + 3.0L V6 26MY",
};

export const searchVehicle = (
  brand: string,
  model: string,
  version: string,
): { found: boolean; vehicle?: Vehicle; message?: string } => {
  const normalizedBrand = brand.toLowerCase().trim();
  const normalizedModel = model.toLowerCase().trim();
  const normalizedVersion = version.toLowerCase().trim();

  const searchTerm =
    `${normalizedBrand} ${normalizedModel} ${normalizedVersion}`.trim();

  if (VEHICLE_MAP[searchTerm]) {
    const vehicleName = VEHICLE_MAP[searchTerm];
    const vehicle = (vehiclesData.vehicles as any)[vehicleName];
    if (vehicle) {
      return { found: true, vehicle: { ...vehicle, name: vehicleName } };
    }
  }

  const allVehicles = Object.entries(vehiclesData.vehicles);

  for (const [name, vehicle] of allVehicles) {
    const nameLower = name.toLowerCase();

    const matchesModel = normalizedModel && nameLower.includes(normalizedModel);

    const matchesVersion =
      normalizedVersion && nameLower.includes(normalizedVersion);

    if (matchesModel && matchesVersion) {
      return {
        found: true,
        vehicle: { ...(vehicle as any), name },
      };
    }
  }

  return {
    found: false,
    message: `Veículo "${brand} ${model} ${version}" não encontrado. 
    
    Veículos disponíveis:
    • XLT 3.0L V6 AT 26MY (Ford Ranger)
    • Limited 3.0L V6 26MY (Ford Ranger)
    • Limited + 3.0L V6 26MY (Ford Ranger)`,
  };
};

export const STANDARD_SPECS = [
  { id: "Potência", label: "Potência (cv)" },
  { id: "Torque", label: "Torque (Nm)" },
  { id: "Cilindrada", label: "Cilindrada (L)" },
  { id: "Transmissão Automática", label: "Transmissão Automática" },
  { id: "Quantidade de marchas", label: "Quantidade de marchas" },
  { id: "Motor Diesel", label: "Motor Diesel" },
  { id: "Tecnologia turbo", label: "Tecnologia turbo" },
  { id: "Polegadas", label: "Rodas (polegadas)" },
  { id: "Faróis Full LED", label: "Faróis Full LED" },
  { id: "Airbag (cada)", label: "Airbags" },
  { id: "Câmera 360 graus", label: "Câmera 360°" },
  { id: "Carregamento Wireless", label: "Carregamento Wireless" },
  { id: "Freio de mão eletrônico", label: "Freio de mão eletrônico" },
  { id: "Anos de garantia", label: "Garantia (anos)" },
  { id: "Tração integral (AWD)", label: "Tração Integral AWD" },
  { id: "Diferencial traseiro blocante", label: "Diferencial blocante" },
  {
    id: "Sensor de Estacionamento Traseiro",
    label: "Sensor de Estacionamento",
  },
  {
    id: "Ar Condicionado Automático e Digital",
    label: "Ar Condicionado Digital",
  },
  { id: "Sistema de som Premium/Marca", label: "Som Premium" },
  { id: "Teto Solar Elétrico", label: "Teto Solar" },
];

export const getSpecValue = (vehicle: Vehicle, specName: string): any => {
  const categories = [
    "specs",
    "wheels",
    "connectivity",
    "iceLineUp",
    "airConditioning",
    "safety",
    "highTech",
    "globalClosing",
    "trim",
    "sunRoof",
    "seats",
    "lights",
    "fourXFour",
    "others",
  ];

  for (const category of categories) {
    const categoryData = vehicle[category as keyof Vehicle];
    if (categoryData && typeof categoryData === "object") {
      if (categoryData[specName] !== undefined) {
        let value = categoryData[specName];

        if (value === "X") return "✅ Sim";
        if (value === 0 || value === "0") return "❌ Não";
        if (value === 1 || value === "1") return "✅ Sim";
        if (typeof value === "number") return value;
        if (typeof value === "string" && value !== "X" && value !== "0")
          return value;
        if (value === null || value === undefined) return "📭 não disponível";
        return value;
      }
    }
  }
  return "📭 não disponível";
};

export const getStandardizedSpecs = (vehicle: Vehicle) => {
  return STANDARD_SPECS.map((spec) => {
    const value = getSpecValue(vehicle, spec.id);
    return {
      label: spec.label,
      value: value,
      available:
        value !== "📭 não disponível" &&
        !String(value).includes("não disponível"),
    };
  });
};

export const mockApi = {
  searchVehicle: async (brand: string, model: string, version: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const vehicles = vehiclesData.vehicles;

    const searchBrand = normalizeText(brand);
    const searchModel = normalizeText(model);
    const searchVersion = normalizeText(version);

    if (!searchVersion) {
      return {
        found: false,
        message: `Digite uma versão para buscar.

Veículos disponíveis:
• Raptor (Ford Ranger)
• XLT 3.0L V6 AT 26MY (Ford Ranger)
• Limited 3.0L V6 26MY (Ford Ranger)
• Limited + 3.0L V6 26MY (Ford Ranger)`,
      };
    }

    const vehicleEntry = Object.entries(vehicles).find(
      ([key, vehicle]: any) => {
        const vehicleKey = normalizeText(key);
        const vehicleName = normalizeText(vehicle.name);
        const vehicleBrand = normalizeText(vehicle.brand);
        const vehicleModel = normalizeText(vehicle.model);
        const vehicleVersion = normalizeText(vehicle.version);

        const brandMatches = !searchBrand || vehicleBrand === searchBrand;
        const modelMatches = !searchModel || vehicleModel === searchModel;

        const versionMatches =
          vehicleVersion === searchVersion ||
          vehicleName === searchVersion ||
          vehicleKey === searchVersion ||
          vehicleVersion.includes(searchVersion) ||
          searchVersion.includes(vehicleVersion);

        return brandMatches && modelMatches && versionMatches;
      },
    );

    if (vehicleEntry) {
      const [, vehicle] = vehicleEntry;

      return {
        found: true,
        vehicle,
      };
    }

    return {
      found: false,
      message: `Veículo "${brand} ${model} ${version}" não encontrado.

Veículos disponíveis:
• Raptor (Ford Ranger)
• XLT 3.0L V6 AT 26MY (Ford Ranger)
• Limited 3.0L V6 26MY (Ford Ranger)
• Limited + 3.0L V6 26MY (Ford Ranger)`,
    };
  },
};
