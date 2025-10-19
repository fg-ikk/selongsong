class Selongsong {

    constructor(rawdata) {
        this.rawdata = rawdata;
        this.collection = db.collection("selongsong");
    }

    async add(arraySelongsong) {
        let detailSelongsong = {};
        let messages = ""
        try {
            const docRef = await this.collection.add(arraySelongsong);
            messages = 'Selongsong Added with ID: ' + docRef.id;
            console.log(messages);
            detailSelongsong.id = docRef.id;
            detailSelongsong.success = true;
            detailSelongsong.messages = messages;
        } catch (error) {
            messages = 'Error Adding Selongsong: ' + error
            console.error(error)
            detailSelongsong.success = false
            detailSelongsong.messages = error
        }
        return detailSelongsong;
    }

    async get(id) {
        let detailSelongsong;
        try {
            let doc = await this.collection.doc(id).get();
            
            if(doc.exists) 
                detailSelongsong = {id: doc.id, ...doc.data()}
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting user: ', error);
        }
        console.log(detailSelongsong)
        return detailSelongsong;
    }

    async getWhere(arrayWhere) {
        //key,criteria,value
        console.log(arrayWhere)

        const listSelongsong = [];
        let q = this.collection;
        //q = q.where("NoIML", "==", "44014361");

        //check if there are any filters and add them to the query
        if (arrayWhere.length > 0) {
            arrayWhere.forEach((filter) => {
            q = q.where(filter.key, filter.criteria, filter.value);
            console.log(filter.key)
        });
        }

        try {
            let snapshot = await q.get();
            snapshot.forEach(doc => listSelongsong.push({id: doc.id, ...doc.data()}))
            if(listSelongsong.length === 0) 
                console.log(listSelongsong)
            else
                console.log('No document found with id: ', arrayWhere);
                console.log(listSelongsong)
        } 
        catch (error) {
            console.error('Error in getting user: ', error);
        }
        return listSelongsong;
    }

    async getAll() {
        const listSelongsong = [];

        try {
            const snapshot = await this.collection.get()
            snapshot.forEach(doc => listSelongsong.push({id: doc.id, ...doc.data()}))
            console.log(listSelongsong)
        } catch (err) {
            console.error('Error Getting Users: ', error);
            console.log(listSelongsong)
        }

        return listSelongsong;
    }

    async update(id, arraySelongsong) {

        let detailSelongsong = {};
        try {
            const docRef = await this.collection.doc(id);
            docRef.update(arraySelongsong)
            console.log('Selongsong pdated with ID: ', docRef.id);
            detailSelongsong.id = docRef.id;

        } catch (error) {
            console.error('Error Adding User: ', error)
        }

        return detailSelongsong;
    }

    async delete(id) {
        try {
            await this.collection.doc(id).delete();
            console.log('Selongsong is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting user: ', error);
        }
    }

}

