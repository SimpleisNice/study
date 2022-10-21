import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout, { siteTitle } from '../components/Layout';
// import { getSortedPostsData } from '../libs/posts';
import utilStyles from '../styles/utils.module.css';

// fs로 사용하는 것은 SSR에서만 동작해야 한다.
// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts');
  const json = await response.json();
  return {
    props: {
      allPostsData: json.allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([]);
  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then((res) => res.json())
  //     .then((data) => setAllPostsData(data.allPostsData))
  // }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
