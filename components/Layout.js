import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Layout.module.css';

/**
 * Componente para mostrar un fondo con gradiente basado en el `variant`.
 * El fondo cambia según el valor de la propiedad `variant` que se pasa al componente.
 *
 * @component
 * @param {Object} props
 * @param {'large' | 'small'} props.variant - Determina el tipo de fondo de gradiente a mostrar ('large' o 'small').
 * @param {string} [props.className] - Clases CSS adicionales que se pueden aplicar al componente.
 * @returns {JSX.Element} Componente que representa un div con el fondo de gradiente aplicado.
 */
export function GradientBackground({ variant, className }) {
  /**
   * Utiliza `classNames` para combinar las clases dinámicas con las clases adicionales
   * pasadas a través de `className`.
   * 
   * Si `variant` es 'large', se aplicará `colorBackground` de `styles`.
   * Si `variant` es 'small', se aplicará `colorBackgroundBottom` de `styles`.
   */
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

/**
 * Componente principal del layout de la aplicación. 
 * Este componente maneja el tema de la interfaz de usuario (modo oscuro y modo claro),
 * y contiene los elementos principales de la página.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Los elementos hijos que se renderizarán dentro del layout.
 * @returns {JSX.Element} El layout con los hijos renderizados y la lógica de tema aplicada.
 */
export default function Layout({ children }) {
  /**
   * Función para establecer el tema inicial basado en la configuración del almacenamiento local (`localStorage`).
   * Si se encuentra un valor 'dark' en `localStorage`, el tema se establecerá como oscuro.
   * Si se encuentra un valor 'light', se establecerá como claro.
   */
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const lightMode = localStorage.getItem('theme') === 'light';

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else if (lightMode) {
      document.documentElement.classList.remove('dark');
    }
    return;
  };

  /**
   * Función que maneja los cambios del sistema de tema, para que el sitio responda a las preferencias
   * del usuario en cuanto a modo oscuro o claro. Detecta los cambios de preferencia en el sistema y actualiza
   * el `localStorage` y el tema de la página en consecuencia.
   */
  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  };

  /**
   * `useEffect` para establecer el tema cuando el componente se monta por primera vez.
   */
  useEffect(() => {
    setAppTheme();
  }, []);

  /**
   * `useEffect` para manejar los cambios del sistema de tema cuando el componente se monta.
   */
  useEffect(() => {
    handleSystemThemeChange();
  }, []);

  return (
    <div className="relative pb-24 overflow-hidden">
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}