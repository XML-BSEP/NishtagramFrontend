

export class RequestVerification {
    name : String;
	surname : String;
	category : String;
	image : String;
	profile_id : String;
	state : String;
    id : String;

    constructor(name : String, surnam : String, categ : String, img : String, profileId : String, state : String) {
        this.name = name;
        this.surname = surnam;
        this.category = categ;
        this.image = img;
        this.profile_id = profileId;
        this.state = state;
    }
}