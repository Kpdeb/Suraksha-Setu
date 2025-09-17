"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, AlertTriangle, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

export function StatsCards() {
  const [stats, setStats] = useState({
    totalTourists: 0,
    activeTourists: 0,
    emergencyAlerts: 0,
    safeZones: 0,
  })

  useEffect(() => {
    const updateStats = () => {
      setStats({
        totalTourists: Math.floor(Math.random() * 50) + 150,
        activeTourists: Math.floor(Math.random() * 30) + 45,
        emergencyAlerts: Math.floor(Math.random() * 3),
        safeZones: 12,
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 5000)
    return () => clearInterval(interval)
  }, [])

  const statItems = [
    {
      title: "Total Tourists",
      value: stats.totalTourists,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Active Now",
      value: stats.activeTourists,
      icon: Shield,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Emergency Alerts",
      value: stats.emergencyAlerts,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Safe Zones",
      value: stats.safeZones,
      icon: MapPin,
      color: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <Card key={index} className="shadow-sm border-0 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{item.title}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
              </div>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
