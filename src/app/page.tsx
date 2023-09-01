import Link from 'next/link'

//HOME PAGE
  export default function Page(){
    return(
        <div>
        <div>
            <h1>Slot Tracker</h1>
        </div>    
        <div>
            <form>
            <div>
                <label >User name</label>
                <input type="text" required/>
            </div>
            <div>
                <label >Password</label>
                <input type="password" required/>
            </div>
            </form> 
        </div>
            <Link href ="/games">Log In</Link>
            <div>
                <p style={{display: 'inline-block'}}>Don't have a account? Sign up today!</p>
                <Link href ="/signup">Sign up</Link>
            </div>
        </div>
    )
}