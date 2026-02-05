export interface PlanetData {
  name: string;
  color: string;
  size: number;
  distance: number;
  speed: number;
  description: string;
  atmosphere: string;
  temperature: string;
  gravity: string;
}

export const planets: PlanetData[] = [
  {
    name: "Mercurio",
    color: "#A5A5A5",
    size: 0.4,
    distance: 4,
    speed: 0.002, // Reducido aún más para facilitar selección
    description: "El planeta más cercano al Sol y el más pequeño del sistema solar.",
    atmosphere: "Casi inexistente (exosfera)",
    temperature: "-173°C a 427°C",
    gravity: "3.7 m/s²"
  },
  {
    name: "Venus",
    color: "#E3BB76",
    size: 0.9,
    distance: 7,
    speed: 0.0015, // Reducido aún más para facilitar selección
    description: "A menudo llamado el gemelo de la Tierra por su tamaño similar, pero con una atmósfera tóxica.",
    atmosphere: "Densa, principalmente CO2",
    temperature: "462°C",
    gravity: "8.87 m/s²"
  },
  {
    name: "Tierra",
    color: "#2271B3",
    size: 1,
    distance: 10,
    speed: 0.001, // Reducido aún más para facilitar selección
    description: "Nuestro hogar, el único planeta conocido que alberga vida.",
    atmosphere: "Nitrógeno y Oxígeno",
    temperature: "-88°C a 58°C",
    gravity: "9.81 m/s²"
  },
  {
    name: "Marte",
    color: "#E27B58",
    size: 0.5,
    distance: 14,
    speed: 0.0008, // Reducido aún más para facilitar selección
    description: "Conocido como el planeta rojo debido al óxido de hierro en su superficie.",
    atmosphere: "Delgada, principalmente CO2",
    temperature: "-125°C a 20°C",
    gravity: "3.71 m/s²"
  },
  {
    name: "Júpiter",
    color: "#D39C7E",
    size: 2.2,
    distance: 20,
    speed: 0.0006, // Reducido aún más
    description: "El planeta más grande de nuestro sistema solar, un gigante gaseoso.",
    atmosphere: "Hidrógeno y Helio",
    temperature: "-108°C",
    gravity: "24.79 m/s²"
  },
  {
    name: "Saturno",
    color: "#C5AB6E",
    size: 1.8,
    distance: 26,
    speed: 0.0005, // Reducido aún más
    description: "Famoso por su espectacular sistema de anillos compuestos de hielo y polvo.",
    atmosphere: "Hidrógeno y Helio",
    temperature: "-138°C",
    gravity: "10.44 m/s²"
  },
  {
    name: "Urano",
    color: "#B5E3E3",
    size: 1.2,
    distance: 32,
    speed: 0.0004, // Reducido aún más
    description: "Un gigante de hielo con un eje de rotación muy inclinado.",
    atmosphere: "Hidrógeno, Helio y Metano",
    temperature: "-195°C",
    gravity: "8.69 m/s²"
  },
  {
    name: "Neptuno",
    color: "#4B70DD",
    size: 1.2,
    distance: 38,
    speed: 0.0003, // Reducido aún más
    description: "El planeta más alejado del Sol, conocido por sus fuertes vientos.",
    atmosphere: "Hidrógeno, Helio y Metano",
    temperature: "-201°C",
    gravity: "11.15 m/s²"
  }
];
