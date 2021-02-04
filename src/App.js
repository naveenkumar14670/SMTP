import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mail_logo from './Images/Mail-Logo.svg';
import mail_sent_logo from './Images/Mail-Sent-logo.svg';
import access_denied_logo from './Images/Access-Denied-Logo.svg';

function App() {
	const [state, setState] = useState({
		from: '',
		password: '',
		to: '',
		subject: '',
		text: '',
	});

	const [show, setShow] = useState(false);
	const [status, setStatus] = useState(false);

	const handleClose = () => setShow(false);

	const emptyForm = {
		from: '',
		password: '',
		to: '',
		subject: '',
		text: '',
	};

	function handleChange(e, type) {
		let newState = { ...state };
		newState[type] = e.target.value;
		setState(newState);
	}

	async function handleSubmit() {
		const responseCode = await axios
			.post('/', state)
			.then((res) => res.status)
			.catch((err) => err.response.status);
		if (responseCode === 200) {
			setState(emptyForm);
			setShow(true);
			setStatus(true);
		} else {
			setShow(true);
			setStatus(false);
		}
	}

	return (
		<div className='App'>
			<div className='logo-part'>
				<img className='logo' src={mail_logo} alt='Mail-Logo' />
			</div>
			<div className='form-part'>
				<Form>
					<h5>Sender:</h5>

					<Form.Group controlId='from'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='From:'
							value={state.from}
							onChange={(e) => handleChange(e, 'from')}
						/>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							value={state.password}
							onChange={(e) => handleChange(e, 'password')}
						/>
					</Form.Group>

					<h5>Receiver:</h5>

					<Form.Group controlId='to'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='To:'
							value={state.to}
							onChange={(e) => handleChange(e, 'to')}
						/>
					</Form.Group>

					<Form.Group controlId='subject'>
						<Form.Label>Subject</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter subject'
							value={state.subject}
							onChange={(e) => handleChange(e, 'subject')}
						/>
					</Form.Group>

					<Form.Group controlId='text'>
						<Form.Label>Message</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Enter message....'
							value={state.text}
							onChange={(e) => handleChange(e, 'text')}
						/>
					</Form.Group>
				</Form>
				<Button
					className='button'
					variant='outline-light'
					onClick={handleSubmit}
				>
					Send
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header
						style={{
							color: 'white',
							backgroundColor: '#0f3057',
						}}
					>
						<Modal.Title className='text-center w-100'>
							{status
								? 'Email Sent Successfully!!!'
								: 'Incorrect Username or Password!!!'}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className='modalImage'>
							<img
								src={status ? mail_sent_logo : access_denied_logo}
								alt='Mail_Sent_Logo'
							/>
						</div>
					</Modal.Body>
					<Modal.Footer className='justify-content-center'>
						<Button
							variant={status ? 'success' : 'danger'}
							onClick={handleClose}
						>
							OK
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}

export default App;
