import React from 'react';

import Styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={Styles.container}>
      <h1>Bienvenue au casino rigolo !</h1>
      {false ? (
        <p>Vous êtes connecté.</p>
      ) : (
        <p>Veuillez vous connecter pour continuer.</p>
      )}
    </div>
  );
}
