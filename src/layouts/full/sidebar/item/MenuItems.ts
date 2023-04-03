import { ChartBarIcon, BuildingBankIcon, Category2Icon, WalletIcon, PointIcon, PlusIcon } from 'vue-tabler-icons'
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
  },
  {
    title: 'Accounts',
    icon: BuildingBankIcon,
    to: '',
    children: [
      {
        title: 'All Accounts',
        icon: PointIcon,
        to: '/accounts'
      },
      {
        title: 'TD Savings',
        icon: PointIcon,
        to: '/account1'
      },
      {
        title: 'TD Chequing',
        icon: PointIcon,
        to: '/account1'
      },
      {
        title: 'TD Credit Card',
        icon: PointIcon,
        to: '/account1'
      },
      {
        title: 'Add Account',
        icon: PlusIcon,
        to: '/ss'
      }
    ]
  }
]

export default baseMenuItems
