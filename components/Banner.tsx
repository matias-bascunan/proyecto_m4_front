
'use client'
import Navbar from './Navbar'


export default function MyBanner() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
   
      <iframe
  className="absolute inset-0 w-full h-full object-cover"
  src="https://www.youtube.com/embed/P7fL_nRPJ3E?autoplay=1&mute=1&loop=1&playlist=P7fL_nRPJ3E&controls=0&showinfo=0&modestbranding=1"
  title="Gibson Video"
  frameBorder="0"
  allow="autoplay; fullscreen"
/>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <Navbar />
      
    </section>
  

)
}


    
  



