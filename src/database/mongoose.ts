import mongoose from 'mongoose';

export default function connectToDatabase() {
	mongoose.connect(process.env.MONGODB_URI || '');
}

const db = mongoose.connection;
db.once('open', () => console.log('Conectado ao Banco de Dados MONGODB'));
db.on('error', () =>
	console.error('Falha ao conectar ao Banco de Dados do MONGODB'),
);
