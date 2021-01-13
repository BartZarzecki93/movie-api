const { connection } = require('mongoose');

//Close the db and server.

exports.closeDatabase = async () => {
	await connection.close();
};

//Remove all the data for all db collections.

exports.clearDatabase = async () => {
	const collections = Object.keys(
		connection.collections
	);

	for (const key of collections) {
		const collection =
			connection.collections[key];
		await collection.deleteMany();
	}
};
