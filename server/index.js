import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

const app = express()
app.use(cors({
    origin: ['http://localhost:3000', 'https://dall-e-custom.netlify.app'],
    useSuccessStatus: 200
}))
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
    res.send('Hello From DALL-E')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8000, () => {
            console.log('Connected');
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()