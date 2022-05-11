import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all publications <br/>
            <span>for {product.amount} month</span>
          </p>
        <SubscribeButton priceId={product.priceId} />
          
        </section>

        <img src="/assets/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KqgXOFrDCwSECiXRZ83yVRX')

  const amountFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price.unit_amount/100);

  const product = {
    priceId: price.id,
    amount: amountFormatted
  };
  
  return {
    props: {
      product
    }
  };
}