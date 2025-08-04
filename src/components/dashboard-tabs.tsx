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
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Vue Nationale </h1>
                <p className="text-muted-foreground">Visualisation géographique des états d'urgence par wilaya</p>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <Activity className="h-3 w-3 mr-1" />
                Temps Réel
              </Badge>
            </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="carte" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Carte geographique</span>
          </TabsTrigger>
          <TabsTrigger value="tableau" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            <span>Table de données</span>
          </TabsTrigger>
          <TabsTrigger value="statistiques" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Statistiques </span>
          </TabsTrigger>
        </TabsList>
          {/* Carte Tab */}
          <TabsContent value="carte" className="space-y-6 mt-0">
            <OverviewCards />
            <AlgeriaMap />
          </TabsContent>

          {/* Table Tab */}
          <TabsContent value="tableau" className="space-y-6 mt-0">
           
            <WilayasTable />
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="statistiques" className="space-y-6 mt-0">
           
            <StatisticsCharts />
          </TabsContent>
      </Tabs>
        </div>
    </div>
  )
}
