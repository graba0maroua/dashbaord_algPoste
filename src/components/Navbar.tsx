"use client"
import { LogOut, Moon, Settings, Sun, User, MapPin, Table, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { SidebarTrigger, useSidebar } from "./ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

interface NavbarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname()

  // Check if we're on the main dashboard page
  const isMainPage = pathname === "/"

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        {/* Dashboard Tabs - Only show on main page */}
        {isMainPage && activeTab && onTabChange && (
          <Tabs value={activeTab} onValueChange={onTabChange} className="hidden md:block">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="carte" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden lg:inline">Carte Interactive</span>
                <span className="lg:hidden">Carte</span>
              </TabsTrigger>
              <TabsTrigger value="tableau" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                <span className="hidden lg:inline">Tableau</span>
                <span className="lg:hidden">Table</span>
              </TabsTrigger>
              <TabsTrigger value="statistiques" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden lg:inline">Statistiques</span>
                <span className="lg:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
          Dashboard
        </Link>

        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/avatar2.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
