const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/main/Dashboard.vue')
    },
    {
      name: 'Budget',
      path: '/budget',
      component: () => import('@/views/main/Budget.vue')
    },
    {
      name: 'Categorize',
      path: '/categorize',
      component: () => import('@/views/main/Categorize.vue')
    },
    {
      name: 'Accounts',
      path: '/accounts',
      component: () => import('@/views/main/AccountsAll.vue')
    },
    {
      name: 'Account',
      path: '/accounts/:id',
      component: () => import('@/views/main/AccountSpecific.vue')
    }
  ]
}

export default MainRoutes
