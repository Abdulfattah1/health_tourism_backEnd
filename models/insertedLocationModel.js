const db = require("../utilites/db");


module.exports = class insertLocation {
    constructor(location) {
        this.city = location.city;
        this.country = location.country;
        this.state = location.state;
        this.id = location.locationId;
        this.latitude = location.latitude;
        this.longitude = location.longitude;
    }

    save() {
        return db.execute(`
        INSERT INTO locations (country_id,city_id,state_id,longitude,latitude)
        VALUES(?,?,?,?,?)`
            , [
                this.country,
                this.city,
                this.state,
                this.longitude,
                this.latitude
            ]);
    }


    static delete(id) {
        return db.execute(`DELETE FROM locations WHERE clinics_id = ? and type = 1`, [id]);
    }

    
    update() {
        return db.execute(
            `UPDATE locations
            SET
            country_id = ?,
            city_id = ?,
            state_id = ?,
            type = ?
            WHERE clinics_id = ?`
            , [
                this.country,
                this.city,
                this.state,
                this.type,
                this.id
                
            ]);
    }


    count(){
        return db.execute(`select * from locations 
                            where country_id = ? and
                                   city_id   = ? and 
                                   state_id  = ? `,
        [
            this.country,
            this.city,
            this.state
        ]
        );    
    }
}

