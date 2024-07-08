import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
 
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Analyse chaine de montage',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Quantité par famille',
        url: '/base/Quantite-par-famille',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Rendement par chaine',
        url: '/base/Rendement-par-chaine',
        icon: 'nav-icon-bullet'
      },
      // {
      //   name: '*',
      //   url: '/base/cards',
      //   icon: 'nav-icon-bullet'
      // },
     

    
    ]
  },
  {
    name: 'Analyse par employé',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Rendement par employé',
        url: '/buttons/Rendementparemploye',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Temps de travail par employé',
        url: '/buttons/Tempsdetravailparemploye',
        icon: 'nav-icon-bullet'
      },
      // {
      //   name: ' * ',
      //   url: '/buttons/button-groups',
      //   icon: 'nav-icon-bullet'
      // }
      
    ]
  },
  {
    name: 'Analyse des machines',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Performance par famille',
        url: '/forms/Performance-par-famille',
        icon: 'nav-icon-bullet'
      },
      // {
      //   name: 'Select',
      //   url: '/forms/select',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Checks & Radios',
      //   url: '/forms/checks-radios',
      //   icon: 'nav-icon-bullet'
      // },
     
    ]
  },
  // {
  //   name: 'Charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   url: '/charts'
  // },
  {
    name: 'Gestion des statistiques',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      // {
      //   name: 'CoreUI Free',
      //   url: '/icons/coreui-icons',
      //   icon: 'nav-icon-bullet',
      //   badge: {
      //     color: 'success',
      //     text: 'FREE'
      //   }
      // },
      // {
      //   name: 'CoreUI Flags',
      //   url: '/icons/flags',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'CoreUI Brands',
      //   url: '/icons/brands',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Update',
      //   url: '/icons/update',
      //   icon: 'nav-icon-bullet'
      // },
      {
        name: 'List des statistiques',
        url: '/icons/list',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/5.x/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
  // }
];
