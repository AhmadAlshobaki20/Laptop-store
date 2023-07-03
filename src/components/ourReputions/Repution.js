import './Reputions.css';

function Reputation(){
  return(
    <>
    <h1 id="title-Reputation">Our Reputation</h1>
    <section className="Reputaetion">
      <div className='reputation-card'>
      <i className="fas fa-wrench fa-lg"></i>
      <span>support</span>  
      <span>all the time</span>  
      </div>
      <div className='reputation-card'>
      <i className="fa-regular fa-handshake fa-lg"></i>
        <span>trust</span>  
        <span>worthy</span>
      </div>
      <div className='reputation-card'>
      <i className="fa-brands fa-usps fa-lg"></i>
        <span>Best</span>  
        <span>Service</span>  
      </div>
    </section>
    </>
  )
}

export default Reputation ;