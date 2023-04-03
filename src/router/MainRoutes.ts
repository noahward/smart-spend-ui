const MainRoutes = {
  path: '/',
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
      component: () => import('@/views/main/Accounts.vue')
    }
  ]
}

export default MainRoutes
