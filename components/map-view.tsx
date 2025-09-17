"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, MapPin } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  status: "safe" | "distress"
  lastUpdate: string
}

export function MapView() {
  const [locations, setLocations] = useState<MapLocation[]>([
    {
      id: "1",
      name: "John Doe",
      lat: 27.5916,
      lng: 91.9882,
      status: "safe",
      lastUpdate: "2 min ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      lat: 27.3389,
      lng: 92.4432,
      status: "safe",
      lastUpdate: "5 min ago",
    },
    {
      id: "3",
      name: "Mike Johnson",
      lat: 27.2046,
      lng: 92.9376,
      status: "distress",
      lastUpdate: "15 min ago",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setLocations((prev) =>
        prev.map((location) => {
          // Occasionally change status for demo
          const shouldChangeStatus = Math.random() < 0.1
          const newStatus = shouldChangeStatus ? (location.status === "safe" ? "distress" : "safe") : location.status

          return {
            ...location,
            lat: location.lat + (Math.random() - 0.5) * 0.001,
            lng: location.lng + (Math.random() - 0.5) * 0.001,
            status: newStatus,
            lastUpdate: `${Math.floor(Math.random() * 20) + 1} min ago`,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const [zoom, setZoom] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  return (
    <Card className="w-full h-full shadow-lg border-0 bg-card overflow-hidden">
      <CardContent className="p-0 relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 dark:from-blue-950 dark:via-blue-900 dark:to-green-950">
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Enhanced map background with terrain */}
              <defs>
                <pattern id="terrain" patternUnits="userSpaceOnUse" width="20" height="20">
                  <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#terrain)" />
              <path d="M50 50 Q200 100 350 50 Q300 150 250 200 Q150 250 50 200 Z" fill="currentColor" opacity="0.2" />
              <path d="M100 80 Q180 120 280 80 Q250 140 200 170 Q140 200 100 170 Z" fill="currentColor" opacity="0.3" />
              {/* Rivers */}
              <path
                d="M0 150 Q100 140 200 160 Q300 180 400 170"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Location markers with enhanced styling */}
          {locations.map((location) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${((location.lng - 91.5) / 2) * 100 + 30}%`,
                top: `${((27.8 - location.lat) / 1) * 100 + 20}%`,
                transform: `scale(${zoom})`,
              }}
              onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
            >
              <div className="relative">
                <div
                  className={`w-5 h-5 rounded-full border-3 border-white shadow-lg transition-all duration-300 ${
                    location.status === "safe" ? "bg-green-500" : "bg-red-500"
                  } ${selectedLocation === location.id ? "scale-125" : ""}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full absolute -inset-2.5 animate-ping ${
                      location.status === "safe" ? "bg-green-400" : "bg-red-400"
                    } opacity-30`}
                  />
                </div>

                {/* Enhanced tooltip */}
                {selectedLocation === location.id && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap border z-10">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{location.name}</div>
                    <div className="text-gray-600 dark:text-gray-400">Last seen: {location.lastUpdate}</div>
                    <div
                      className={`text-xs font-medium ${location.status === "safe" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {location.status.toUpperCase()}
                    </div>
                    {/* Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-l border-t rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Enhanced map controls */}
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-y-2 border">
            <Button size="sm" variant="ghost" onClick={() => setZoom(Math.min(zoom + 0.2, 2))} className="w-8 h-8 p-0">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
              className="w-8 h-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setZoom(1)} className="w-8 h-8 p-0">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Live Status</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Safe</span>
                </div>
                <span className="text-xs font-mono text-gray-900 dark:text-gray-100">
                  {locations.filter((l) => l.status === "safe").length}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Distress</span>
                </div>
                <span className="text-xs font-mono text-gray-900 dark:text-gray-100">
                  {locations.filter((l) => l.status === "distress").length}
                </span>
              </div>
            </div>
          </div>

          {/* Live update indicator */}
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
