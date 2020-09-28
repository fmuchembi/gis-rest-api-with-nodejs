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
router.get("/api/nairobihealthfacilities/nearerstfacility?userlocation=x,y", async(req, res)=>{
    try{
        const allNairobiHealthFacilities = await pool.query("SELECT nhf.id, nhf.name, ST_AsGeojson(nhf.geom)::json, ST_Distance(nhf.geom,ST_SetSRID(ST_Point(:userLongitude,:userLatitude),4326)) AS distance "
                                                             + "FROM nairobi_Health_facilities nhf "
                                                             + "ORDER BY nhf.geom  <-> ST_SetSRID(ST_Point(:userLongitude,:userLatitude),4326) "
                                                             + "LIMIT 5",{userLongitude:req.userlocation[0],userLatitude:req.userlocation[1]});
        res.json(allNairobiHealthFacilities.rows);

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

////get Health Facilities withib a SubCounty
router.get("/api/nairobihealthfacilities/withinsubcounty?subcountyId=subcountyId", async(req, res)=>{
    try{
        const nairobiHealthFacilitiesWithinSubCounty = await pool.query("SELECT nhf.id, nhf.name, nhf.geom "
                                                                        +"FROM nairobi_Health_facilities nhf, nairobi_sub_counties nsc" 
                                                                        +"WHERE ST_Within(nhf.geom, nsc.geom) AND nsc.id=(:id)", {id: req.subcountyId});
        res.json(nairobiHealthFacilitiesWithinSubCounty.rows);

    }catch(err){ 
        console.error(err.message);
        res.status(500).send("server error");
    }
});



module.exports= router;