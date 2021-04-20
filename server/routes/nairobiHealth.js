const router = require('express').Router();
const pool = require("../db");


//get all nairobi health facilities
router.get("/api/nairobihealthfacilities", async(req, res)=>{
    try{
        const allNairobiHealthFacilities = await pool.query("SELECT id, ST_AsGeojson(geom)::json as point, name FROM public.nairobi_health_facilities");
        res.json(allNairobiHealthFacilities.rows);

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

////get Nairobi Sub-counties
router.get("/api/nairobisubcounties" , async(req, res) =>{
    try{
        const nairobiSubcounties = await pool.query("SELECT id, ST_AsGeojson(geom)::json as polygon, name FROM public.nairobi_sub_counties");
        res.json(nairobiSubcounties.rows);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error' + err.message);
    }
});


////get Nearest Health Facilities

////get Health Facilities within a SubCounty




module.exports= router;