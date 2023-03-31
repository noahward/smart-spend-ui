const AuthRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: '/',
      component: () => import('@/views/auth/Login.vue')
    }
  ]
}

export default AuthRoutes
