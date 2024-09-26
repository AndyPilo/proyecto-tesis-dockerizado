import Alert from "../models/alert.model.js"

export const getAlerts = async (req,res) =>{
    const alerts = await Alert.find();
    res.json(alerts)
}

export const getAlert = async(req,res) =>{
    
}

export const deleteAlert = async(req,res) =>{
    
}
