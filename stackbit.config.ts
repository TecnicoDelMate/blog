// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

/**
 * Configuración de Stackbit para el proyecto.
 * Este archivo define la integración con Stackbit y la configuración de las fuentes de contenido, incluyendo los modelos y los activos.
 *
 * @module stackbit.config.ts
 * @version ~0.6.0
 * @requires @stackbit/types
 * @requires @stackbit/cms-git
 */

/**
 * Configuración de Stackbit.
 * @function
 * @returns {Object} Configuración de Stackbit
 */
export default defineStackbitConfig({
    /**
     * Versión de Stackbit que se usará en el proyecto.
     * @type {string}
     * @default '~0.6.0'
     */
    stackbitVersion: '~0.6.0',

    /**
     * Generador de Sitios Estáticos (SSG) utilizado en el proyecto.
     * @type {string}
     * @default 'nextjs'
     */
    ssgName: 'nextjs',

    /**
     * Versión de Node.js que se utilizará en el proyecto.
     * @type {string}
     * @default '18'
     */
    nodeVersion: '18',

    /**
     * Fuentes de contenido del proyecto.
     * @type {Array}
     * @default [GitContentSource]
     */
    contentSources: [
        new GitContentSource({
            /**
             * Ruta raíz del proyecto.
             * @type {string}
             * @default __dirname
             */
            rootPath: __dirname,

            /**
             * Directorios que contienen el contenido del proyecto.
             * @type {Array}
             * @default ['posts']
             */
            contentDirs: ['posts'],

            /**
             * Modelos de datos para las publicaciones.
             * @type {Array}
             * @default [{ name: 'Post', type: 'page', ... }]
             */
            models: [
                {
                    name: "Post",
                    type: "page",
                    urlPath: "/posts/{slug}",
                    filePath: "posts/{slug}.mdx",
                    fields: [
                        { 
                            name: "title", 
                            type: "string", 
                            required: true, 
                            default: 'Post Title' 
                        },
                        { 
                            name: "description", 
                            type: "string", 
                            default: 'Post description goes here' 
                        },
                        { 
                            name: "date", 
                            type: "date", 
                            required: true 
                        },
                        { 
                            name: "dateEvent", 
                            type: "date" 
                        },
                    ]
                }
            ],

            /**
             * Configuración de los activos estáticos.
             * @type {Object}
             * @property {string} referenceType - Tipo de referencia para los activos estáticos.
             * @property {string} staticDir - Carpeta donde se encuentran los archivos estáticos.
             * @property {string} uploadDir - Carpeta para subir imágenes.
             * @property {string} publicPath - Ruta pública base para los archivos estáticos.
             */
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ]
});