let username = "user22"
let passkey = "ykeZdCYNLs2dqbMc"
let token = btoa(username + ":" + passkey)
let entry = `Authorization: Basic ${token}`

//GET endpoint upon starting//
getCategory = async() => {
    let response = await fetch ("https://strive-school-testing-apis.herokuapp.com/api/movies/", {
        method:"GET",
        headers:{
            "Authorization":"Basic "+ token
        }
    })
    return await response.json ()
}

//GET films from secondary endpoint
getFilms= async(category) => {
    let response = await fetch ("https://strive-school-testing-apis.herokuapp.com/api/movies/", {
        method:"GET",
        headers:{
            "Authorization":"Basic "+ token
        }
    })
    let jsonResponse = await response.json ()

    jsonResponse.forEach(async category => {
        let films = await fetch ("https://strive-school-testing-apis.herokuapp.com/api/movies/"+ category, {
        method:"GET",
        headers:{
            "Authorization":"Basic "+ token
        }
    })
    let jsonFilms = await films.json()
    console.log (jsonFilms)
    return jsonFilms
    });
}

//POST TO ENTER DATA INTO THE API

addFilms = async event =>{
    return await fetch ("https://strive-school-testing-apis.herokuapp.com/api/movies/", {
        method:"POST",
        body:JSON.stringify(event),
        headers:{
            "Authorization":"Basic "+ token,
            "Content-type" : "application/json"
        }
    })
    // let jsonResponse = await response.json ()
    // console.log ( jsonResponse)
    // return jsonResponse 
}

//the submit button//
handleSubmit = async () =>{
    event.preventDefault();
    let c = document.getElementById("category").value;
    // let selectedCategory = c.value
    // console.log(c)
    const myFilms = {
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        category: c,
        imageUrl: document.querySelector("#imageUrl").value
    }
    console.log("myFilms", JSON.stringify(myFilms))
    const response = await addFilms (myFilms)

    if (response.ok){
        alert("Film has been successfully added to the library")
    } else {
        alert("Failed to add to library")
    }
}
