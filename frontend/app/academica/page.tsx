'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, ArrowLeft, Plus, Calendar, Users, FileText } from 'lucide-react'

export default function AcademicaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors">
            <ArrowLeft className="h-6 w-6 text-green-600" />
          </Link>
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Gestión Académica</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Nueva Asignatura</h3>
            <p className="text-gray-600 text-sm">Crear nueva asignatura</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Horarios</h3>
            <p className="text-gray-600 text-sm">Gestionar horarios de clases</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cursos</h3>
            <p className="text-gray-600 text-sm">Administrar cursos y niveles</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Evaluaciones</h3>
            <p className="text-gray-600 text-sm">Gestionar notas y evaluaciones</p>
          </div>
        </div>

        {/* Courses Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cursos Activos</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">8° Básico A</h3>
                <p className="text-gray-600 text-sm">32 estudiantes • 12 asignaturas</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">1° Medio B</h3>
                <p className="text-gray-600 text-sm">28 estudiantes • 14 asignaturas</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">2° Medio A</h3>
                <p className="text-gray-600 text-sm">30 estudiantes • 15 asignaturas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Asignaturas</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Matemáticas</h3>
                  <p className="text-gray-600 text-sm">Prof. Ana Silva</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Activa
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Lenguaje y Comunicación</h3>
                  <p className="text-gray-600 text-sm">Prof. Carlos Mendoza</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Activa
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Historia y Geografía</h3>
                  <p className="text-gray-600 text-sm">Prof. María Torres</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Activa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
