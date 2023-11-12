import Head from "next/head";
import styles from "./about.module.css";
function AboutPage() {
  return (
    <>
      <Head>
        <title> Abount this website</title>
      </Head>
      <main>
        <div className={styles.testContainer}>test</div>
      </main>
    </>
  );
}

export default AboutPage;
