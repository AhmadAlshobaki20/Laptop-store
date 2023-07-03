import './HeroSection.css';
import Image from '../../photo-1571786256017-aee7a0c009b6.avif';
function HeroSection(){
  return(
    <>
      <main>
        <div className="Welcome-editorial">
          <h1>Description</h1>
          <h3>Hello Guy I build my own website by using react Inshallah</h3>
          <p>Hello Guy I build my own website by using react Inshallah</p>
          <p>Hello Guy I build my own website by using react Inshallah</p>
        </div>
        <div className="Hero-image">
        <img src={Image} style={{width:"300px", height:"300px", borderRadius:"8px"}} alt=""/>
        </div>
      </main>
    </>
  )
}

export default HeroSection;