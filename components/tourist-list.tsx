"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, AlertTriangle, Shield } from "lucide-react"

interface Tourist {
  id: string
  fullName: string
  passportNumber: string
  lastSeen: string
  status: "safe" | "distress"
  location: string
  emergencyContact: string
}

export function TouristList() {
  const [tourists, setTourists] = useState<Tourist[]>([
    {
      id: "TST-001",
      fullName: "John Doe",
      passportNumber: "A12345678",
      lastSeen: "2 minutes ago",
      status: "safe",
      location: "Tawang Monastery",
      emergencyContact: "+91-9876543210",
    },
    {
      id: "TST-002",
      fullName: "Jane Smith",
      passportNumber: "B87654321",
      lastSeen: "5 minutes ago",
      status: "safe",
      location: "Sela Pass",
      emergencyContact: "+91-9876543211",
    },
    {
      id: "TST-003",
      fullName: "Mike Johnson",
      passportNumber: "C11223344",
      lastSeen: "15 minutes ago",
      status: "distress",
      location: "Bumla Pass",
      emergencyContact: "+91-9876543212",
    },
    {
      id: "TST-004",
      fullName: "Sarah Wilson",
      passportNumber: "D55667788",
      lastSeen: "1 minute ago",
      status: "safe",
      location: "Madhuri Lake",
      emergencyContact: "+91-9876543213",
    },
    {
      id: "TST-005",
      fullName: "David Brown",
      passportNumber: "E99887766",
      lastSeen: "8 minutes ago",
      status: "safe",
      location: "Nuranang Falls",
      emergencyContact: "+91-9876543214",
    },
    {
      id: "TST-006",
      fullName: "Lisa Garcia",
      passportNumber: "F44556677",
      lastSeen: "3 minutes ago",
      status: "safe",
      location: "Jaswantgarh",
      emergencyContact: "+91-9876543215",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "safe" | "distress">("all")

  useEffect(() => {
    const interval = setInterval(() => {
      setTourists((prev) =>
        prev.map((tourist) => {
          const minutes = Math.floor(Math.random() * 30) + 1
          const shouldChangeStatus = Math.random() < 0.05 // 5% chance

          return {
            ...tourist,
            lastSeen: `${minutes} minute${minutes > 1 ? "s" : ""} ago`,
            status: shouldChangeStatus ? (tourist.status === "safe" ? "distress" : "safe") : tourist.status,
          }
        }),
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Filter tourists based on search and status
  const filteredTourists = tourists.filter((tourist) => {
    const matchesSearch =
      tourist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tourist.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const safeCount = tourists.filter((t) => t.status === "safe").length
  const distressCount = tourists.filter((t) => t.status === "distress").length

  return (
    <Card className="w-full h-full shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Tourists
            <Badge variant="secondary" className="ml-2">
              {tourists.length}
            </Badge>
          </CardTitle>

          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3 text-green-500" />
              <span className="font-mono">{safeCount}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <AlertTriangle className="h-3 w-3 text-red-500" />
              <span className="font-mono">{distressCount}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tourists, passport, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              className="text-xs"
            >
              All
            </Button>
            <Button
              size="sm"
              variant={statusFilter === "safe" ? "default" : "outline"}
              onClick={() => setStatusFilter("safe")}
              className="text-xs"
            >
              Safe
            </Button>
            <Button
              size="sm"
              variant={statusFilter === "distress" ? "default" : "outline"}
              onClick={() => setStatusFilter("distress")}
              className="text-xs"
            >
              Distress
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[350px] px-6 pb-6">
          <div className="space-y-3">
            {filteredTourists.map((tourist) => (
              <div
                key={tourist.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                  tourist.status === "distress"
                    ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                    : "bg-card border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-card-foreground text-base">{tourist.fullName}</div>
                    {tourist.status === "distress" && <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ID: {tourist.passportNumber} • {tourist.location}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-4">
                    <span>Last Seen: {tourist.lastSeen}</span>
                    <span>Emergency: {tourist.emergencyContact}</span>
                  </div>
                </div>
                <div className="ml-4 flex flex-col items-end gap-2">
                  <Badge
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      tourist.status === "safe"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse"
                    }`}
                  >
                    {tourist.status === "safe" ? "SAFE" : "DISTRESS"}
                  </Badge>
                  {tourist.status === "distress" && (
                    <Button size="sm" variant="destructive" className="text-xs">
                      Alert Response
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {filteredTourists.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tourists found matching your criteria</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
