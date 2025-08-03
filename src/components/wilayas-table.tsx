"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Eye } from "lucide-react"

// Mock data for all 48 wilayas
const wilayasData = [
  { id: 1, name: "Adrar", population: 402000, urgency: "safe", bureaux: 12, incidents: 2, lastUpdate: "2024-01-15" },
  {
    id: 2,
    name: "Chlef",
    population: 1002000,
    urgency: "warning",
    bureaux: 28,
    incidents: 8,
    lastUpdate: "2024-01-15",
  },
  { id: 3, name: "Laghouat", population: 455000, urgency: "safe", bureaux: 15, incidents: 1, lastUpdate: "2024-01-15" },
  {
    id: 4,
    name: "Oum El Bouaghi",
    population: 621000,
    urgency: "warning",
    bureaux: 18,
    incidents: 5,
    lastUpdate: "2024-01-15",
  },
  {
    id: 5,
    name: "Batna",
    population: 1119000,
    urgency: "warning",
    bureaux: 32,
    incidents: 12,
    lastUpdate: "2024-01-15",
  },
  {
    id: 6,
    name: "Béjaïa",
    population: 915000,
    urgency: "critical",
    bureaux: 25,
    incidents: 18,
    lastUpdate: "2024-01-15",
  },
  { id: 7, name: "Biskra", population: 721000, urgency: "safe", bureaux: 22, incidents: 3, lastUpdate: "2024-01-15" },
  { id: 8, name: "Béchar", population: 270000, urgency: "safe", bureaux: 10, incidents: 1, lastUpdate: "2024-01-15" },
  {
    id: 9,
    name: "Blida",
    population: 1002000,
    urgency: "critical",
    bureaux: 30,
    incidents: 22,
    lastUpdate: "2024-01-15",
  },
  {
    id: 10,
    name: "Bouira",
    population: 695000,
    urgency: "warning",
    bureaux: 20,
    incidents: 7,
    lastUpdate: "2024-01-15",
  },
  {
    id: 11,
    name: "Tamanrasset",
    population: 198000,
    urgency: "safe",
    bureaux: 8,
    incidents: 0,
    lastUpdate: "2024-01-15",
  },
  {
    id: 12,
    name: "Tébessa",
    population: 648000,
    urgency: "warning",
    bureaux: 19,
    incidents: 9,
    lastUpdate: "2024-01-15",
  },
  {
    id: 13,
    name: "Tlemcen",
    population: 949000,
    urgency: "warning",
    bureaux: 27,
    incidents: 11,
    lastUpdate: "2024-01-15",
  },
  { id: 14, name: "Tiaret", population: 846000, urgency: "safe", bureaux: 24, incidents: 4, lastUpdate: "2024-01-15" },
  {
    id: 15,
    name: "Tizi Ouzou",
    population: 1127000,
    urgency: "critical",
    bureaux: 35,
    incidents: 25,
    lastUpdate: "2024-01-15",
  },
  {
    id: 16,
    name: "Alger",
    population: 2988000,
    urgency: "critical",
    bureaux: 85,
    incidents: 45,
    lastUpdate: "2024-01-15",
  },
  { id: 17, name: "Djelfa", population: 1092000, urgency: "safe", bureaux: 31, incidents: 6, lastUpdate: "2024-01-15" },
  {
    id: 18,
    name: "Jijel",
    population: 636000,
    urgency: "warning",
    bureaux: 18,
    incidents: 8,
    lastUpdate: "2024-01-15",
  },
  {
    id: 19,
    name: "Sétif",
    population: 1496000,
    urgency: "warning",
    bureaux: 42,
    incidents: 15,
    lastUpdate: "2024-01-15",
  },
  { id: 20, name: "Saïda", population: 330000, urgency: "safe", bureaux: 12, incidents: 2, lastUpdate: "2024-01-15" },
  { id: 21, name: "Skikda", population: 898000, urgency: "safe", bureaux: 26, incidents: 5, lastUpdate: "2024-01-15" },
  {
    id: 22,
    name: "Sidi Bel Abbès",
    population: 594000,
    urgency: "critical",
    bureaux: 17,
    incidents: 16,
    lastUpdate: "2024-01-15",
  },
  { id: 23, name: "Annaba", population: 609000, urgency: "safe", bureaux: 18, incidents: 3, lastUpdate: "2024-01-15" },
  {
    id: 24,
    name: "Guelma",
    population: 482000,
    urgency: "warning",
    bureaux: 14,
    incidents: 6,
    lastUpdate: "2024-01-15",
  },
  {
    id: 25,
    name: "Constantine",
    population: 938000,
    urgency: "warning",
    bureaux: 28,
    incidents: 13,
    lastUpdate: "2024-01-15",
  },
  {
    id: 26,
    name: "Médéa",
    population: 819000,
    urgency: "warning",
    bureaux: 23,
    incidents: 10,
    lastUpdate: "2024-01-15",
  },
  {
    id: 27,
    name: "Mostaganem",
    population: 737000,
    urgency: "warning",
    bureaux: 21,
    incidents: 9,
    lastUpdate: "2024-01-15",
  },
  { id: 28, name: "M'Sila", population: 991000, urgency: "safe", bureaux: 28, incidents: 7, lastUpdate: "2024-01-15" },
  { id: 29, name: "Mascara", population: 784000, urgency: "safe", bureaux: 22, incidents: 4, lastUpdate: "2024-01-15" },
  { id: 30, name: "Ouargla", population: 558000, urgency: "safe", bureaux: 16, incidents: 2, lastUpdate: "2024-01-15" },
  {
    id: 31,
    name: "Oran",
    population: 1584000,
    urgency: "critical",
    bureaux: 45,
    incidents: 28,
    lastUpdate: "2024-01-15",
  },
  {
    id: 32,
    name: "El Bayadh",
    population: 228000,
    urgency: "safe",
    bureaux: 8,
    incidents: 1,
    lastUpdate: "2024-01-15",
  },
  { id: 33, name: "Illizi", population: 54000, urgency: "safe", bureaux: 3, incidents: 0, lastUpdate: "2024-01-15" },
  {
    id: 34,
    name: "Bordj Bou Arréridj",
    population: 628000,
    urgency: "warning",
    bureaux: 18,
    incidents: 7,
    lastUpdate: "2024-01-15",
  },
  {
    id: 35,
    name: "Boumerdès",
    population: 802000,
    urgency: "critical",
    bureaux: 23,
    incidents: 19,
    lastUpdate: "2024-01-15",
  },
  { id: 36, name: "El Tarf", population: 408000, urgency: "safe", bureaux: 12, incidents: 2, lastUpdate: "2024-01-15" },
  { id: 37, name: "Tindouf", population: 58000, urgency: "safe", bureaux: 3, incidents: 0, lastUpdate: "2024-01-15" },
  {
    id: 38,
    name: "Tissemsilt",
    population: 296000,
    urgency: "safe",
    bureaux: 10,
    incidents: 1,
    lastUpdate: "2024-01-15",
  },
  {
    id: 39,
    name: "El Oued",
    population: 673000,
    urgency: "warning",
    bureaux: 19,
    incidents: 8,
    lastUpdate: "2024-01-15",
  },
  {
    id: 40,
    name: "Khenchela",
    population: 386000,
    urgency: "safe",
    bureaux: 11,
    incidents: 2,
    lastUpdate: "2024-01-15",
  },
  {
    id: 41,
    name: "Souk Ahras",
    population: 438000,
    urgency: "warning",
    bureaux: 13,
    incidents: 5,
    lastUpdate: "2024-01-15",
  },
  {
    id: 42,
    name: "Tipaza",
    population: 591000,
    urgency: "critical",
    bureaux: 17,
    incidents: 14,
    lastUpdate: "2024-01-15",
  },
  { id: 43, name: "Mila", population: 766000, urgency: "warning", bureaux: 22, incidents: 9, lastUpdate: "2024-01-15" },
  {
    id: 44,
    name: "Aïn Defla",
    population: 771000,
    urgency: "warning",
    bureaux: 22,
    incidents: 8,
    lastUpdate: "2024-01-15",
  },
  { id: 45, name: "Naâma", population: 192000, urgency: "safe", bureaux: 7, incidents: 1, lastUpdate: "2024-01-15" },
  {
    id: 46,
    name: "Aïn Témouchent",
    population: 371000,
    urgency: "warning",
    bureaux: 11,
    incidents: 4,
    lastUpdate: "2024-01-15",
  },
  {
    id: 47,
    name: "Ghardaïa",
    population: 363000,
    urgency: "safe",
    bureaux: 12,
    incidents: 2,
    lastUpdate: "2024-01-15",
  },
  {
    id: 48,
    name: "Relizane",
    population: 733000,
    urgency: "safe",
    bureaux: 21,
    incidents: 3,
    lastUpdate: "2024-01-15",
  },
]

export function WilayasTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterUrgency, setFilterUrgency] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const filteredData = wilayasData
    .filter((wilaya) => {
      const matchesSearch = wilaya.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterUrgency === "all" || wilaya.urgency === filterUrgency
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "population":
          return b.population - a.population
        case "incidents":
          return b.incidents - a.incidents
        default:
          return 0
      }
    })

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critique</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            Attention
          </Badge>
        )
      case "safe":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Sûr
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Liste des Wilayas</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une wilaya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full sm:w-64"
              />
            </div>
            <Select value={filterUrgency} onValueChange={setFilterUrgency}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les états</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
                <SelectItem value="warning">Attention</SelectItem>
                <SelectItem value="safe">Sûr</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="population">Population</SelectItem>
                <SelectItem value="incidents">Incidents</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Wilaya</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>État</TableHead>
                <TableHead>Bureaux</TableHead>
                <TableHead>Incidents</TableHead>
                <TableHead>Dernière MAJ</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((wilaya) => (
                <TableRow key={wilaya.id}>
                  <TableCell className="font-medium">{wilaya.id.toString().padStart(2, "0")}</TableCell>
                  <TableCell className="font-medium">{wilaya.name}</TableCell>
                  <TableCell>{wilaya.population.toLocaleString()}</TableCell>
                  <TableCell>{getUrgencyBadge(wilaya.urgency)}</TableCell>
                  <TableCell>{wilaya.bureaux}</TableCell>
                  <TableCell>
                    <span className={wilaya.incidents > 10 ? "text-red-600 font-medium" : ""}>{wilaya.incidents}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{wilaya.lastUpdate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Affichage de {filteredData.length} sur {wilayasData.length} wilayas
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
