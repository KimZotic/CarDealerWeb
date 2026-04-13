import Image from "next/image";
import {
  Cog,
  Fuel,
  Gauge,
  Palette,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

type SpecIconProps = {
  label: string;
  className?: string;
};

const iconMap: Record<string, string> = {
  engine: "/icons/specs/engine.png",
  transmission: "/icons/specs/transmission.png",
  seats: "/icons/specs/seats.png",
  power: "/icons/specs/power.png",
  torque: "/icons/specs/torque.png",
  fuel: "/icons/specs/fuel.png",
  safety: "/icons/specs/safety.png",
  colors: "/icons/specs/colors.png",
};

function getKey(label: string) {
  const key = label.toLowerCase();

  if (key.includes("engine")) return "engine";
  if (key.includes("transmission")) return "transmission";
  if (key.includes("seat")) return "seats";
  if (key.includes("power")) return "power";
  if (key.includes("torque")) return "torque";
  if (key.includes("fuel")) return "fuel";
  if (key.includes("safety")) return "safety";
  if (key.includes("color")) return "colors";

  return "";
}

export function SpecIcon({ label, className = "h-5 w-5" }: SpecIconProps) {
  const key = getKey(label);
  const iconSrc = key ? iconMap[key] : null;

  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt={label}
        width={22}
        height={22}
        className="h-[22px] w-[22px] object-contain"
      />
    );
  }

  const fallbackKey = label.toLowerCase();

  if (fallbackKey.includes("engine")) return <Cog className={className} />;
  if (fallbackKey.includes("transmission")) return <Gauge className={className} />;
  if (fallbackKey.includes("seat")) return <Users className={className} />;
  if (fallbackKey.includes("power")) return <Zap className={className} />;
  if (fallbackKey.includes("torque")) return <Gauge className={className} />;
  if (fallbackKey.includes("fuel")) return <Fuel className={className} />;
  if (fallbackKey.includes("safety")) return <Shield className={className} />;
  if (fallbackKey.includes("color")) return <Palette className={className} />;

  return <Sparkles className={className} />;
}