import { Client } from 'faunadb'

// The consultes in the database only can be maded throught the api routes or the methods GetStaticProps, or GetServerSideProps

export const fauna = new Client({
    secret: process.env.FAUNADB_KEY
})