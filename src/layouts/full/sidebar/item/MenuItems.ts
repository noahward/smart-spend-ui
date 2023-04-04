import { ChartBarIcon, Category2Icon, WalletIcon } from 'vue-tabler-icons'
import type { TablerIconComponent } from 'vue-tabler-icons'

export type MenuItem = {
  title: string;
  to: string;
  icon?: TablerIconComponent;
  children?: MenuItem[];
  disabled?: boolean;
}

const baseMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: ChartBarIcon,
    to: '/dashboard'
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
  }
]

export default baseMenuItems
