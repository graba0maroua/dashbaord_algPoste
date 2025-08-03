"use client"

import { useEffect, useRef } from "react"

interface Bureau {
  code: string
  comptableCode: string
  name: string
  lat: number
  lng: number
  state: string
  wilaya: string
}

interface MapComponentProps {
  bureaux: Bureau[]
}

export default function MapComponent({ bureaux }: MapComponentProps) {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const leafletLoadedRef = useRef(false)

  useEffect(() => {
    // Load Leaflet CSS and JS from CDN
    const loadLeaflet = async () => {
      if (leafletLoadedRef.current) return

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
        document.head.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      leafletLoadedRef.current = true
    }

    loadLeaflet().then(() => {
      if (!mapContainerRef.current || bureaux.length === 0 || !window.L) return

      // Initialize map if it doesn't exist
      if (!mapRef.current) {
        mapRef.current = window.L.map(mapContainerRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          touchZoom: true,
        })

        // Add OpenStreetMap tiles
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(mapRef.current)
      }

      const map = mapRef.current

      // Clear existing markers
      map.eachLayer((layer: any) => {
        if (layer instanceof window.L.Marker) {
          map.removeLayer(layer)
        }
      })

      // Create custom icons for different states
      const createCustomIcon = (state: string) => {
        const color = state === "safe" ? "#16a34a" : state === "moderate" ? "#ea580c" : "#dc2626"

        return window.L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              background-color: ${color};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                width: 8px;
                height: 8px;
                background-color: white;
                border-radius: 50%;
              "></div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          popupAnchor: [0, -10],
        })
      }

      // Add markers for each bureau
      const markers: any[] = []
      bureaux.forEach((bureau) => {
        const icon = createCustomIcon(bureau.state)
        const marker = window.L.marker([bureau.lat, bureau.lng], { icon })

        const stateText = bureau.state === "safe" ? "Sûr" : bureau.state === "moderate" ? "Modéré" : "Danger"
        const stateColor = bureau.state === "safe" ? "#16a34a" : bureau.state === "moderate" ? "#ea580c" : "#dc2626"

        marker.bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${bureau.name}</h3>
            <div style="margin-bottom: 4px;">
              <strong>Code:</strong> ${bureau.code}
            </div>
            <div style="margin-bottom: 4px;">
              <strong>Code Comptable:</strong> ${bureau.comptableCode}
            </div>
            <div style="margin-bottom: 4px;">
              <strong>Coordonnées:</strong> ${bureau.lat.toFixed(4)}, ${bureau.lng.toFixed(4)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>État:</strong> 
              <span style="
                color: ${stateColor}; 
                font-weight: bold;
                background-color: ${stateColor}20;
                padding: 2px 6px;
                border-radius: 4px;
                margin-left: 4px;
              ">${stateText}</span>
            </div>
            <div style="margin-top: 8px;">
              <button 
                onclick="alert('Détails pour ${bureau.name}')" 
                style="
                  background-color: #3b82f6;
                  color: white;
                  border: none;
                  padding: 4px 8px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                "
              >
                Voir détails
              </button>
            </div>
          </div>
        `)

        marker.addTo(map)
        markers.push(marker)
      })

      // Fit map to show all markers
      if (markers.length > 0) {
        const group = new window.L.FeatureGroup(markers)
        map.fitBounds(group.getBounds().pad(0.1))
      }
    })

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [bureaux])

  return (
    <div className="relative">
      <div ref={mapContainerRef} className="h-[400px] w-full rounded-lg overflow-hidden border" />

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Légende</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-white shadow-sm"></div>
            <span className="text-xs">Sûr</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-600 border-2 border-white shadow-sm"></div>
            <span className="text-xs">Modéré</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-sm"></div>
            <span className="text-xs">Danger</span>
          </div>
        </div>
      </div>

      {/* Map Controls Info */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-lg border z-[1000]">
        <p className="text-xs text-gray-600">
          {bureaux.length} bureau{bureaux.length > 1 ? "x" : ""} affiché{bureaux.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    L: any
  }
}
