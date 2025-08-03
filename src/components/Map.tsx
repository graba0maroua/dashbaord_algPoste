"use client"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock GeoJSON data for Algeria wilayas (in real app, you'd load this from a file)
const algeriaGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: 16, name: "Alger", urgency: "critical", population: 2988000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.0, 36.8],
            [3.2, 36.8],
            [3.2, 36.6],
            [3.0, 36.6],
            [3.0, 36.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 31, name: "Oran", urgency: "critical", population: 1584000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-0.8, 35.8],
            [-0.4, 35.8],
            [-0.4, 35.5],
            [-0.8, 35.5],
            [-0.8, 35.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 25, name: "Constantine", urgency: "warning", population: 938000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [6.4, 36.4],
            [6.8, 36.4],
            [6.8, 36.1],
            [6.4, 36.1],
            [6.4, 36.4],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 15, name: "Tizi Ouzou", urgency: "critical", population: 1127000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4.0, 36.8],
            [4.3, 36.8],
            [4.3, 36.5],
            [4.0, 36.5],
            [4.0, 36.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 6, name: "Béjaïa", urgency: "critical", population: 915000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.0, 36.8],
            [5.3, 36.8],
            [5.3, 36.4],
            [5.0, 36.4],
            [5.0, 36.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 9, name: "Blida", urgency: "critical", population: 1002000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2.7, 36.5],
            [3.0, 36.5],
            [3.0, 36.2],
            [2.7, 36.2],
            [2.7, 36.5],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 19, name: "Sétif", urgency: "warning", population: 1496000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.2, 36.2],
            [5.6, 36.2],
            [5.6, 35.8],
            [5.2, 35.8],
            [5.2, 36.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 5, name: "Batna", urgency: "warning", population: 1119000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [6.0, 35.8],
            [6.4, 35.8],
            [6.4, 35.4],
            [6.0, 35.4],
            [6.0, 35.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 23, name: "Annaba", urgency: "safe", population: 609000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [7.6, 37.0],
            [8.0, 37.0],
            [8.0, 36.7],
            [7.6, 36.7],
            [7.6, 37.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 13, name: "Tlemcen", urgency: "warning", population: 949000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-1.5, 35.0],
            [-1.1, 35.0],
            [-1.1, 34.6],
            [-1.5, 34.6],
            [-1.5, 35.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 7, name: "Biskra", urgency: "safe", population: 721000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.6, 34.9],
            [6.0, 34.9],
            [6.0, 34.5],
            [5.6, 34.5],
            [5.6, 34.9],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 17, name: "Djelfa", urgency: "safe", population: 1092000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.0, 34.7],
            [3.5, 34.7],
            [3.5, 34.2],
            [3.0, 34.2],
            [3.0, 34.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 30, name: "Ouargla", urgency: "safe", population: 558000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.2, 32.0],
            [5.6, 32.0],
            [5.6, 31.6],
            [5.2, 31.6],
            [5.2, 32.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 11, name: "Tamanrasset", urgency: "safe", population: 198000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.3, 23.0],
            [5.7, 23.0],
            [5.7, 22.6],
            [5.3, 22.6],
            [5.3, 23.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: 1, name: "Adrar", urgency: "safe", population: 402000 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-0.5, 28.0],
            [-0.1, 28.0],
            [-0.1, 27.6],
            [-0.5, 27.6],
            [-0.5, 28.0],
          ],
        ],
      },
    },
  ],
}

declare global {
  interface Window {
    L: any
  }
}

export function AlgeriaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [selectedWilaya, setSelectedWilaya] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "#ef4444"
      case "warning":
        return "#f97316"
      case "safe":
        return "#22c55e"
      default:
        return "#6b7280"
    }
  }

  const criticalCount = algeriaGeoJSON.features.filter((f) => f.properties.urgency === "critical").length
  const warningCount = algeriaGeoJSON.features.filter((f) => f.properties.urgency === "warning").length
  const safeCount = algeriaGeoJSON.features.filter((f) => f.properties.urgency === "safe").length

  useEffect(() => {
    if (!mapRef.current) return

    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Load JS
      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.onload = initializeMap
        document.head.appendChild(script)
      } else {
        initializeMap()
      }
    }

    const initializeMap = () => {
      if (!window.L || !mapRef.current) return

      // Initialize map centered on Algeria
      const map = window.L.map(mapRef.current).setView([28.0339, 1.6596], 6)

      // Add OpenStreetMap tiles 
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map)

      // Add GeoJSON layer
      const geoJsonLayer = window.L.geoJSON(algeriaGeoJSON, {
        style: (feature: any) => ({
          fillColor: getUrgencyColor(feature.properties.urgency),
          weight: 2,
          opacity: 1,
          color: "#ffffff",
          dashArray: "3",
          fillOpacity: 0.7,
        }),
        onEachFeature: (feature: any, layer: any) => {
          // Hover effects
          layer.on({
            mouseover: (e: any) => {
              const layer = e.target
              layer.setStyle({
                weight: 3,
                color: "#666",
                dashArray: "",
                fillOpacity: 0.9,
              })
              layer.bringToFront()
            },
            mouseout: (e: any) => {
              geoJsonLayer.resetStyle(e.target)
            },
            click: (e: any) => {
              setSelectedWilaya(feature.properties)
              map.fitBounds(e.target.getBounds())
            },
          })

          // Bind popup
          layer.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${feature.properties.name}</h3>
              <p class="text-sm">Population: ${feature.properties.population.toLocaleString()}</p>
              <p class="text-sm">État: <span class="font-medium" style="color: ${getUrgencyColor(feature.properties.urgency)}">${
                feature.properties.urgency === "critical"
                  ? "CRITIQUE"
                  : feature.properties.urgency === "warning"
                    ? "ATTENTION"
                    : "SÛR"
              }</span></p>
            </div>
          `)
        },
      }).addTo(map)

      mapInstanceRef.current = map
      setMapLoaded(true)
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const exportMap = () => {
    if (mapInstanceRef.current) {
      alert("do later")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Carte Interactive de l'Algérie - Vue nationale
          </CardTitle>
          <Button variant="outline" size="sm" onClick={exportMap}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Critique ({criticalCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Attention ({warningCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Sûr ({safeCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <div
              ref={mapRef}
              className="w-full h-96 rounded-lg border-2 border-border bg-muted"
              style={{ minHeight: "400px" }}
            />
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
                </div>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Statistiques</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Wilayas:</span>
                  <span className="font-medium">{algeriaGeoJSON.features.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">Critiques:</span>
                  <span className="font-medium text-red-600">{criticalCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600">Attention:</span>
                  <span className="font-medium text-orange-600">{warningCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Sûres:</span>
                  <span className="font-medium text-green-600">{safeCount}</span>
                </div>
              </div>
            </div>

            {selectedWilaya && (
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Wilaya Sélectionnée</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Nom:</span>
                    <p className="font-medium">{selectedWilaya.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Code:</span>
                    <p className="font-medium">{selectedWilaya.id.toString().padStart(2, "0")}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Population:</span>
                    <p className="font-medium">{selectedWilaya.population.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">État:</span>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        selectedWilaya.urgency === "critical"
                          ? "text-red-600 border-red-200"
                          : selectedWilaya.urgency === "warning"
                            ? "text-orange-600 border-orange-200"
                            : "text-green-600 border-green-200"
                      }`}
                    >
                      {selectedWilaya.urgency === "critical"
                        ? "CRITIQUE"
                        : selectedWilaya.urgency === "warning"
                          ? "ATTENTION"
                          : "SÛR"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {!selectedWilaya && (
              <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Cliquez sur une wilaya pour voir les détails</p>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-xs">
              <p className="font-medium mb-1">💡 Fonctionnalités:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Zoom avec molette</li>
                <li>• Clic pour sélectionner</li>
                <li>• Survol pour info rapide</li>
                <li>• Cartes OpenStreetMap</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
