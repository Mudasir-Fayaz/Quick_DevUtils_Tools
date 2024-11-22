'use client'
import dynamic from 'next/dynamic'
 
 export const SideBar = dynamic(
   () => import('./sidebar'),
   { ssr: false }
 )

 export const SearchModal = dynamic(
  () => import('./search-modal'),
  {ssr:false}
 )
 
 export const RenderTool = dynamic(
  () => import('./render'),
  {ssr:false}
 )

 export const HomePage = dynamic(
  () => import('../pages/home-page'),
  {ssr:false}
 )