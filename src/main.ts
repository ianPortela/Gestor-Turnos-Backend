import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    // El origen EXACTO de tu aplicación frontend (Vite/React)
    origin: 'http://localhost:5173', 
    
    // Métodos permitidos para las peticiones HTTP
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    
    // Necesario si usas cookies o tokens de autenticación
    credentials: true,
    
    // Cabeceras (headers) permitidas
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  
  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true,
      transform: true, // Útil para convertir DTOs a sus tipos definidos
    })
  );
  
  // Escucha en el puerto 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);

  // Mensaje de verificación (opcional)
  console.log(`🚀 Servidor NestJS ejecutándose en: ${await app.getUrl()}`);
}
bootstrap();