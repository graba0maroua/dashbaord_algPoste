"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Building2, AlertTriangle, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import MapComponent from "@/components/MapWilaya"

// Sample data for Chlef wilaya
const chlefBureaux = [
  {
    code: "2419",
    comptableCode: "2059.0",
    name: "OULED FETTI",
    lat: 36.1110000610352,
    lng: 1.06289994716644,
    wilaya: "Chlef",
  },
  {
    code: "2410",
    comptableCode: "2074.0",
    name: "OULED BERRADJAH",
    lat: 36.1525993347168,
    lng: 1.00279998779297,
    wilaya: "Chlef",
  },
  {
    code: "2202",
    comptableCode: "2034.0",
    name: "BIR SAF SAF",
    lat: 36.2048988342285,
    lng: 1.59270000457764,
    wilaya: "Chlef",
  },
  {
    code: "2404",
    comptableCode: "2083.0",
    name: "BORDJ BAAL",
    lat: 36.2778015136719,
    lng: 0.845399975776672,
    wilaya: "Chlef",
  },
  {
    code: "2316",
    comptableCode: "2065.0",
    name: "TALASSA",
    lat: 36.4266014099121,
    lng: 1.09080004692078,
    wilaya: "Chlef",
  },
  {
    code: "2204",
    comptableCode: "2053.0",
    name: "PETIT BARRAGE",
    lat: 36.089298248291,
    lng: 1.59150004386902,
    wilaya: "Chlef",
  },
  {
    code: "2215",
    comptableCode: "2055.0",
    name: "CAPER",
    lat: 36.1617012023926,
    lng: 1.17789995670319,
    wilaya: "Chlef",
  },
  {
    code: "2502",
    comptableCode: "2047.0",
    name: "KECHACHDA",
    lat: 36.3545989990234,
    lng: 1.26859998703003,
    wilaya: "Chlef",
  },
  {
    code: "2326",
    comptableCode: "2093.0",
    name: "HAI EL FELLAGUIA",
    lat: 36.3395004272461,
    lng: 1.40209996700287,
    wilaya: "Chlef",
  },
  {
    code: "2220",
    comptableCode: "2077.0",
    name: "OULED BOUALI",
    lat: 36.2092018127441,
    lng: 1.4536999464035,
    wilaya: "Chlef",
  },
  {
    code: "2207",
    comptableCode: "2031.0",
    name: "HARCHOUN",
    lat: 36.111499786377,
    lng: 1.50510001182556,
    wilaya: "Chlef",
  },
  {
    code: "2403",
    comptableCode: "2069.0",
    name: "BENI OUAZENE",
    lat: 35.9870986938477,
    lng: 1.31429994106293,
    wilaya: "Chlef",
  },
  {
    code: "2302",
    comptableCode: "2060.0",
    name: "MOUSSADEK",
    lat: 36.3543014526367,
    lng: 1.00849997997284,
    wilaya: "Chlef",
  },
  {
    code: "2203",
    comptableCode: "2020.0",
    name: "CHETTIA VSA",
    lat: 36.1864013671875,
    lng: 1.25020003318787,
    wilaya: "Chlef",
  },
  {
    code: "2406",
    comptableCode: "2028.0",
    name: "EL-ATMANIA",
    lat: 36.0185012817383,
    lng: 1.16149997711182,
    wilaya: "Chlef",
  },
  {
    code: "2429",
    comptableCode: "2096.0",
    name: "LOCALITE D'AIN SERAGUE,HERENFA",
    lat: 36.2436981201172,
    lng: 1.05659997463226,
    wilaya: "Chlef",
  },
  {
    code: "2428",
    comptableCode: "2095.0",
    name: "CENTRE VILLE D'AIN MERANE,CHLEF",
    lat: 36.1633987426758,
    lng: 0.981100022792816,
    wilaya: "Chlef",
  },
  {
    code: "2321",
    comptableCode: "2081.0",
    name: "KAHLOUL",
    lat: 36.4203987121582,
    lng: 1.2360999584198,
    wilaya: "Chlef",
  },
  {
    code: "2303",
    comptableCode: "2039.0",
    name: "BENAIRIA",
    lat: 36.3550987243652,
    lng: 1.37580001354218,
    wilaya: "Chlef",
  },
  {
    code: "2307",
    comptableCode: "2070.0",
    name: "BREIRA",
    lat: 36.4490013122559,
    lng: 1.61539995670319,
    wilaya: "Chlef",
  },
  {
    code: "2110",
    comptableCode: "2022.0",
    name: "ZONE 3",
    lat: 36.1369018554688,
    lng: 1.30490005016327,
    wilaya: "Chlef",
  },
  {
    code: "2117",
    comptableCode: "2016.0",
    name: "ZONE 2",
    lat: 36.1549987792969,
    lng: 1.35239994525909,
    wilaya: "Chlef",
  },
  {
    code: "2115",
    comptableCode: "2057.0",
    name: "HAY CHEGGA",
    lat: 36.1920013427734,
    lng: 1.34669995307922,
    wilaya: "Chlef",
  },
  {
    code: "2123",
    comptableCode: "2098.0",
    name: "RN N°04",
    lat: 36.1558532714844,
    lng: 1.30460274219513,
    wilaya: "Chlef",
  },
  {
    code: "2430",
    comptableCode: "2097.0",
    name: "DHARIDJ",
    lat: 36.0853538513184,
    lng: 1.23935604095459,
    wilaya: "Chlef",
  },
]

const exportToCSV = (data: any[], filename: string) => {
  const headers = ["N°", "Code Comptable", "Nom de Bureau", "Coordonnées", "État"]
  const csvContent = [
    headers.join(","),
    ...data.map((row, index) =>
      [
        index + 1,
        row.comptableCode,
        `"${row.name}"`,
        `"${row.lat.toFixed(4)}, ${row.lng.toFixed(4)}"`,
        row.state === "safe" ? "Sûr" : row.state === "moderate" ? "Modéré" : "Danger",
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportToPDF = (data: any[], wilaya: string) => {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bureaux de Poste - ${wilaya}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .safe { color: #16a34a; font-weight: bold; }
        .moderate { color: #ea580c; font-weight: bold; }
        .danger { color: #dc2626; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Bureaux de Poste - ${wilaya}</h1>
      <p>Date d'export: ${new Date().toLocaleDateString("fr-FR")}</p>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Code Comptable</th>
            <th>Nom de Bureau</th>
            <th>Coordonnées</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (bureau, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${bureau.comptableCode}</td>
              <td>${bureau.name}</td>
              <td>${bureau.lat.toFixed(4)}, ${bureau.lng.toFixed(4)}</td>
              <td class="${bureau.state}">
                ${bureau.state === "safe" ? "Sûr" : bureau.state === "moderate" ? "Modéré" : "Danger"}
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
  printWindow.print()
}

// Generate random states for demonstration
const generateBureauState = (code: string) => {
  const hash = code.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
  const states = ["safe", "moderate", "danger"]
  return states[hash % 3]
}

const wilayasWithCodes = [
  { code: "01", name: "Adrar" },
  { code: "02", name: "Chlef" },
  { code: "03", name: "Laghouat" },
  { code: "04", name: "Oum El Bouaghi" },
  { code: "05", name: "Batna" },
  { code: "06", name: "Béjaïa" },
  { code: "07", name: "Biskra" },
  { code: "08", name: "Béchar" },
  { code: "09", name: "Blida" },
  { code: "10", name: "Bouira" },
  { code: "11", name: "Tamanrasset" },
  { code: "12", name: "Tébessa" },
  { code: "13", name: "Tlemcen" },
  { code: "14", name: "Tiaret" },
  { code: "15", name: "Tizi Ouzou" },
  { code: "16", name: "Alger" },
  { code: "17", name: "Djelfa" },
  { code: "18", name: "Jijel" },
  { code: "19", name: "Sétif" },
  { code: "20", name: "Saïda" },
  { code: "21", name: "Skikda" },
  { code: "22", name: "Sidi Bel Abbès" },
  { code: "23", name: "Annaba" },
  { code: "24", name: "Guelma" },
  { code: "25", name: "Constantine" },
  { code: "26", name: "Médéa" },
  { code: "27", name: "Mostaganem" },
  { code: "28", name: "M'Sila" },
  { code: "29", name: "Mascara" },
  { code: "30", name: "Ouargla" },
  { code: "31", name: "Oran" },
  { code: "32", name: "El Bayadh" },
  { code: "33", name: "Illizi" },
  { code: "34", name: "Bordj Bou Arréridj" },
  { code: "35", name: "Boumerdès" },
  { code: "36", name: "El Tarf" },
  { code: "37", name: "Tindouf" },
  { code: "38", name: "Tissemsilt" },
  { code: "39", name: "El Oued" },
  { code: "40", name: "Khenchela" },
  { code: "41", name: "Souk Ahras" },
  { code: "42", name: "Tipaza" },
  { code: "43", name: "Mila" },
  { code: "44", name: "Aïn Defla" },
  { code: "45", name: "Naâma" },
  { code: "46", name: "Aïn Témouchent" },
  { code: "47", name: "Ghardaïa" },
  { code: "48", name: "Relizane" },
  { code: "49", name: "Timimoun" },
  { code: "50", name: "Bordj Badji Mokhtar" },
  { code: "51", name: "Ouled Djellal" },
  { code: "52", name: "Béni Abbès" },
  { code: "53", name: "In Salah" },
  { code: "54", name: "In Guezzam" },
  { code: "55", name: "Touggourt" },
  { code: "56", name: "Djanet" },
  { code: "57", name: "El M'Ghair" },
  { code: "58", name: "El Meniaa" },
]

export default function WilayaSupervision() {
  const [selectedWilaya, setSelectedWilaya] = useState("Chlef")
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)

  // For demo purposes, we'll use Chlef data for all wilayas
  const bureaux = useMemo(() => {
    return chlefBureaux.map((bureau) => ({
      ...bureau,
      state: generateBureauState(bureau.code),
      wilaya: selectedWilaya,
    }))
  }, [selectedWilaya])

  const filteredBureaux = useMemo(() => {
    return bureaux.filter((bureau) => {
      const matchesSearch =
        bureau.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bureau.code.includes(searchTerm) ||
        bureau.comptableCode.includes(searchTerm)

      const matchesState = stateFilter === "all" || bureau.state === stateFilter

      return matchesSearch && matchesState
    })
  }, [bureaux, searchTerm, stateFilter])

  const paginatedBureaux = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredBureaux.slice(startIndex, startIndex + pageSize)
  }, [filteredBureaux, currentPage, pageSize])

  const totalPages = Math.ceil(filteredBureaux.length / pageSize)

  const stats = useMemo(() => {
    const safe = filteredBureaux.filter((b) => b.state === "safe").length
    const moderate = filteredBureaux.filter((b) => b.state === "moderate").length
    const danger = filteredBureaux.filter((b) => b.state === "danger").length
    return { safe, moderate, danger, total: filteredBureaux.length }
  }, [filteredBureaux])

  const getStateIcon = (state: string) => {
    switch (state) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "moderate":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "danger":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStateBadge = (state: string) => {
    switch (state) {
      case "safe":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sûr</Badge>
      case "moderate":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Modéré</Badge>
      case "danger":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Danger</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Simplified Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Supervision des Wilayas</h1>
              <p className="text-gray-600 mt-1">Surveillance des bureaux de poste par wilaya</p>
            </div>
            <div className="w-full md:w-[300px]">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-transparent"
                  >
                    {selectedWilaya
                      ? `${wilayasWithCodes.find((w) => w.name === selectedWilaya)?.code} - ${selectedWilaya}`
                      : "Sélectionner une wilaya..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Rechercher par nom ou code..." />
                    <CommandList>
                      <CommandEmpty>Aucune wilaya trouvée.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {wilayasWithCodes.map((wilaya) => (
                          <CommandItem
                            key={wilaya.code}
                            value={`${wilaya.code} ${wilaya.name}`}
                            onSelect={() => {
                              setSelectedWilaya(wilaya.name)
                              setCurrentPage(1)
                              setOpen(false)
                            }}
                          >
                            <span className="font-mono text-sm text-gray-500 mr-2">{wilaya.code}</span>
                            {wilaya.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bureaux</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Bureaux de poste dans {selectedWilaya}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">État Sûr</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.safe}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.safe / stats.total) * 100) : 0}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">État Modéré</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.moderate}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.moderate / stats.total) * 100) : 0}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">État Danger</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.danger}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.danger / stats.total) * 100) : 0}% du total
              </p>
            </CardContent>
          </Card>
        </div>

          {/* Interactive Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Carte Interactive - {selectedWilaya}
              </CardTitle>
              <CardDescription>Localisation des bureaux de poste avec état en temps réel</CardDescription>
            </CardHeader>
            <CardContent>
              <MapComponent bureaux={bureaux} />
            </CardContent>
          </Card>
        {/* Bureaux Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Bureaux de Poste - {selectedWilaya}
            </CardTitle>
            <CardDescription>Liste complète des bureaux de poste avec leur état de caisse</CardDescription>

            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un bureau..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Filter className="h-4 w-4" />
                      Filtrer
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setStateFilter("all")
                        setCurrentPage(1)
                      }}
                    >
                      Tous les états
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setStateFilter("safe")
                        setCurrentPage(1)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Sûr
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setStateFilter("moderate")
                        setCurrentPage(1)
                      }}
                    >
                      <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
                      Modéré
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setStateFilter("danger")
                        setCurrentPage(1)
                      }}
                    >
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      Danger
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Exporter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => exportToCSV(filteredBureaux, `bureaux-${selectedWilaya}.csv`)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Exporter CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportToPDF(filteredBureaux, selectedWilaya)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Exporter PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">N°</TableHead>
                    <TableHead>Code Comptable</TableHead>
                    <TableHead>Nom de Bureau</TableHead>
                    <TableHead>Coordonnées</TableHead>
                    <TableHead>État</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBureaux.map((bureau, index) => (
                    <TableRow key={bureau.code}>
                      <TableCell className="font-medium text-gray-500">
                        {(currentPage - 1) * pageSize + index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{bureau.comptableCode}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={bureau.name}>
                          {bureau.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex flex-col">
                          <span>Lat: {bureau.lat.toFixed(4)}</span>
                          <span>Lng: {bureau.lng.toFixed(4)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStateIcon(bureau.state)}
                          {getStateBadge(bureau.state)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            alert(
                              `Détails pour ${bureau.name}\nCode: ${bureau.code}\nCoordonnées: ${bureau.lat.toFixed(4)}, ${bureau.lng.toFixed(4)}`,
                            )
                          }}
                        >
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredBureaux.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucun bureau trouvé pour les critères de recherche.
              </div>
            )}

            {/* Pagination */}
            {filteredBureaux.length > 0 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Lignes par page</p>
                  <Select
                    value={`${pageSize}`}
                    onValueChange={(value) => {
                      setPageSize(Number(value))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[5, 10, 20, 30, 50].map((size) => (
                        <SelectItem key={size} value={`${size}`}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} sur {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0 bg-transparent"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0 bg-transparent"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
