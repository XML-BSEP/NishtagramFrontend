export class NewRequestVerification {
    name : String;
	surname : String;
	category : String;
	image : String;
    profile_id : String;

    constructor(name : String, surnam : String, categ : String, img : String, profileId : String) {
        this.name = name;
        this.surname = surnam;
        this.category = categ;
        this.image = img;
        this.profile_id = profileId;
    }
}