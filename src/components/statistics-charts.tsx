"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Users, Building2, Activity } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const urgencyDistribution = [
  { name: "Critique", value: 7, color: "#ef4444" },
  { name: "Attention", value: 16, color: "#f97316" },
  { name: "Sûr", value: 25, color: "#22c55e" },
]

const monthlyTrends = [
  { month: "Jan", critical: 5, warning: 12, safe: 31 },
  { month: "Fév", critical: 6, warning: 14, safe: 28 },
  { month: "Mar", critical: 8, warning: 15, safe: 25 },
  { month: "Avr", critical: 7, warning: 16, safe: 25 },
  { month: "Mai", critical: 7, warning: 16, safe: 25 },
]

const regionData = [
  { region: "Nord", incidents: 145, bureaux: 280 },
  { region: "Centre", incidents: 89, bureaux: 195 },
  { region: "Est", incidents: 67, bureaux: 156 },
  { region: "Ouest", incidents: 78, bureaux: 142 },
  { region: "Sud", incidents: 23, bureaux: 87 },
]

const incidentTypes = [
  { type: "Sécuritaire", count: 156, percentage: 38 },
  { type: "Administratif", count: 98, percentage: 24 },
  { type: "Social", count: 87, percentage: 21 },
  { type: "Économique", count: 69, percentage: 17 },
]

export function StatisticsCharts() {
  return (
    <div className="mt-4 space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">402</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-red-500" />
              +12% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Population Affectée</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2M</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-green-500" />
              -3% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bureaux Actifs</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">860</div>
            <p className="text-xs text-muted-foreground">
              <Activity className="inline h-3 w-3 text-blue-500" />
              Stable
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Résolution</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              +5% ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Urgency Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des États d'Urgence</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                critical: { label: "Critique", color: "#ef4444" },
                warning: { label: "Attention", color: "#f97316" },
                safe: { label: "Sûr", color: "#22c55e" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={urgencyDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {urgencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution Mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                critical: { label: "Critique", color: "#ef4444" },
                warning: { label: "Attention", color: "#f97316" },
                safe: { label: "Sûr", color: "#22c55e" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="critical" stroke="#ef4444" name="Critique" />
                  <Line type="monotone" dataKey="warning" stroke="#f97316" name="Attention" />
                  <Line type="monotone" dataKey="safe" stroke="#22c55e" name="Sûr" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Regional Analysis Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Analyse par Région</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                incidents: { label: "Incidents", color: "#ef4444" },
                bureaux: { label: "Bureaux", color: "#3b82f6" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
                  <Bar dataKey="bureaux" fill="#3b82f6" name="Bureaux" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Incident Types */}
        <Card>
          <CardHeader>
            <CardTitle>Types d'Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidentTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">{type.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{type.count}</span>
                    <Badge variant="outline">{type.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Wilayas les Plus Critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Alger", "Oran", "Tizi Ouzou", "Blida", "Béjaïa"].map((wilaya, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{wilaya}</span>
                  <Badge variant="destructive" className="text-xs">
                    {45 - index * 8} incidents
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Incidents résolus</span>
                <span className="font-medium text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Temps de réponse moyen</span>
                <span className="font-medium">2.3h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bureaux mobilisés</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Satisfaction</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alertes Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Alger - Incident majeur</p>
                  <p className="text-xs text-muted-foreground">Il y a 2h</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Oran - Surveillance renforcée</p>
                  <p className="text-xs text-muted-foreground">Il y a 4h</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Constantine - Situation normalisée</p>
                  <p className="text-xs text-muted-foreground">Il y a 6h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
