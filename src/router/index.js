import Vue from 'vue'
import Router from 'vue-router'
//Ask for Geolocation screen if user didn't enabled it
import AskForGeoLocation from '@/components/AskForGeoLocation'
//List with all airplanes in area of users location
import ListOfAirTraffic from '@/components/ListOfAirTraffic'
//Details for single airplane
import SingleAirplaneDetails from '@/components/SingleAirplaneDetails'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/list-of-air-traffic'
    },
    {
      path: '/',
      redirect: '/list-of-air-traffic'
    },
    {
      path: '/user-geolocation',
      name: 'AskForGeoLocation',
      component: AskForGeoLocation
    },
    {
      path: '/list-of-air-traffic',
      name: 'ListOfAirTraffic',
      component: ListOfAirTraffic
    },
    {
      path: '/airplane-details',
      name: 'SingleAirplaneDetails',
      component: SingleAirplaneDetails
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
    ///router.push('/user-geolocation');
    next();
  }else{
    next();
  }
  // else if (!requiresAuth && currentUser) next('future-events')
})

export default router