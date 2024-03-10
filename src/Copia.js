import express from 'express'
// import cors from 'cors'
import { getAllPosts, getPosts, createPost } from './db.js'


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')

})

app.listen(port, () => {
  console.log("Server listening at http://127.0.0.1:${port}")
})

app.use(express.json())

app.get('/posts', async (req, res) => {

  const posts = await getAllPosts()
  res.json(posts)
})


app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  const posts = await getPosts(id)
  res.json(posts)
})


app.post('/posts', async (req, res) => {
  const [title, content] = [req.body.title, req.body.content]
  console.log(title, content);
  const blogs = await createPost(title, content)
  res.json(blogs)
})

app.delete('/posts/:id', async(req, res)=>{
  console.log('delete blog');
  const id = req.params.id
  console.log(id);
  const result = await deletepost(id)
  res.json(result)
})