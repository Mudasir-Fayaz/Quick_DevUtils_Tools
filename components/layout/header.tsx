'use client'

import { Button } from '../ui/button'
import { Menu, Moon, MoveLeft, Search, Sun } from 'lucide-react'
import { Input } from '../ui/input'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { toggleSidebar, toggleModal } from '@/lib/features/uiSlice'
import { useTheme } from 'next-themes'
import { useRef } from 'react'
import { setSearchTerm } from '@/lib/features/searchSlice';
import Link from 'next/link'
import { SupportMeButton } from './support-me'




const Header = () => {
    const {theme, setTheme} = useTheme();
    const dispatch = useAppDispatch();
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
    // const toolActive = useAppSelector((state) => state.ui.toolActive);
const searchInputRef = useRef<HTMLInputElement>(null)
const searchTerm = useAppSelector((state) => state.search.searchTerm);

const slug = useAppSelector((state) => state.activeTool.slug);
 
    const handleSearchFocus = () => {
if(slug){
dispatch(toggleModal())
searchInputRef.current?.blur();
}
    }
  
    const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    }


return (<header className="bg-background border-b">
<div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center md:h-16">
  <div className="flex items-center justify-between mb-2 md:mb-0">
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="icon" onClick={() => dispatch(toggleSidebar())} className='p-2'>
       { sidebarOpen ? <MoveLeft className='h-4 w-4'/> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <Link href='/'>
      
      <div className="font-bold text-lg">Quick DevUtils</div>
      </Link>
<SupportMeButton />
    </div>
   
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="md:hidden"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  </div>
  <div className="flex items-center justify-between md:ml-auto">
    <div className="relative flex-1">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tools..."
        className="pl-8 w-full"
        value={searchTerm}
        onChange={handleSearchQuery}
        onFocus={handleSearchFocus}
        ref={searchInputRef}
      />
    </div>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="ml-4 hidden md:flex"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  </div>
</div>
</header>
  )
}

export default Header


