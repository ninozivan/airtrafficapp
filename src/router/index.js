import Vue from 'vue'
import Router from 'vue-router'
import SplashScreen from '@/components/SplashScreen'
//Ask for Geolocation screen if user didn't enabled it
import WelcomeScreen from '@/components/WelcomeScreen'
//List with all airplanes in area of users location
import ListOfAirTraffic from '@/components/ListOfAirTraffic'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'SplashScreen',
      component: SplashScreen
    },    
    {
      path: '/welcome-screen',
      name: 'WelcomeScreen',
      component: WelcomeScreen
    },
    {
      path: '/list-of-air-traffic',
      name: 'ListOfAirTraffic',
      component: ListOfAirTraffic
    }
  ]
})


router.beforeEach((to, from, next) => {
  // let currentUser = Firebase.auth().currentUser;
  // let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  //console.log('beforeEach: to: ' + to + ', from: ' + from + ', next: ' + next);
  let testValue = true;
  if (testValue) {
    console.log('testing check values before each')
    ///router.push('/welcome-screen');
    next();
  }else{
    next();
  }
  // else if (!requiresAuth && currentUser) next('future-events')
})

export default router