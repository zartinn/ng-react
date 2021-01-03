import { lazy } from 'react';

const Home  = lazy(() => import('./components/content/home/Home')) ;
const About  = lazy(() => import('./components/content/about/About')) ;
const Lab  = lazy(() => import('./components/content/lab/Lab')) ;
const Contact  = lazy(() => import('./components/content/contact/Contact')) ;
const Portfolio  = lazy(() => import('./components/content/portfolio/Portfolio')) ;
const Resume  = lazy(() => import('./components/content/resume/Resume')) ;

export const routes = [
    { path: '/home', component: Home },
    { path: '/about', component: About },
    { path: '/resume', component: Resume }, 
    { path: '/lab', component: Lab },
    { path: '/portfolio', component: Portfolio },
    { path: '/contact', component: Contact },
];
