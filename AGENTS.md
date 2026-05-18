# Proyecto: TODOEXPRESS - Versión TERMINATOR V2

Esta es la configuración maestra e "indestructible" del proyecto, denominada **TERMINATOR_TODOEXPRESS V2**. 

## Estado Actual Perfecto (Mayo 2026):
1. **Admin Panel**: Gestión total de productos, pedidos, usuarios, banners (Desktop/Mobile), mini banners y categorías.
2. **Categorías Dinámicas**: El sistema ya no usa listas estáticas. Todo se lee de la tabla `categories`.
3. **Mapeo de Datos**: 
   - Banners: `mobileImage` (frontend) -> `mobile_image` (Supabase).
   - Mini Banners: Corregido error de actualización (se eliminó el ID del payload de update).
4. **Nuevas Categorías Integradas**: Bisutería, Papelería, Regalo, Lentes, Bebidas, Aseo Personal.

## Instrucciones para Futuros Agentes:
- SIEMPRE respetar el mapeo de `mobile_image` en la tabla de banners.
- NO volver a usar categorías estáticas en `Header.tsx`, `Shop.tsx` o `Home.tsx`.
- En caso de errores críticos, consultar esta base para restablecer la comunicación con Supabase.
