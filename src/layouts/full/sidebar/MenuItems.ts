import { ChartBarIcon, BuildingBankIcon, Category2Icon, WalletIcon } from 'vue-tabler-icons'
import type { TablerIconComponent } from 'vue-tabler-icons'

export interface MenuItem {
  header?: string;
  title?: string;
  icon?: TablerIconComponent;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: MenuItem[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const baseMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: ChartBarIcon,
    to: '/'
  },
  {
    title: 'Budget',
    icon: WalletIcon,
    to: '/budget'
  },
  {
    title: 'Categorize',
    icon: Category2Icon,
    to: '/categorize'
  },
  {
    title: 'All Accounts',
    icon: BuildingBankIcon,
    to: '/accounts',
    children: []
  }
]

export default baseMenuItems
