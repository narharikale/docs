'use client'

import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon } from 'lucide-react'

// Theme Context
interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Sidebar Context
interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// Theme Provider Component
interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Toggle dark class on document element
    document.documentElement.classList.toggle('dark', !isDark)
  }

  React.useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }, [])

  React.useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Sidebar Component
interface SidebarProps {
  children: React.ReactNode
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  const { isOpen, close } = useSidebar()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out",
          "lg:static lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-end p-4 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={close}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Sidebar content */}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  )
}

// Header Component
interface HeaderProps {
  children?: React.ReactNode
  className?: string
}

export function Header({ children, className }: HeaderProps) {
  const { toggle } = useSidebar()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
        "lg:pl-6",
        className
      )}
    >
      {/* Left side - Mobile menu button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {children}
      </div>

      {/* Right side - Theme toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </header>
  )
}

// Main Content Component
interface MainContentProps {
  children: React.ReactNode
  className?: string
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main
      className={cn(
        "flex-1 overflow-hidden bg-white dark:bg-gray-900",
        className
      )}
    >
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </main>
  )
}

// Main Layout Component
interface MainLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  // Close sidebar on larger screens
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function MainLayout({ children, sidebar, header, className }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className={cn("flex h-screen overflow-hidden", className)}>
          {/* Sidebar */}
          {sidebar && <Sidebar>{sidebar}</Sidebar>}
          
          {/* Main area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Header */}
            {header && <Header>{header}</Header>}
            
            {/* Main content */}
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
} 