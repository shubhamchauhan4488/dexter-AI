import { useEffect, useRef, useState } from 'react';
import './Home.css'
import '@dotlottie/react-player/dist/index.css';
import { DotLottiePlayer } from '@dotlottie/react-player';
import Chatbot from '../Chatbot/Chatbot';

function Home() {
	const dotLottiePlayerRef = useRef(null);
	const [isOpen, setIsOpen] = useState(true);

	const toggleChatbot = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		// if Chatbot is open, play lottie for 8sec, before stoping
		if (isOpen) {
			setTimeout(() => {
				stopAnimation()
			}, 20000)
		} else {
			resumeAnimation()
		}
	}, [isOpen])

	const stopAnimation = () => {
		if (dotLottiePlayerRef.current) {
			dotLottiePlayerRef.current.pause();
		}
	};

	const resumeAnimation = () => {
		if (dotLottiePlayerRef.current) {
			dotLottiePlayerRef.current.play();
		}
	};

	return (
		<div className='app-container'>
			<h1>I am <span className='name-span'>DexterAI</span>. An AI assisstant.</h1>
			<h1>How Can I help you today ?</h1>
			<div className='lottie-container'>
				<DotLottiePlayer
					ref={dotLottiePlayerRef}
					src="https://lottie.host/f22f9e0d-edce-4dc7-89b0-01e3bb6d29f1/99S0ludZTf.json"
					autoplay
					loop
				/>
			</div>
			<Chatbot isOpen={isOpen} />
			<button
				className={`bot-button ${isOpen ? 'opened' : ''}`}
				onClick={toggleChatbot}
			>
				{isOpen ? 'X' : '+'}
			</button>
		</div>
	)
}

export default Home
