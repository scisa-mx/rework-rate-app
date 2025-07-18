# scisa-benchmark-frontend


## 0.4.0 - 05-08-2025
Se reestructura la forma de manejar los repositorios y los tags, ahora se utiliza una API GraphQL para obtener los repositorios y sus tags. Se agrega la funcionalidad de filtrar los repositorios mediante tags, estos tags tambien se pueden agregar de forma automatica al seleccionar un repositorio y escribiendo el tag nuevo dentro del campo de tags.

### Fixed
  - [] Se arregla el tema de los tags, ahora se obtienen mediante una API GraphQL y se pueden filtrar los repositorios por tags.

### Added
  - [] Se reestructura la forma de manejar los repositorios y los tags,


## 0.3.0 - 05-08-2025
Se agrega la funcionalidad de filtrar los repositorios mediante tags, estos tags tambien se pueden agregar de forma automatica al seleccionar un repositorio y escribiendo el tag nuevo dentro del campo de tags.

### Fixed


### Added
  - [243] Se agrega la funcionalidad de filtrar los repositorios mediante tags
  - [243] Se pueden agregar tags a un repositorio escribiendo el tag una vez este repo este selecionado en el campo.


### Changed
    
### Deprecated

### Removed

### Security

## 0.2.1 - 05-08-2025

### Resumen
Se agrega información de los reportes del rework-rate dentro la grafica de "Rework Historico" en el tablero, al mismo tiempo se agrega mejor formato para las fechas de los mismos reportes, los tooltips de los reportes se posicionan dependiendo de la pantalla para no cubrir puntos importantes en el tablero. Las fechas del widget del "Rework Historico" tienen por defecto el último periodo de reportes. Se arreglan bugs generales sobre las fechas de consulta (BUG: 220).

### Fixed
  - [220] Se arregla el tema de las fechas de consulta, ahora en el widget del "Rework Historico" se filtra mediante la fecha de creación del reporte en vez de la fecha de inicio del periodo. 

### Added
  - [221] Se agrega información de los reportes del rework-rate dentro la grafica de "Rework Historico" en el tablero
  - [219] Las fechas del widget del "Rework Historico" tienen por defecto el último periodo de reportes.

### Changed
    - [221] Los reportes dentro del Chart de "Rework Historico" contiene más información.
    
### Deprecated

### Removed

### Security


## 0.1.2 - 05-07-2025

### Resumen
Se agrega el numero de commits dentro de la grafica de "Rework Historico" en el tablero

### Fixed

### Added
    - [221] Se agrega el numero de commits dentro de la grafica de "Rework Historico" en el tablero

### Changed

### Deprecated

### Removed

### Security