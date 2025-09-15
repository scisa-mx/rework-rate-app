# Rework rate App / Scisa Benchmarks App

## Table of Contents

- [Rework rate App / Scisa Benchmarks App](#rework-rate-app-/-scisa-benchmarks-app)
  - [Resumen](#resumen)
  - [Links relacionados](#links-relacionados)
  - [Stack tecnológico](#stack-tecnológico)
  - [Instalación y configuración](#instalación-y-configuración)
    - [Requisitos previos](#requisitos-previos)
  - [Docker](#docker)
    - [Construcción de la imagen Docker](#construcción-de-la-imagen-docker)
    - [Ejecución del contenedor Docker](#ejecución-del-contenedor-docker)
    - [Push de la imagen a ACR](#push-de-la-imagen-a-acr)
  - [Estructura del proyecto](#estructura-del-proyecto)
    - [Estructura de directorios](#estructura-de-directorios)
  - [Cypress](#cypress)
    - [Estructura de pruebas](#estructura-de-pruebas)
  - [Pipline para funcionamiento automatizado](#pipline-para-funcionamiento-automatizado)
    - [Script de Rework Rate](#script-de-rework-rate)
    - [Pipline](#pipline)


## Resumen
Este proyecto es una aplicación web desarrollada con Vite y Vue 3, diseñada para gestionar y visualizar benchmarks de rendimiento en los repositorios internos (Por el momento solo se basa en Rework Rate). La aplicación permite a los usuarios analizar en un dashboard de los datos de rendimiento.

## Links relacionados
Url de producción: https://rework-rate.scisa.com.mx
Url de api: https://api.rework-rate.scisa.com.mx/graphql

## Stack tecnológico
- Vite
- Vue 3
- TypeScript
- Pinia
- Vue Router
- Apollo Client
- Tailwind CSS
- Docker

## Instalación y configuración
### Requisitos previos
- Node.js (versión 20-lts o superior)
- npm (viene con Node.js)
- Docker (opcional, para despliegue en contenedores)

## Docker 
### Construcción de la imagen Docker
Para construir la imagen Docker de la aplicación, navega al directorio raíz del proyecto y ejecuta el siguiente comando:

```bash
docker build -t mx.com.scisa.rework-rate .
```

### Ejecución del contenedor Docker
Una vez que la imagen Docker esté construida, puedes ejecutar un contenedor con el siguiente comando:

```bash
docker run -d -p 80:80 mx.com.scisa.rework-rate
```
Este comando ejecuta el contenedor en segundo plano y mapea el puerto 80 del contenedor al puerto 80 de tu máquina local.

### Push de la imagen a ACR
Para subir la imagen Docker a Azure Container Registry (ACR), primero debes iniciar sesión en tu ACR:

```bash
az acr login --name scisa
```
Luego, etiqueta la imagen con el nombre de tu ACR:

```bash
docker tag mx.com.scisa.rework-rate scisa.azurecr.io/mx.com.scisa.rework-rate:latest
```

Finalmente, sube la imagen a tu ACR:

```bash
docker push scisa.azurecr.io/mx.com.scisa.rework-rate:latest
```

## Estructura del proyecto
La estructura del proyecto es una estructura basada en "features". Una "estructura por features" se refiere a la organización de un proyecto de Vue en directorios que agrupan componentes y lógica por funcionalidad específica, en lugar de por tipo de archivo (como HTML, CSS o JavaScript) o por componentes (VueComponents/Logic). Este enfoque, también conocido como arquitectura modular por dominio o feature-slice design, mejora la escalabilidad y mantenibilidad al encapsular las características del proyecto, haciendo más fácil la gestión de aplicaciones grandes y complejas. 

Se basa en la idea de que cada "feature" o característica del proyecto tiene su propio conjunto de archivos relacionados, lo que facilita la navegación y el desarrollo colaborativo.

Con esta estructura, cada feature puede contener:
- Componentes Vue específicos de la feature.
- Servicios o lógica de negocio relacionados.
- Vistas o páginas asociadas.
- Archivos de estilo específicos. (en este caso se usa Tailwind CSS por lo que se deja de lado)

### Estructura de directorios
```plain-text
src/
├── features/
│   ├── feature1/
│   │   ├── components/
│   │   ├── services/
│   │   └── views/
│   ├── feature2/
│   │   ├── components/
│   │   ├── services/
│   │   └── views/
│   └── ...
├── components/
│   ├── ComponentA.vue
│   └── ComponentB.vue
```
En  esta estructura:
- `features/`: Contiene subdirectorios para cada feature del proyecto.
- `components/`: Contiene componentes reutilizables que no están ligados a una feature específica.
- `services/`: Contiene lógica de negocio o servicios relacionados con la feature.
- `views/`: Contiene las vistas o páginas asociadas a la feature.
- `components/`: Contiene componentes reutilizables que no están ligados a una feature específica. (Componentes de formularios, botones, modales, etc.)

## Cypress 
Para ejecutar la interfaz de usuario de Cypress, usa el siguiente comando:

```bash
npx cypress open
```
Esto abrirá la interfaz gráfica de Cypress, donde podrás seleccionar y ejecutar tus pruebas.

### Estructura de pruebas
La estructura de las pruebas de Cypress en este proyecto está organizada de la siguiente manera:

```plain-text
cypress/
└── e2e/
    ├── feature1/
    │   ├── views/
    │   │   └── Feature1View.cy.ts
    │   └── flows/
    │       └── Feature1Flow.cy.ts
    ├── feature2/
    │   └── views/
    │       └── Feature2View.cy.ts
    └── common/
       └── Navigation.cy.ts

```
En esta estructura:
- `cypress/e2e/`: Directorio raíz para las pruebas end-to-end.
- `feature1/`, `feature2/`: Directorios específicos para cada feature del proyecto, conteniendo sus respectivas pruebas.
- `views/`: Contiene pruebas específicas para las vistas asociadas a la feature.
- `flows/`: Contiene pruebas que simulan flujos de usuario completos dentro de la feature.
- `common/`: Contiene pruebas reutilizables o comunes, como la navegación entre vistas.

## Pipline para funcionamiento automatizado
El proyecto deberia de estar a la par de una serie de repositorios alojados en GitHub o Azure DevOps, los cuales se encargan de ejecutar pruebas automatizadas y benchmarks de rendimiento. Estos repositorios deben estar configurados para enviar los resultados a la API GraphQL que alimenta esta aplicación.

### Script de Rework Rate
[Puedes encontrarlo en este repositorio](https://github.com/scisa-mx/rework-rate/blob/master/rework-rate.sh)

### Pipline 
```yaml
trigger:
- development

pool:
  vmImage: 'ubuntu-latest'

steps:
- checkout: self
  fetchDepth: 0  # This ensures full history is fetched
- script: |
    curl -sSL https://raw.githubusercontent.com/scisa-mx/rework-rate/refs/heads/master/rework-rate.sh -o rework-rate.sh
    chmod +x rework-rate.sh
    ./rework-rate.sh
  displayName: 'Download and run rework-rate.sh'
```

Este pipeline está configurado para ejecutarse en la rama `development` (Puede ir directamente en master o en alguna rama que se crea conveniente para poder medir estas metricas) y utiliza una imagen de Ubuntu. Los pasos incluyen la verificación del código fuente y la descarga y ejecución del script `rework-rate.sh` desde el repositorio de GitHub.
