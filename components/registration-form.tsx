"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { QRCodeModal } from "./qr-code-modal"
import { UserPlus, Loader2 } from "lucide-react"

interface TouristData {
  fullName: string
  passportNumber: string
  emergencyContact: string
  itinerary: string
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<TouristData>({
    fullName: "",
    passportNumber: "",
    emergencyContact: "",
    itinerary: "",
  })
  const [showQRModal, setShowQRModal] = useState(false)
  const [generatedId, setGeneratedId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a unique ID for the tourist
    const touristId = `TST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setGeneratedId(touristId)

    // In a real app, this would save to Firebase
    console.log("Registering tourist:", { ...formData, id: touristId })

    setIsSubmitting(false)

    // Show QR code modal
    setShowQRModal(true)

    // Reset form
    setFormData({
      fullName: "",
      passportNumber: "",
      emergencyContact: "",
      itinerary: "",
    })
  }

  const handleInputChange = (field: keyof TouristData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Card className="w-full shadow-lg border-0 bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Register New Tourist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full transition-all focus:ring-2 focus:ring-primary/20"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passportNumber" className="text-sm font-medium">
                Passport / Aadhaar Number
              </Label>
              <Input
                id="passportNumber"
                type="text"
                value={formData.passportNumber}
                onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                placeholder="Enter passport or Aadhaar number"
                required
                className="w-full transition-all focus:ring-2 focus:ring-primary/20"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-sm font-medium">
                Emergency Contact Number
              </Label>
              <Input
                id="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                placeholder="Enter emergency contact number"
                required
                className="w-full transition-all focus:ring-2 focus:ring-primary/20"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itinerary" className="text-sm font-medium">
                Key Itinerary Points
              </Label>
              <Textarea
                id="itinerary"
                value={formData.itinerary}
                onChange={(e) => handleInputChange("itinerary", e.target.value)}
                placeholder="e.g., Day 1: Tawang, Day 2: Sela Pass"
                rows={4}
                className="w-full resize-none transition-all focus:ring-2 focus:ring-primary/20"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Digital ID...
                </>
              ) : (
                "Generate Digital ID"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} touristId={generatedId} />
    </>
  )
}
