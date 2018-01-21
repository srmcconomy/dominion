const fs = require('fs');

fs.readdirSync('.').forEach(file => {
	const newName = file.replace(/(^[a-z]|-[a-z])/g, s => s.replace('-', '').toUpperCase());
	if (newName !== file) {
		fs.renameSync(file, newName);
	}
});

