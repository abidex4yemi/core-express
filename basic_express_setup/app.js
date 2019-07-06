const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'This is the home right' });
});

app.get('/users', (req, res) => {
	return res.status(200).json({
		message: 'List of all users',
		data: [
			{
				name: 'Yemi',
				email: 'test@gmail.com'
			}
		]
	});
});

app.listen(PORT, console.log('Server running on port:' + PORT));
