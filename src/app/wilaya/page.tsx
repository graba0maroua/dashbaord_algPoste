"use client"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Building2, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function WilayaPage() {
  const searchParams = useSearchParams()
  const wilayaId = searchParams.get("id")
  const wilayaName = searchParams.get("name")

  // Mock detailed data for the selected wilaya
  const wilayaDetails = {
    id: wilayaId,
    name: wilayaName || "Tlemcen",
    population: 2988000,
    area: "273 km²",
    density: "10,950 hab/km²",
    bureaux: {
      total: 45,
      critical: 12,
      warning: 8,
      safe: 25,
    },
    communes: 57,
    lastUpdate: "2024-01-15 14:30",
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wilaya de {wilayaDetails.name}</h1>
          <p className="text-muted-foreground">
           Dernière MAJ: {wilayaDetails.lastUpdate}
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Population</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wilayaDetails.population.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">habitants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bureaux de Poste</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wilayaDetails.bureaux.total}</div>
            <p className="text-xs text-muted-foreground">bureaux actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communes</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wilayaDetails.communes}</div>
            <p className="text-xs text-muted-foreground">communes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Superficie</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wilayaDetails.area}</div>
            <p className="text-xs text-muted-foreground">{wilayaDetails.density}</p>
          </CardContent>
        </Card>
      </div>

      </div>
  )
}
