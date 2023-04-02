import { ChartBarIcon, BuildingBankIcon, Category2Icon, WalletIcon } from 'vue-tabler-icons'
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
    children: [
      {
        title: 'TD Savings',
        to: '/'
      },
      {
        title: 'TD Chequing',
        to: '/'
      },
      {
        title: 'TD Credit Card',
        to: '/'
      }
    ]
  }
]

export default baseMenuItems
