import express from 'express';
import { getAllBlogs, createBlog, deleteBlog, GetPostID, putpost } from './db.js';

const app = express();
const port = 3000;
app.use(express.json());



app.use((req, res, next) => {
  const { method, url, body } = req;
  const originalSend = res.send;
  res.send = function (data) {
    const timestamp = new Date().toISOString();
    const logEntry = `Timestamp: ${timestamp}, Method: ${method}, URL: ${url}, Request Body: ${JSON.stringify(body)}, Response: ${data}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
      if (err) console.error('Error writing to log.txt:', err);
    });
    originalSend.apply(res, arguments);
  };
  next();
});

function validateBlogRequest(req, res, next) {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Bad Request: Title and content are required.');
  }
  next();
}

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await GetPostID(id);
    if (blog.length === 0) {
      return res.status(404).send('Blog not found');
    }
    res.json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/blogs', validateBlogRequest, async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await createBlog(title, content);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/blogs/:id', validateBlogRequest, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const result = await putpost(id, title, content);
    if (result.affectedRows === 0) {
      return res.status(404).send('Blog not found');
    }
    res.send('Blog updated successfully');
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteBlog(id);
    if (result.affectedRows === 0) {
      return res.status(404).send('Blog not found');
    }
    res.send('Blog deleted successfully');
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.use((req, res, next) => {
  const { method, url } = req;
  if (!['/blogs', '/blogs/:id'].includes(url) || !['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    return res.status(400).send('Bad Request: Endpoint does not exist or method not allowed.');
  }
  next();
});

app.use((req, res) => {
  res.status(501).send('Not Implemented');
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
