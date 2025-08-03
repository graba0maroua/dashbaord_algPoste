"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Table, BarChart3, TrendingUp, Activity } from "lucide-react"
import { WilayasTable } from "./wilayas-table"
import { StatisticsCharts } from "./statistics-charts"
import Navbar from "./Navbar"
import { OverviewCards } from "./OverviewCards"
import { AlgeriaMap } from "./Map"

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("carte")

  return (
    <div className="w-full">
      {/* Navbar with integrated tabs */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile Tabs - Show below navbar on mobile */}
      <div className="md:hidden border-b bg-background">
        <div className="container mx-auto px-4 py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="carte" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Carte</span>
              </TabsTrigger>
              <TabsTrigger value="tableau" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                <span>Table</span>
              </TabsTrigger>
              <TabsTrigger value="statistiques" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Stats</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Carte Interactive Tab */}
          <TabsContent value="carte" className="space-y-6 mt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Carte Interactive</h1>
                <p className="text-muted-foreground">Visualisation géographique des états d'urgence par wilaya</p>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <Activity className="h-3 w-3 mr-1" />
                Temps Réel
              </Badge>
            </div>

            {/* Overview Cards */}
            <OverviewCards />

            {/* Interactive Map */}
            <AlgeriaMap />
          </TabsContent>

          {/* Tableau Tab */}
          <TabsContent value="tableau" className="space-y-6 mt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tableau des Wilayas</h1>
                <p className="text-muted-foreground">
                  Liste détaillée de toutes les wilayas avec leurs états et statistiques
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">48 Wilayas</Badge>
                <Badge variant="destructive">6 Critiques</Badge>
              </div>
            </div>

            <WilayasTable />
          </TabsContent>

          {/* Statistiques Tab */}
          <TabsContent value="statistiques" className="space-y-6 mt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Statistiques & Analyses</h1>
                <p className="text-muted-foreground">Graphiques et analyses détaillées des données de sécurité</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Tendances
                </Badge>
              </div>
            </div>

            <StatisticsCharts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
