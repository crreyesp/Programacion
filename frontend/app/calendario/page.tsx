'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, ArrowLeft, Plus, Clock, MapPin } from 'lucide-react'

export default function CalendarioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors">
            <ArrowLeft className="h-6 w-6 text-purple-600" />
          </Link>
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Calendario Escolar</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuevo Evento</h3>
            <p className="text-gray-600">Crear un nuevo evento o actividad</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Horarios</h3>
            <p className="text-gray-600">Ver y editar horarios de clases</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Actividades</h3>
            <p className="text-gray-600">Gestionar actividades extracurriculares</p>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Agosto 2025</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Hoy
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Anterior
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Siguiente
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-50">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div key={day} className="p-2 text-center border border-gray-200 hover:bg-purple-50 cursor-pointer min-h-[80px]">
                <div className="font-medium text-gray-800">{day}</div>
                {day === 8 && (
                  <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 mt-1">
                    Inicio clases
                  </div>
                )}
                {day === 15 && (
                  <div className="text-xs bg-green-100 text-green-800 rounded px-1 mt-1">
                    Reunión padres
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Próximos Eventos</h2>
          <div className="space-y-4">
            <div className="flex items-start p-4 border-l-4 border-blue-500 bg-blue-50">
              <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Inicio del Segundo Semestre</h3>
                <p className="text-gray-600 text-sm">8 de Agosto, 2025 • 08:00 AM</p>
                <p className="text-gray-600 text-sm">Inicio oficial de clases del segundo semestre académico</p>
              </div>
            </div>
            <div className="flex items-start p-4 border-l-4 border-green-500 bg-green-50">
              <Calendar className="h-5 w-5 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Reunión de Apoderados</h3>
                <p className="text-gray-600 text-sm">15 de Agosto, 2025 • 19:00 PM</p>
                <p className="text-gray-600 text-sm">Reunión general de apoderados - Auditorio principal</p>
              </div>
            </div>
            <div className="flex items-start p-4 border-l-4 border-orange-500 bg-orange-50">
              <Calendar className="h-5 w-5 text-orange-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Día del Estudiante</h3>
                <p className="text-gray-600 text-sm">11 de Mayo, 2025 • Todo el día</p>
                <p className="text-gray-600 text-sm">Celebración del Día del Estudiante con actividades especiales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
