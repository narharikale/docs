'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Home, FileText, BookOpen, Code, Layers } from 'lucide-react'

interface NavItem {
  id: string
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
  children?: NavItem[]
  expanded?: boolean
}

// Sample hierarchical navigation data
const navigationData: NavItem[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: BookOpen,
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    href: '/docs/core-concepts',
    icon: Layers,
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    href: '/docs/api-reference',
    icon: Code,
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    href: '/docs/best-practices',
    icon: FileText,
  },
]

interface NavigationItemProps {
  item: NavItem
  level: number
  isExpanded: boolean
  onToggle: (id: string) => void
  onNavigate: (href: string) => void
  isActive: boolean
}

function NavigationItem({ item, level, isExpanded, onToggle, onNavigate, isActive }: NavigationItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const isNested = level > 0

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      onToggle(item.id)
    } else if (item.href) {
      onNavigate(item.href)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (hasChildren) {
        onToggle(item.id)
      } else if (item.href) {
        onNavigate(item.href)
      }
    }
    // Arrow key navigation
    if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
      onToggle(item.id)
    }
    if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
      onToggle(item.id)
    }
  }

  return (
    <li>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start text-left font-normal transition-all duration-200",
          level === 0 ? "px-3 py-2" : level === 1 ? "pl-6 pr-3 py-1.5" : "pl-9 pr-3 py-1",
          level === 0 ? "text-sm" : "text-sm",
          isActive 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
          !isNested && "mb-1",
          hasChildren && "group"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        asChild={!hasChildren}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-haspopup={hasChildren ? "true" : undefined}
      >
        {hasChildren ? (
          <div className="flex items-center w-full">
            {item.icon && level === 0 && (
              <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
            )}
            <span className="flex-1 truncate">{item.title}</span>
            {isExpanded ? (
              <ChevronDown className="ml-auto h-4 w-4 flex-shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0 transition-transform duration-200" />
            )}
          </div>
        ) : (
          <a href={item.href} className="flex items-center w-full">
            {item.icon && level === 0 && (
              <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
            )}
            <span className="truncate">{item.title}</span>
          </a>
        )}
      </Button>

      {/* Nested items with smooth expand/collapse animation */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ul className={cn("space-y-0.5", level === 0 ? "mt-1 mb-2" : "mt-0.5")}>
            {item.children?.map((child) => (
              <NavigationItem
                key={child.id}
                item={child}
                level={level + 1}
                isExpanded={child.expanded || false}
                onToggle={onToggle}
                onNavigate={onNavigate}
                isActive={false}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [navItems, setNavItems] = useState<NavItem[]>(navigationData)
  const navRef = useRef<HTMLElement>(null)

  // Handle expand/collapse for navigation items
  const handleToggle = (id: string) => {
    const updateItems = (items: NavItem[]): NavItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, expanded: !item.expanded }
        }
        if (item.children) {
          return { ...item, children: updateItems(item.children) }
        }
        return item
      })
    }
    setNavItems(updateItems(navItems))
  }

  // Handle navigation
  const handleNavigate = (href: string) => {
    router.push(href)
  }

  // Update active state based on current pathname
  useEffect(() => {
    const updateActiveState = (items: NavItem[]): NavItem[] => {
      return items.map(item => ({
        ...item,
        active: item.href === pathname,
        children: item.children ? updateActiveState(item.children) : undefined
      }))
    }
    setNavItems(updateActiveState(navigationData))
  }, [pathname])

  // Smooth scroll to active item on mount
  useEffect(() => {
    const activeElement = navRef.current?.querySelector('[aria-current="page"]')
    if (activeElement) {
      activeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }, [])

  return (
    <nav 
      ref={navRef}
      className={cn("flex flex-col h-full", className)}
      role="navigation"
      aria-label="Documentation navigation"
    >
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Documentation
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hierarchical Navigation System
        </p>
      </div>

      {/* Navigation Items with smooth scrolling */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="p-2">
          <ul className="space-y-1" role="list">
            {navItems.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                level={0}
                isExpanded={item.expanded || false}
                onToggle={handleToggle}
                onNavigate={handleNavigate}
                isActive={item.active || false}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Footer with scroll indicator */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            v1.0.0
          </p>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-green-500 rounded-full" title="Navigation loaded"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full" title="Responsive"></div>
            <div className="w-1 h-1 bg-purple-500 rounded-full" title="Accessible"></div>
          </div>
        </div>
      </div>
    </nav>
  )
} 