import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';




const InfoBox = ({text, link, btnText}) => (
    <div className='info-box'>  
     <p className='font-medium sm:text-xl text-center'>{text}</p>
     <Link to={link} className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow} className='w-4 h-4 object-contain'  />
     </Link>
    </div>
)


const renderContent = {
    1:(
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue  py-4 px-4 text-white mx-5'>Hi, I am <span className='font-semibold'>Norhan</span> 👋 
        <br /> A Software Programmer 👨‍💻
        </h1>
    ),

    2:(
        <InfoBox 
        text='Worked for many years and Picked up many skills along the way '
        link='/about'
        btnText='Learn More'
        />
    ),

    3:(
 <InfoBox 
        text='Did multiple projects over the years. lets cheack what projects I have done' 
        link='/projects'
        btnText='Visit my portfolio'
        />
        ),

    4:(
 <InfoBox 
        text="Need a project done or looking for a dev? I'm just a few keystrokes way"
        link='/Contact'
        btnText='Contact me'
        />
        ),
}



const HomeInfo = ({ currentStage}) => {
    

  
    return renderContent[currentStage] || null;
    
  
}

export default HomeInfo