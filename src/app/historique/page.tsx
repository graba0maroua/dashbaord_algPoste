"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Building2, Search, Calendar } from 'lucide-react'
import { allBureauxData, BureauData, generateTransactionData, TransactionData } from "@/data/bureau-data"
import { TransactionTable } from "@/components/Transactions-table"

export default function HistoriquePage() {
  const [selectedBureau, setSelectedBureau] = useState<BureauData | null>(null)
  const [codeComptableInput, setCodeComptableInput] = useState("1101")
  const [startDate, setStartDate] = useState("2024-01-01")
  const [endDate, setEndDate] = useState("2024-12-31")
  const [transactionData, setTransactionData] = useState<TransactionData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with default bureau (1101)
  useEffect(() => {
    const defaultBureau = allBureauxData.find(b => b.code_comptable === 1101)
    if (defaultBureau) {
      setSelectedBureau(defaultBureau)
      setTransactionData(generateTransactionData(defaultBureau, startDate, endDate))
    }
  }, [])

  const handleSearch = async () => {
    setIsLoading(true)
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const code = parseInt(codeComptableInput)
    const bureau = allBureauxData.find(b => b.code_comptable === code)
    
    if (bureau) {
      setSelectedBureau(bureau)
      setTransactionData(generateTransactionData(bureau, startDate, endDate))
    } else {
      setSelectedBureau(null)
      setTransactionData([])
    }
    
    setIsLoading(false)
  }

  const handleDateRangeChange = () => {
    if (selectedBureau) {
      setTransactionData(generateTransactionData(selectedBureau, startDate, endDate))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Historique</h1>
        <p className="text-muted-foreground text-lg">
          Consultez l'historique des transactions par bureau de poste et période
        </p>
      </div>

      {/* Search Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Recherche
          </CardTitle>
          <CardDescription>
            Recherchez les transactions par code comptable et période
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bureau Search */}
          <div className="space-y-2">
            <Label htmlFor="code-comptable">Code Comptable du Bureau</Label>
            <div className="flex gap-2">
              <Input
                id="code-comptable"
                value={codeComptableInput}
                onChange={(e) => setCodeComptableInput(e.target.value)}
                placeholder="Ex: 1101"
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Recherche..." : "Rechercher"}
              </Button>
            </div>
            {!selectedBureau && codeComptableInput && (
              <p className="text-sm text-red-600">
                Aucun bureau trouvé avec le code comptable {codeComptableInput}
              </p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date de début
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min="2024-01-01"
                max="2025-12-31"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date de fin
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min="2024-01-01"
                max="2025-12-31"
              />
            </div>
          </div>

          <Button onClick={handleDateRangeChange} variant="outline" className="w-full">
            Appliquer la période
          </Button>

          {/* Selected Bureau Info */}
          {selectedBureau && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-start gap-2">
                <Building2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">{selectedBureau.address}</p>
                  <p className="text-sm text-green-600">
                    Code: {selectedBureau.code_comptable} • {selectedBureau.wilaya_name}
                  </p>
                  <p className="text-sm text-green-600">
                    Période: {startDate} au {endDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Table */}
      {selectedBureau && transactionData.length > 0 && (
        <TransactionTable
          data={transactionData}
          bureauName={selectedBureau.address}
        />
      )}

      {selectedBureau && transactionData.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Aucune transaction trouvée pour cette période
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
