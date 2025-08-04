"use client"

import { useEffect, useRef } from "react"

interface Bureau {
  code: number
  comptableCode: number
  name: string
  lat: number
  lng: number
  state: string
  wilaya: string
}

interface MapComponentProps {
  bureaux: Bureau[]
  selectedWilaya: string
}

// Wilaya center coordinates for better map positioning
const wilayaCenters: { [key: string]: [number, number] } = {
  Adrar: [27.8667, -0.2833],
  Chlef: [36.1667, 1.3333],
  Laghouat: [33.8, 2.8667],
  "Oum El Bouaghi": [35.8667, 7.1167],
  Batna: [35.5667, 6.1833],
  Béjaïa: [36.7667, 5.0833],
  Biskra: [34.85, 5.7333],
  Béchar: [31.6167, -2.2167],
  Blida: [36.4667, 2.8333],
  Bouira: [36.3667, 3.9],
  Tamanrasset: [22.7833, 5.5167],
  Tébessa: [35.4, 8.1167],
  Tlemcen: [34.8833, -1.3167],
  Tiaret: [35.3667, 1.3167],
  "Tizi Ouzou": [36.7167, 4.05],
  Alger: [36.7667, 3.05],
  Djelfa: [34.6833, 3.25],
  Jijel: [36.8167, 5.7667],
  Sétif: [36.1833, 5.4],
  Saïda: [34.8333, 0.15],
  Skikda: [36.8667, 6.9],
  "Sidi Bel Abbès": [35.2, -0.6333],
  Annaba: [36.9, 7.7667],
  Guelma: [36.4667, 7.4333],
  Constantine: [36.3667, 6.6167],
  Médéa: [36.2667, 2.75],
  Mostaganem: [35.9333, 0.0833],
  "M'Sila": [35.7, 4.5],
  Mascara: [35.4, 0.15],
  Ouargla: [31.95, 5.3333],
  Oran: [35.7, -0.6333],
  "El Bayadh": [33.6833, 1.0167],
  Illizi: [26.5, 8.4833],
  "Bordj Bou Arréridj": [36.0667, 4.7667],
  Boumerdès: [36.7667, 3.4833],
  "El Tarf": [36.7667, 8.3167],
  Tindouf: [27.6667, -8.15],
  Tissemsilt: [35.6, 1.8],
  "El Oued": [33.3667, 6.8667],
  Khenchela: [35.4333, 7.1333],
  "Souk Ahras": [36.2833, 7.95],
  Tipaza: [36.5833, 2.45],
  Mila: [36.45, 6.2667],
  "Aïn Defla": [36.2667, 1.9667],
  Naâma: [33.2667, -0.3],
  "Aïn Témouchent": [35.3, -1.0333],
  Ghardaïa: [32.4833, 3.6667],
  Relizane: [35.7333, 0.5667],
  Timimoun: [29.25, 0.2333],
  "Bordj Badji Mokhtar": [21.3333, 0.9167],
  "Ouled Djellal": [34.4167, 5.1],
  "Béni Abbès": [30.1333, -2.1667],
  "In Salah": [27.2167, 2.4667],
  "In Guezzam": [19.5667, 5.7667],
  Touggourt: [33.1, 6.0667],
  Djanet: [24.5667, 9.4833],
  "El M'Ghair": [33.95, 5.9167],
  "El Meniaa": [30.5833, 2.8833],
}

export default function MapComponent({ bureaux, selectedWilaya }: MapComponentProps) {
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
      if (!mapContainerRef.current || !window.L) return

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

      // Fit map to show all markers or center on wilaya
      if (markers.length > 0) {
        const group = new window.L.FeatureGroup(markers)
        map.fitBounds(group.getBounds().pad(0.1))
      } else if (wilayaCenters[selectedWilaya]) {
        // If no bureaux data, center on wilaya
        const [lat, lng] = wilayaCenters[selectedWilaya]
        map.setView([lat, lng], 8)
      }
    })

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [bureaux, selectedWilaya])

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
          {bureaux.length} bureau{bureaux.length > 1 ? "x" : ""} affiché{bureaux.length > 1 ? "s" : ""} -{" "}
          {selectedWilaya}
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
