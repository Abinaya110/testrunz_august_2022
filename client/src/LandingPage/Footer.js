import { Button, TextareaAutosize } from '@mui/material'
import React,{useState} from 'react'
import "./Footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ApiUrl from '../ServerApi';

const Footer = () => {
	const [name,setName]=useState()
	const [email,setEmail]=useState()
	const [message,setMessage]=useState()


	const sendmessage=()=>{
		if (name,email,message) {
			// send mail
			
			fetch(`${ApiUrl}/feedback/query`, {
				method: "POST",
			// signal:abortcont.signal,
			  body: JSON.stringify({
			  name: name,
			  email:email,
			  message:message
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => 
		  {
		console.log(json)
		alert("message sent")
		setName("")
		setEmail("")
		setMessage("")
		  }
		  );	
				
			}
			else{

				alert("Enter all field")	
			}
	}

  return (
   

<footer class="footer-distributed">

			<div class="footer-left">

				<h5>Test<span>RunZ</span></h5>

				{/* <p class="footer-links">
					<a href="#" class="link-1">Home</a>
					
					<a href="#">Blog</a>
				
					<a href="#">Pricing</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p> */}

				<p class="footer-company-name">Learnytech © 2022</p>
			</div>

			<div class="footer-center">

				{/* <div>
					<i class="fa fa-map-marker"></i>
					<p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+1.555.555.5555</p>
				</div> */}

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:testrunz.learny@gmail.com">testrunz.learny@gmail.com</a></p>
				</div>

				<div className='form'>
					<input placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
					<input placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/>
					<TextareaAutosize placeholder='Type your message' style={{height:'50px'}} value={message} onChange={(e)=>{setMessage(e.target.value)}} /><br/><br/>
					
					<Button  variant='contained' size='small' style={{background:"#F1C232",color:"black"}} onClick={sendmessage}>send</Button>

				</div>


			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					To prepare the scientists of tomorrow. Learny technologies, is developing a web application called Testrunz to help students carry out their laboratory experiments with predefined test procedure and experiment libraries. 
					Testrunz streamlines the experimentation and learning process. It frees up the students to focus on the experiments and insights. Gives the students the opportunity to gain practical and industry experience. In addition it enables seamless collaboration between students and teachers. 

				</p>
				

				<div class="footer-icons">
					<a href="https://www.facebook.com/yosnalab/"><i >  <FacebookIcon/></i></a>
					<a href="https://instagram.com/yosnalab/"><i >  <InstagramIcon/></i></a>
					<a href="https://www.linkedin.com/in/yosna-lab-9721061a0?trk=people-guest_people_search-card"><i >  <LinkedInIcon/></i></a>

				</div>

			</div>

		</footer>
    
  )
}

export default Footer