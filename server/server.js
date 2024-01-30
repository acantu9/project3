const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
// const axios = require('axios');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', expressMiddleware(server, {
    //context: authMiddleware
  }));

  app.get('/get-animals', async (req, res) => {
    console.log("get pets");

    // const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjhiZDJiMGZlNjQyNTAwYjBmOGU4YTY1MWJkMjQ5MmZiMWEwOTE1OWI3Mjc4NTFkMGU5YzZkODgxMjFlNDAzOTMzYjRkNGU0YWVjYmFkM2FjIiwiaWF0IjoxNzA2MjQ0NTgyLCJuYmYiOjE3MDYyNDQ1ODIsImV4cCI6MTcwNjI0ODE4Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.FmPjg961O298Leili5zFHf7zwnkidyb66JD_IOab3jMzb0vyfhe3gDmjAxjhzbPNbEutFPT6fQSQAwORUXaBn-Ui4o6QD6VLAkqjohszVy4BxQshdL1IT2qztKLnsRD3uFSH4ILtARlR2pzmQEFtXqZfOlcIAkiU2-1Kyo8ZxEzzXV1Yl1I-oZBy_ADE552rtoEkqNnaJzGnC4O5Fj5lZCtOCpUOLMrSdpwnxsUwX1CSlvMA46Td1mFzBgYcTrYSKy95e-jBedwcMgdACN3hTnLc0sH7w_KIlWEQWg4qSdUDjp6hGtATnOBi0hrCE9m_O68KXqftt9kv9k3s6FE6Nw";
    const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjAxNmI5MGQyOTE0MWI4YWQ1M2U5YjIzNThmZmQ1ODlhOTM3MThlYTZhNTBlYTYxNWNmNjVlODBiZDFkNmNjZWQyZWRlNGM2NzRhMzJhZGU1IiwiaWF0IjoxNzA2NTg3MTE2LCJuYmYiOjE3MDY1ODcxMTYsImV4cCI6MTcwNjU5MDcxNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.dIYl_yrNw2RXcGZ2sEOqkksKRgDshTrzRSOxar33k3_KvaRSgoxlMmnUtkfy_AzzSICOwv-bxkGzi6E2H8shEK8deYvDPgGu6QQYsW_sNHZZb2bZmsypnWi3AY0IrACYfMsmH23hT4odjP1BizazC5aURyC6fxONMlIxcLOVf9UGkIs4FYLmqyOyoxo9jBmQDI8rAGAoXD9_sd3Xfua8imRQm1JpvczV6FBYgqCOSED8Kf4wuay1rJHUwngX4LroJW_R2ZJBGNN_JBuSiWOqLySQOOfSWJUrDcTXAE1E_F5dQHp3bFQ-SN9m6FbRQR4yJFiOyYTeBVX3FAg8X2_l2g";
    console.log(req.query);
    const apiUrl = `https://api.petfinder.com/v2/animals?type=${req.query.type}`;
    const response = await fetch(apiUrl, { 
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${APITOKEN}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    res.json(data);
    // console.log(data);
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();