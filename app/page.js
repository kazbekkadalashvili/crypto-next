import Image from "next/image";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';

const DynamicCryptoPrice = dynamic(() => import('./components/CryptoPrice'), {
  ssr: false, // Prevent server-side rendering 
});

export default function Home() {
  return (
    <main>
      <DynamicCryptoPrice />
    </main>
  );
}
