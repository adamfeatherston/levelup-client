export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const updateEventDetails = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
        //.then(response => response.json()) is not used when returning None and a status code on the server side.
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
        })
}