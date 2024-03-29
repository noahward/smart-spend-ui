const AuthRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  redirect: '/login',
  children: [
    {
      name: 'Landing',
      path: '/',
      component: () => import('@/views/auth/Landing.vue')
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/auth/Register.vue')
    }
  ]
}

export default AuthRoutes
