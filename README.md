# SIGECOL v4.16 - Sistema Integral de Gestión Escolar de Chile

## Descripción
Sistema integral para gestión escolar en Chile, alineado con normativas del Ministerio de Educación (Mineduc), Servicio de Impuestos Internos (SII), Inspección del Trabajo, Ministerio de Salud (Minsal), Ministerio de Transporte y Telecomunicaciones (MTT), y la Ley 19.628.

## Arquitectura Técnica
- **Backend**: FastAPI + PostgreSQL
- **Frontend**: Next.js + Tailwind CSS
- **Contenedores**: Docker + Docker Compose
- **Seguridad**: AES-256, SHA-256, JWT
- **Despliegue**: VPS Hetzner

## Módulos Principales (MVP)
- ✅ Autenticación y autorización
- ✅ Gestión de usuarios (admin, docentes, apoderados)
- ✅ Gestión de alumnos (CRUD con validación RUT)
- ✅ Gestión académica básica (cursos, asignaturas, calificaciones)
- ✅ Gestión de asistencia básica
- ✅ Módulo PIE básico (Programa de Integración Escolar)
- ✅ Dashboard básico
- ✅ Cumplimiento Ley 19.628

## Estructura del Proyecto
```
sigecol/
├── backend/          # FastAPI application
├── frontend/         # Next.js application
├── docker/           # Docker configurations
├── docs/             # Documentation
└── scripts/          # Deployment scripts
```

## Configuración de Desarrollo

### Requisitos
- Docker y Docker Compose
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### Instalación Local
```bash
# Clonar repositorio
git clone https://github.com/crreyesp/Programacion.git
cd Programacion

# Levantar servicios con Docker
docker-compose up -d

# Backend estará disponible en: http://localhost:8000
# Frontend estará disponible en: http://localhost:3000
```

## Despliegue en VPS
El sistema está configurado para desplegarse en VPS Hetzner con Docker.

## Cumplimiento Normativo
- ✅ Ley 19.628 (Protección de Datos Personales)
- ✅ Normativas Mineduc
- ✅ Integración PIE según Registro_PIE_2013
- ✅ Accesibilidad WCAG 2.1

## Contacto
- **Desarrollador**: Devin AI
- **Cliente**: Rodolfo Reyes (@crreyesp)
- **Repositorio**: https://github.com/crreyesp/Programacion
