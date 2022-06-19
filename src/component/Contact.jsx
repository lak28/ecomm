

export default function Contact() {
    let initialValue;
const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
          fullName: initialValue,
          email: initialValue,
          message: initialValue
          }
    alert("Thanks for submitting!")
    
}

  return (
    <div className="home">
  <p>info@sparkleshop.com</p>
<p className='lead'>123-456-7890</p><hr></hr>
  <p>49756 Highview Way Oakhurst</p>
<p className='lead'>California(CA), 93644</p><hr></hr>
  <br></br><br></br>

  <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} method="POST">
                            <div class="mb-3">
                                <label for="exampleForm" class="form-label">Full Name</label>
                                <input type="text" name="fullName" className="fullName" class="form-control" id="exampleForm" placeholder="Inkra Andini"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleForm" class="form-label">Email address</label>
                                <input type="email" name="email" className="email" class="form-control" id="exampleFormControlInput1" placeholder="inkraandini@gmail.com"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" name="message" rows="3" placeholder="Type your message here..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-dark btn-lg">Send Message</button>
                        </form>
                    </div>
                </div>
                <br></br><br></br><br></br><br></br>
 

</div>
  )
}