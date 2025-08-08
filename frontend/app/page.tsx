'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { School, Users, BookOpen, Calendar, BarChart3, Settings, Building2 } from 'lucide-react'

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [apiUrl, setApiUrl] = useState('')

  useEffect(() => {
    const checkApiConnection = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://37.27.198.175:8000'
      setApiUrl(url)
      
      try {
        const response = await fetch(`${url}/health`)
        if (response.ok) {
          setApiStatus('connected')
        } else {
          setApiStatus('error')
        }
      } catch (error) {
        setApiStatus('error')
      }
    }

    checkApiConnection()
  }, [])

  const modules = [
    {
      name: 'Gestión de Estudiantes',
      description: 'Registro, matrícula y seguimiento académico',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Gestión Académica',
      description: 'Cursos, asignaturas y planificación curricular',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      name: 'Calendario Escolar',
      description: 'Eventos, horarios y actividades institucionales',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      name: 'Administración Central',
      description: 'Gestión de organizaciones y licencias',
      icon: Building2,
      color: 'bg-indigo-500'
    },
    {
      name: 'Reportes y Analytics',
      description: 'Estadísticas y análisis de rendimiento',
      icon: BarChart3,
      color: 'bg-orange-500'
    },
    {
      name: 'PIE - Programa de Integración',
      description: 'Gestión de necesidades educativas especiales',
      icon: School,
      color: 'bg-red-500'
    },
    {
      name: 'Configuración',
      description: 'Ajustes del sistema y administración',
      icon: Settings,
      color: 'bg-gray-500'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <School className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              SIGECOL v4.16
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Sistema Integral de Gestión Escolar de Chile
          </p>
          
          {/* API Status */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
            {apiStatus === 'loading' && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                🔄 Conectando con API...
              </div>
            )}
            {apiStatus === 'connected' && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                ✅ API Conectada - {apiUrl}
              </div>
            )}
            {apiStatus === 'error' && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
                ❌ Error de conexión - {apiUrl}
              </div>
            )}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => {
            const IconComponent = module.icon
            const moduleRoutes = {
              'Gestión de Estudiantes': '/estudiantes',
              'Gestión Académica': '/academica',
              'Calendario Escolar': '/calendario',
              'Administración Central': '/admin',
              'Reportes y Analytics': '/reportes',
              'PIE - Programa de Integración': '/pie',
              'Configuración': '/configuracion'
            }
            
            return (
              <Link
                key={index}
                href={moduleRoutes[module.name as keyof typeof moduleRoutes] || '#'}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer block"
              >
                <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {module.name}
                </h3>
                <p className="text-gray-600">
                  {module.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <School className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Cumplimiento Normativo</h4>
                  <p className="text-gray-600 text-sm">Alineado con regulaciones chilenas de educación</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Analytics Avanzados</h4>
                  <p className="text-gray-600 text-sm">Reportes inteligentes y predictivos</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Gestión PIE</h4>
                  <p className="text-gray-600 text-sm">Programa de Integración Escolar completo</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-orange-100 rounded-full p-2 mr-3">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sincronización Temporal</h4>
                  <p className="text-gray-600 text-sm">Basado en geolocalización chilena</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                  <Settings className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Arquitectura Modular</h4>
                  <p className="text-gray-600 text-sm">Implementación por fases adaptable</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <BookOpen className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Accesibilidad WCAG 2.1</h4>
                  <p className="text-gray-600 text-sm">Diseño inclusivo y accesible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>© 2025 SIGECOL v4.16 - Sistema desarrollado para instituciones educativas chilenas</p>
          <p className="text-sm mt-2">Zona horaria: America/Santiago | Cumplimiento Ley 19.628</p>
        </div>
      </div>
    </main>
  )
}
