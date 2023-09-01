export default function Page() {
  return(
    <div>
       <h1>Sign Up!</h1>
        <form>
          <div>
            <label >User name</label>
            <input type="text" required/>
          </div>
          <div>
            <label >Password</label>
            <input type="password" required/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" />
          </div>
        </form> 
   </div>
    )
  }