const router = require('express').Router();
const pool = require("../db");


//get all nairobi health facilities
router.get("/nairobihealthfacilities", async(req, res)=>{
    try{
        const allNairobiHealthFacilities = await pool.query("SELECT id, ST_AsGeojson(geom)::json as point, name FROM public.nairobi_health_facilities");
        res.json(allNairobiHealthFacilities.rows);

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

////get Nairobi Sub-counties
router.get("/nairobisubcounties" , async(req, res) =>{
    try{
        const nairobiSubcounties = await pool.query("SELECT id, ST_AsGeojson(geom)::json as point, name FROM public.nairobi_sub_counties");
        res.json(nairobiSubcounties.rows);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error' + err.message);
    }
});




module.exports= router;