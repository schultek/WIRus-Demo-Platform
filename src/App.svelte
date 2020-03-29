<script>
  import createRouter, {ROUTER_MODE} from '@spaceavocado/svelte-router';
  import RouterView from '@spaceavocado/svelte-router/component/view';

  import firebase from "./lib/firebase";

  // View components
  import PlatformView from './views/Platform.svelte';
  import LoginView from './views/Login.svelte';
  import SignUpView from "./views/SignUp.svelte";
  import HomeView from "./views/Home.svelte";

  import WirusLandingView from "./views/WirusLanding.svelte";
  import AuthHandlerView from "./views/AuthHandler.svelte";

  const router = createRouter({
    mode: ROUTER_MODE.HISTORY,
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      { 
        path: '/login',
        name: 'login',
        component: LoginView
      },
      {
        path: '/signup',
        name: 'signup',
        component: SignUpView
      },
      {
        path: '/platform',
        name: 'platform',
        component: PlatformView
      },
      {
        path: '/wirus',
        name: 'wirus',
        component: WirusLandingView
      },
      {
        path: '/auth',
        name: 'auth',
        component: AuthHandlerView
      }
    ],
  });

  $router.navigationGuard((from, to, next) => {

    if (to.name == 'platform') {
      if (firebase.auth().currentUser != null) {
        next();
      } else {
        next("/login")
      }
    } else if (to.name == "login") {
      if (firebase.auth().currentUser != null) {
        next("/platform");
      } else {
        next();
      }
    } else {
      next();
    }
    
  });
</script>

<RouterView />