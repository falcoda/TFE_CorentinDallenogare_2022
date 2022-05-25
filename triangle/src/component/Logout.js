
import axios from "axios";

function Logout(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"/api/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        
        <div className="settings">                
            <form>
                
                <button type="button" onClick={logMeOut} className=" btnApp">Déconnexion</button>
            </form>
        </div>
    )
}

export default Logout;