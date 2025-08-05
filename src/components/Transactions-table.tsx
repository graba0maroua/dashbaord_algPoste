"use client"

import { useState, useMemo } from "react"
import { TransactionData } from "@/data/bureau-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

interface TransactionTableProps {
  data: TransactionData[]
  bureauName: string
}

const ITEMS_PER_PAGE = 10

export function TransactionTable({ data, bureauName }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.code_comptable.toString().includes(searchTerm.toLowerCase()) ||
        item.bureau_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.wilaya.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.includes(searchTerm) ||
        item.montant.toString().includes(searchTerm)

      return matchesSearch
    })
  }, [data, searchTerm])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to first page when search changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const exportToCSV = () => {
    const headers = ["Date", "Code Comptable", "Bureau", "Wilaya", "Type", "Montant (DA)", "Nombre"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map(row => [
        row.date,
        row.code_comptable,
        `"${row.bureau_name}"`,
        `"${row.wilaya}"`,
        `"${row.type}"`,
        row.montant,
        row.nombre
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `historique_${bureauName.replace(/\s+/g, "_")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Historique - ${bureauName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              h1 { color: #333; }
            </style>
          </head>
          <body>
            <h1>Historique des Transactions - ${bureauName}</h1>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Code Comptable</th>
                  <th>Bureau</th>
                  <th>Wilaya</th>
                  <th>Type</th>
                  <th>Montant (DA)</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                ${filteredData.map(row => `
                  <tr>
                    <td>${row.date}</td>
                    <td>${row.code_comptable}</td>
                    <td>${row.bureau_name}</td>
                    <td>${row.wilaya}</td>
                    <td>${row.type}</td>
                    <td>${row.montant.toLocaleString()}</td>
                    <td>${row.nombre}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Historique des Transactions
        </CardTitle>
        <CardDescription>
          Bureau: {bureauName} • {filteredData.length} transaction(s) trouvée(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par code, bureau, wilaya, date ou montant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button onClick={exportToPDF} variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Code Comptable</TableHead>
                <TableHead>Bureau</TableHead>
                <TableHead>Wilaya</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Montant (DA)</TableHead>
                <TableHead className="text-right">Nombre</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.code_comptable}
                    </TableCell>
                    <TableCell>{transaction.bureau_name}</TableCell>
                    <TableCell>{transaction.wilaya}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.montant.toLocaleString()} DA
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.nombre}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Affichage {startIndex + 1} à {Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)} sur {filteredData.length} résultats
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
