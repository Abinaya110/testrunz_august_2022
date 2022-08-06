// import express  from "express";
const express = require("express")

// import client from "prom-client"
const client = require("prom-client")

const app=express()
const responcehistogram = new client.Histogram({
    name:'rest_responce_time_durationseconds',
    help:'rest api responce time',
    labelNames:['method','route','status_code']
})
const dbresponcehistogram = new client.Histogram({
    name:'bd_rest_responce_time_durationseconds',
    help:'database rest api responce time',
    labelNames:['operation','success']
})
const runcounter = new client.Counter({
    name:'node_request_count',
    help:'ttotal no of request to run',
})


function metrics(){
// collect all default metrics data default means memory and cpu of server 

const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics();

//get metric data for respective fetch
    app.get("/metrics",async(req,res)=>{
        res.set("Content-Type",client.register.contentType)
        return res.send(await client.register.metrics())
    })
    
app.listen(9001,()=>{
    console.log("lisiterning to port 9001")
  })
}

module.exports ={
    responcehistogram,
    dbresponcehistogram,
    runcounter,
    metrics
}