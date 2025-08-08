'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, ArrowLeft, Plus, School, Users, CreditCard, Settings } from 'lucide-react'

interface Organization {
  id: number
  name: string
  legal_name: string
  rut: string
  email: string
  created_at: string
  is_active: boolean
}

interface School {
  id: number
  organization_id: number
  name: string
  rbd: string
  created_at: string
  is_active: boolean
}

interface DashboardStats {
  total_organizations: number
  total_schools: number
  total_licenses: number
}

export default function AdminPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [schools, setSchools] = useState<School[]>([])
  const [stats, setStats] = useState<DashboardStats>({ total_organizations: 0, total_schools: 0, total_licenses: 0 })
  const [loading, setLoading] = useState(true)
  const [showCreateOrg, setShowCreateOrg] = useState(false)
  const [showCreateSchool, setShowCreateSchool] = useState(false)
  const [newOrg, setNewOrg] = useState({
    name: '',
    legal_name: '',
    rut: '',
    email: '',
    phone: '',
    address: ''
  })
  const [newSchool, setNewSchool] = useState({
    organization_id: 0,
    name: '',
    rbd: '',
    address: '',
    phone: '',
    email: '',
    timezone: 'America/Santiago'
  })

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://37.27.198.175:8000'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [orgsResponse, schoolsResponse, dashboardResponse] = await Promise.all([
        fetch(`${apiUrl}/admin/organizations`),
        fetch(`${apiUrl}/admin/schools`),
        fetch(`${apiUrl}/admin/dashboard`)
      ])
      
      if (orgsResponse.ok && schoolsResponse.ok && dashboardResponse.ok) {
        const orgsData = await orgsResponse.json()
        const schoolsData = await schoolsResponse.json()
        const dashboardData = await dashboardResponse.json()
        setOrganizations(orgsData)
        setSchools(schoolsData)
        setStats(dashboardData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/admin/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrg)
      })
      
      if (response.ok) {
        setShowCreateOrg(false)
        setNewOrg({ name: '', legal_name: '', rut: '', email: '', phone: '', address: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error creating organization:', error)
    }
  }

  const createSchool = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/admin/schools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchool)
      })
      
      if (response.ok) {
        setShowCreateSchool(false)
        setNewSchool({ organization_id: 0, name: '', rbd: '', address: '', phone: '', email: '', timezone: 'America/Santiago' })
        fetchData()
      }
    } catch (error) {
      console.error('Error creating school:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors">
            <ArrowLeft className="h-6 w-6 text-purple-600" />
          </Link>
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Administración Central</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => setShowCreateOrg(true)}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nueva Organización</h3>
            <p className="text-gray-600">Registrar nuevo sostenedor</p>
          </button>

          <button
            onClick={() => setShowCreateSchool(true)}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <School className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuevo Colegio</h3>
            <p className="text-gray-600">Agregar colegio a organización</p>
          </button>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Organizaciones</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.total_organizations}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <School className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Colegios</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.total_schools}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Organizaciones Registradas</h2>
          
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                      Organización
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                      RUT
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                      Colegios
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {organizations.map((org) => (
                    <tr key={org.id}>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{org.name}</div>
                          <div className="text-sm text-gray-500">{org.legal_name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{org.rut}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{org.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {schools.filter(s => s.organization_id === org.id).length}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          org.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {org.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Colegios Registrados</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Colegio
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    RBD
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Organización
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Zona Horaria
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schools.map((school) => {
                  const org = organizations.find(o => o.id === school.organization_id)
                  return (
                    <tr key={school.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{school.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{school.rbd || 'N/A'}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{org?.name || 'N/A'}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">America/Santiago</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          school.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {school.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {showCreateOrg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nueva Organización</h3>
              <form onSubmit={createOrganization}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre comercial"
                    value={newOrg.name}
                    onChange={(e) => setNewOrg({...newOrg, name: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Razón social"
                    value={newOrg.legal_name}
                    onChange={(e) => setNewOrg({...newOrg, legal_name: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="RUT (ej: 12345678-9)"
                    value={newOrg.rut}
                    onChange={(e) => setNewOrg({...newOrg, rut: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newOrg.email}
                    onChange={(e) => setNewOrg({...newOrg, email: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Teléfono (opcional)"
                    value={newOrg.phone}
                    onChange={(e) => setNewOrg({...newOrg, phone: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                  />
                  <textarea
                    placeholder="Dirección (opcional)"
                    value={newOrg.address}
                    onChange={(e) => setNewOrg({...newOrg, address: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateOrg(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showCreateSchool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nuevo Colegio</h3>
              <form onSubmit={createSchool}>
                <div className="space-y-4">
                  <select
                    value={newSchool.organization_id}
                    onChange={(e) => setNewSchool({...newSchool, organization_id: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  >
                    <option value={0}>Seleccionar organización</option>
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre del colegio"
                    value={newSchool.name}
                    onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                  <input
                    type="text"
                    placeholder="RBD (opcional)"
                    value={newSchool.rbd}
                    onChange={(e) => setNewSchool({...newSchool, rbd: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                  />
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    value={newSchool.email}
                    onChange={(e) => setNewSchool({...newSchool, email: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Teléfono (opcional)"
                    value={newSchool.phone}
                    onChange={(e) => setNewSchool({...newSchool, phone: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                  />
                  <textarea
                    placeholder="Dirección (opcional)"
                    value={newSchool.address}
                    onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateSchool(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
