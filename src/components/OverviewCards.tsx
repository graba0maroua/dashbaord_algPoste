"use client"
import { AlertTriangle, MapPin, Building2, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OverviewCards() {
  // Mock data
  const criticalCities = ["Alger", "Oran", "Blida", "Sidi Bel Abbès"]
  const bureauxEnRisque = 127
  const bureauPlusRisque = { name: "Bureau Central Alger", code: "16200" }
  const algerCriticalPercentage = 78

  return (
    <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Most Critical City */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wilaya la Plus Critique</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">Alger</div>
          <p className="text-xs text-muted-foreground">{algerCriticalPercentage}% état critique</p>
          <div className="mt-2 h-2 bg-muted rounded-full">
            <div
              className="h-2 bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${algerCriticalPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Critical Cities Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wilayas en État Critique</CardTitle>
          <MapPin className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{criticalCities.length}</div>
          <p className="text-xs text-muted-foreground">Wilayas nécessitent une attention immédiate</p>
          <div className="mt-2 flex gap-1 flex-wrap">
            {criticalCities.slice(0, 3).map((city, index) => (
              <Badge key={index} variant="outline" className="text-xs text-red-600 border-red-200">
                {city}
              </Badge>
            ))}
            {criticalCities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{criticalCities.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Bureaux en Risque */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bureaux de poste en Risque</CardTitle>
          <Building2 className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{bureauxEnRisque}</div>
          <p className="text-xs text-muted-foreground">bureaux de poste nécessitent une surveillance</p>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-200">
              Surveillance Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Bureau le Plus à Risque */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bureau de poste le Plus à Risque</CardTitle>
          <Shield className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-red-600">{bureauPlusRisque.name}</div>
          <p className="text-xs text-muted-foreground mb-2">
            Code comptable: <span className="text-red-500 font-medium">{bureauPlusRisque.code}</span>
          </p>
          <Badge variant="outline" className="text-xs text-red-600 border-red-200">
            Priorité Maximale
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
