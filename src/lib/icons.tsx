import {
  Cpu,
  MonitorPlay,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Power,
  Box,
  Snowflake,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  procesadores: Cpu,
  tarjetas: MonitorPlay,
  placas: CircuitBoard,
  memoria: MemoryStick,
  almacenamiento: HardDrive,
  fuentes: Power,
  cases: Box,
  coolers: Snowflake,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug] ?? Box;
}
