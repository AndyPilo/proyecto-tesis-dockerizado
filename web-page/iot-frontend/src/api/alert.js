import axios from "/axios.js"

const alertRequest = () => axios.get(`/alerts/${id}`)
const alertsRequest = () => axios.get("/alerts")
const createAlertRequest = (alert) => axios.post("/alerts", alert)
const updateAlertRequest = (alert) => axios.put(`/alerts/${alert._id}`, alert)
const deleteAlertRequest = (id) => axios.delete(`/alerts/${id}`)


