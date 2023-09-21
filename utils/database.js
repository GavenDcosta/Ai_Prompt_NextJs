import mongoose from 'mongoose'

let isConnected = false

export const connectToDb = async () => {
    mongoose.set('strictQuery')

    if(isConnected){
        console.log('mongodb is already connected')
        return
    }

    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'share_prompt',
        useNewUrlParser: true,
        useUnifiedTopology: true ,
      })
      console.log('MongoDB_Connected')

      isConnected = true
    } catch (error) {
      console.log(error)
    }
}