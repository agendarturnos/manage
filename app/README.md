# Vite + React + Firebase Firestore

Este proyecto es una versión inicial para gestionar clientes y sus pagos usando React con Vite y Firebase Firestore.

## Configuración

1. Crea un proyecto en [Firebase](https://firebase.google.com/) y habilita Firestore.
2. Copia las credenciales de tu proyecto y crea un archivo `.env` en la carpeta `app` con el siguiente contenido:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

3. Instala las dependencias y ejecuta el proyecto:

```bash
npm install
npm run dev
```

Esto abrirá la aplicación en `http://localhost:5173`.

## Funcionalidades

- Listado de clientes almacenados en la colección `clientes` de Firestore.
- Búsqueda rápida por ID, nombre, proyecto y email.
- Visualización de pagos asociados a cada cliente y formulario para agregar nuevos pagos en la colección `pagos`.

Es un ejemplo básico para demostrar cómo conectar React con Firestore usando Vite. Puedes expandirlo para agregar edición y eliminación de registros.
