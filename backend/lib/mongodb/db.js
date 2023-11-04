const { MongoClient } = require('mongodb');

let client = null;
let db = null;

async function connectToMongoDB() {
    return new Promise((resolve, reject) => {
        try {
            // Se la connessione esiste già, restituisci il client e il database
            if (client && client.topology.isConnected()) return resolve({ db, client });

            const url = process.env.MONGO_URI || '';
            if (!url) throw new Error('MongoDB URI mancante');
            const dbName = process.env.MONGO_DATABASE || '';

            // Altrimenti, crea una nuova connessione
            MongoClient.connect(url).then((mongoClient) => {
                console.log('Connessione a MongoDB stabilita correttamente');
                client = mongoClient;
                db = mongoClient.db(dbName);
                resolve({ db, client });
            });
        } catch (error) {
            console.error('Errore durante la connessione a MongoDB', error);
            throw error;
        }
    });
}

// Funzione per chiudere la connessione al database
function closeMongoDBConnection() {
    if (client && client.isConnected()) {
        client.close();
        console.log('Connessione a MongoDB chiusa correttamente');
    }
}

module.exports = {
    connectToMongoDB,
    closeMongoDBConnection,
    db,
};