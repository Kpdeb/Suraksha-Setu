import { RegistrationForm } from "@/components/registration-form"
import { MapView } from "@/components/map-view"
import { TouristList } from "@/components/tourist-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsCards } from "@/components/stats-cards"
import { Shield } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground text-balance">SurakshaSetu Command Center</h1>
              <p className="text-sm text-muted-foreground">Real-time Tourist Safety Monitoring System</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <StatsCards />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-200px)]">
          {/* Left Column - Control Panel (35% width) */}
          <div className="lg:col-span-4 space-y-6">
            <RegistrationForm />
          </div>

          {/* Right Column - Live Monitor (65% width) */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Real-time Tourist Monitor
              </h2>

              {/* Map View - Top Half */}
              <div className="h-[45vh] mb-6">
                <MapView />
              </div>

              {/* Tourist List - Bottom Half */}
              <div className="h-[45vh]">
                <TouristList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
