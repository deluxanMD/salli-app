import {
  ArrowDown,
  Bell,
  Calendar,
  Car,
  ChartPie,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleQuestionMark,
  Cloud,
  Coins,
  Download,
  Film,
  Heart,
  House,
  Info,
  List,
  Lock,
  MessageSquare,
  Moon,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Sun,
  Trash,
  TrendingUp,
  Utensils,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';

/** Icon set from the Build spec 3 icon sheet. Names follow lucide; renamed ones keep the spec name. */
const icons = {
  house: House,
  list: List,
  'pie-chart': ChartPie,
  wallet: Wallet,
  'sliders-horizontal': SlidersHorizontal,
  bell: Bell,
  search: Search,
  plus: Plus,
  'shopping-cart': ShoppingCart,
  car: Car,
  utensils: Utensils,
  zap: Zap,
  heart: Heart,
  film: Film,
  'shopping-bag': ShoppingBag,
  'trending-up': TrendingUp,
  'message-square': MessageSquare,
  'shield-check': ShieldCheck,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-down': ChevronDown,
  sparkles: Sparkles,
  check: Check,
  moon: Moon,
  lock: Lock,
  download: Download,
  calendar: Calendar,
  pencil: Pencil,
  'circle-help': CircleQuestionMark,
  'arrow-down': ArrowDown,
  smartphone: Smartphone,
  'trash-2': Trash,
  coins: Coins,
  cloud: Cloud,
  info: Info,
  sun: Sun,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function isIconName(name: string): name is IconName {
  return name in icons;
}

type IconProps = {
  name: IconName;
  size: number;
  color: string;
  strokeWidth?: number;
};

/** Decorative by default; wrap in a labelled control when it carries meaning. */
export function Icon({ name, size, color, strokeWidth = 2 }: IconProps) {
  const Glyph = icons[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} aria-hidden />;
}
