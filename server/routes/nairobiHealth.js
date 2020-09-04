const router = require('express').Router();
const pool = require("../db");


//get all nairobi health facilities
router.get("/nairobihealthfacilities", async(req, res)=>{
    try{
        const allNairobiHealthFacilities = await pool.query("SELECT id, st_astext(geom) as geometry, name FROM public.nairobi_health_facilities");
        res.json(allNairobiHealthFacilities.rows);

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});




module.exports= router;