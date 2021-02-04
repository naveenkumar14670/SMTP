const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
	const { from, password, to, subject, text } = req.body;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: from,
			pass: password,
		},
	});

	let mailOptions = {
		from,
		to,
		subject,
		text,
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) res.status(535).send();
		else res.send();
	});
});

module.exports = router;
