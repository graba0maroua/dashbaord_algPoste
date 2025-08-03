"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, CheckCircle, XCircle, Calendar, Building2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data
const mockBureauData = {
  code_comptable: 11114,
  code_postale: 11026,
  address: "GARE ROUTIERE",
  latitude: 22.8166694641113,
  longitude: 5.48333311080933,
  wilaya_name: "Tamanrasset",
  wilaya_code: "11",
  current_cash: 7502504.5,
  last_updated: "2024-08-15T10:30:00Z",
}

const mockNext3Days = [
  {
    date: "2024-08-15",
    day: "Aujourd'hui",
    predicted_withdrawal: 3018380.5,
    real_withdrawal: 2980000,
    remaining_cash: 4484124,
    zone: "safe",
    confidence: 94.2,
    error_percentage: 1.31,
  },
  {
    date: "2024-08-16",
    day: "Demain",
    predicted_withdrawal: 2272477,
    real_withdrawal: 2210000,
    remaining_cash: 2211647,
    zone: "moderate",
    confidence: 91.8,
    error_percentage: 2.15,
  },
  {
    date: "2024-08-17",
    day: "Après-demain",
    predicted_withdrawal: 2544190,
    real_withdrawal: 2344190, 
    remaining_cash: -332543,
    zone: "danger",
    confidence: 89.5,
    error_percentage: 3.94,
  },
]


const mockPredictionData = [
  { date: "2024-08-11", xgboost: 7502504.5, nhits: 7200000, actual: 7405549 },
  { date: "2024-08-12", xgboost: 6338006, nhits: 6100000, actual: 6265500 },
  { date: "2024-08-13", xgboost: 5250000, nhits: 5400000, actual: 5100000 },
  { date: "2024-08-14", xgboost: 4650000, nhits: 4500000, actual: 4800000 },
]

export default function BureauDePostePage() {
  const [selectedModel, setSelectedModel] = useState("xgboost")
  const [selectedDate, setSelectedDate] = useState("2024-08-15")
  const [searchValue, setSearchValue] = useState("11114")

  const formatCurrency = (value: number) => {
    return (
      new Intl.NumberFormat("fr-DZ", {
        style: "decimal",
        minimumFractionDigits: 0,
      }).format(Math.abs(value)) + " DA"
    )
  }

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case "safe":
        return "text-green-700 bg-green-50 border-green-200"
      case "moderate":
        return "text-yellow-700 bg-yellow-50 border-yellow-200"
      case "danger":
        return "text-red-700 bg-red-50 border-red-200"
      default:
        return "text-gray-700 bg-gray-50 border-gray-200"
    }
  }

  const getZoneIcon = (zone: string) => {
    switch (zone) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "moderate":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "danger":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const chartData = mockPredictionData.map((item) => ({
    date: new Date(item.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
    xgboost: item.xgboost,
    nhits: item.nhits,
    actual: item.actual,
  }))

  const xgboostAccuracy = 97.7
  const nhitsAccuracy = 95.6

  return (
    <div className="min-h-screen">
      {/* Header with Simple Search */}
      <div className="bg-white border-b mt-4 border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Bureau de Poste</h1>

            <div className="flex items-center gap-3">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-36"
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Modèle:</span>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xgboost">XGBoost</SelectItem>
                    <SelectItem value="nhits">NHITS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                <span className="text-sm text-gray-600">Code Comptable:</span>

              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Code comptable (ex: 11114)"
                className="w-40"
              />

              <Button>
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Bureau Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Détails du Bureau
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500">Code Comptable</p>
                <p className="font-bold text-lg">{mockBureauData.code_comptable}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Code Postal</p>
                <p className="font-semibold text-lg">{mockBureauData.code_postale}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-semibold">{mockBureauData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Wilaya</p>
                <p className="font-semibold">
                  {mockBureauData.wilaya_name} ({mockBureauData.wilaya_code})
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Caisse Actuelle</p>
                <p className="font-semibold text-green-600 text-lg">{formatCurrency(mockBureauData.current_cash)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière MAJ</p>
                <p className="font-semibold">{new Date(mockBureauData.last_updated).toLocaleString("fr-FR")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Coordonnées</p>
                <p className="font-semibold text-sm">
                  {mockBureauData.latitude.toFixed(4)}, {mockBureauData.longitude.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Modèle Actuel</p>
                <Badge variant="outline" className="mt-1">
                  {selectedModel.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next 3 Days Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Prévisions - 3 Prochains Jours</CardTitle>
            <CardDescription>État de la caisse et prédictions de consommation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jour</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Retrait Réel</TableHead>
                  <TableHead className="text-right">Retrait Prévu</TableHead>
                  <TableHead className="text-right">Solde Restant</TableHead>
                  <TableHead className="text-center">Confiance</TableHead>
                  <TableHead className="text-center">Erreur</TableHead>
                  <TableHead className="text-center">État</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {mockNext3Days.map((day, index) => (
    <TableRow key={index} className={day.zone === "danger" ? "bg-red-50" : ""}>
      <TableCell className="font-medium">{day.day}</TableCell>
      <TableCell>{new Date(day.date).toLocaleDateString("fr-FR")}</TableCell>
      <TableCell className="text-right font-mono text-gray-700">
        {day.real_withdrawal ? formatCurrency(day.real_withdrawal) : "—"}
      </TableCell>
      <TableCell className="text-right font-mono">
        {formatCurrency(day.predicted_withdrawal)}
      </TableCell>
      <TableCell
        className={`text-right font-mono ${day.remaining_cash < 0 ? "text-red-600 font-bold" : ""}`}
      >
        {day.remaining_cash < 0 ? "-" : ""}
        {formatCurrency(day.remaining_cash)}
      </TableCell>
      <TableCell className="text-center">
        <span className="font-medium">{day.confidence}%</span>
      </TableCell>
      <TableCell className="text-center">
        <span className="font-medium text-orange-600">{day.error_percentage}%</span>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
          {getZoneIcon(day.zone)}
          <Badge className={getZoneColor(day.zone)}>{day.zone.toUpperCase()}</Badge>
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </CardContent>
        </Card>

        {/* Analysis and Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Comparaison des Modèles</CardTitle>
              <CardDescription>Performance XGBoost vs NHITS</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), ""]}
                    labelStyle={{ color: "#1e293b" }}
                    contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#64748b"
                    strokeWidth={3}
                    name="Réel"
                    strokeDasharray="5 5"
                  />
                  <Line type="monotone" dataKey="xgboost" stroke="#10b981" strokeWidth={2} name="XGBoost" />
                  <Line type="monotone" dataKey="nhits" stroke="#3b82f6" strokeWidth={2} name="NHITS" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Analyse de Performance</CardTitle>
              <CardDescription>Précision et erreurs des modèles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* XGBoost Performance */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-green-800">XGBoost</h4>
                    <Badge className="bg-green-100 text-green-800">RECOMMANDÉ</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-600">Précision</p>
                      <p className="font-bold text-lg">{xgboostAccuracy}%</p>
                    </div>
                    <div>
                      <p className="text-green-600">Erreur Moyenne</p>
                      <p className="font-bold text-lg">{(100 - xgboostAccuracy).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${xgboostAccuracy}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* NHITS Performance */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-blue-800">NHITS</h4>
                    <Badge variant="outline">ALTERNATIF</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600">Précision</p>
                      <p className="font-bold text-lg">{nhitsAccuracy}%</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Erreur Moyenne</p>
                      <p className="font-bold text-lg">{(100 - nhitsAccuracy).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${nhitsAccuracy}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommandations</CardTitle>
            <CardDescription>Actions suggérées pour la gestion de la caisse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">URGENT</h4>
                    <p className="text-sm text-red-700 mt-1">Réapprovisionnement requis avant le 17/08</p>
                    <p className="text-sm font-semibold text-red-800 mt-2">Montant: {formatCurrency(3000000)}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Modèle Optimal</h4>
                    <p className="text-sm text-green-700 mt-1">Utiliser XGBoost pour ce bureau</p>
                    <p className="text-sm font-semibold text-green-800 mt-2">Précision: {xgboostAccuracy}%</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Surveillance</h4>
                    <p className="text-sm text-blue-700 mt-1">Monitoring quotidien recommandé</p>
                    <p className="text-sm font-semibold text-blue-800 mt-2">Seuil critique: 1M DA</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
