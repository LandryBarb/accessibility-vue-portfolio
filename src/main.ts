import { createApp } from 'vue'
import './styles/portfolio/global.scss'
import App from './App.vue'
import { router } from './router'
import { MotionPlugin } from '@vueuse/motion'




createApp(App).use(router).use(MotionPlugin).mount('#app')
