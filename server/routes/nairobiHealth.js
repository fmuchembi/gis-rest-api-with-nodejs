const router = require('express').Router();
const pool = require("../db");


//get all nairobi health facilities
router.get("/api/nairobihealthfacilities", async(req, res)=>{
    try{
        const allNairobiHealthFacilities = await pool.query("SELECT id, (geom)::json as point, name FROM nairobi_health_facilities");
        res.json(allNairobiHealthFacilities.rows);

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

////get Nairobi Sub-counties
router.get("/api/nairobisubcounties" , async(req, res) =>{
    try{
        const nairobiSubcounties = await pool.query("SELECT id, ST_AsGeojson(geom)::json as multipolygon, name FROM nairobi_subcounties");
        res.json(nairobiSubcounties.rows);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error' + err.message);
    }
});

//get Health Facilities within a SubCounty
router.get("/api/nairobihealthfacilities/withinsubcounty/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const nairobiHealthFacilitiesWithinSubCounty = await pool.query("SELECT nhf.name, ST_AsGeojson(nhf.geom)::json as point FROM nairobi_health_facilities nhf, nairobi_subcounties nsc WHERE ST_Within(nhf.geom, nsc.geom) AND nsc.name =$1", [name]);
        res.json(nairobiHealthFacilitiesWithinSubCounty.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server errors" + error.message);
    }
});


//get Nearest Health Facilities
router.get("/api/nairobihealthfacilities/nearerstfacility/:lat/:lon", async(req, res)=>{
    try{
        const {lat} = req.params;
        const {lon} = req.params;
        const nearestHealthCenter = await pool.query("SELECT nhf.id, nhf.name, ST_AsGeojson(nhf.geom)::json, ST_Distance(nhf.geom,ST_SetSRID(ST_Point($1,$2),4326)) AS distance FROM nairobi_Health_facilities nhf ORDER BY distance LIMIT 3", [lat,lon]);
        res.json(nearestHealthCenter.rows);

    }catch(error){
        console.error(error.message);
        res.status(500).send("server error" + error.message);
    }
});





module.exports= router;