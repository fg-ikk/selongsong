class Selongsong {

    constructor(rawdata) {
        this.rawdata = rawdata;
        this.collection = db.collection("selongsong");
    }

    async add(arraySelongsong) {
        let detailSelongsong = {};
        let messages = ""
        let actStock
        
        try {
            //Check IML, dont save if exist
            let listSelongsong = await this.getWhere(JSON.parse(
            `[{
            "key": "NoIML",
            "criteria": "==", 
            "value": ${arraySelongsong.NoIML}
                }]`)
            );
            let stock = new stockSelongsong()
            actStock = await stock.getSelongsongStock()
            
            if(listSelongsong.length <=0){
                const docRef = await this.collection.add(arraySelongsong);
                stock.minus(arraySelongsong.Qty,arraySelongsong.Qty*actStock.convertion)
                messages = 'Selongsong Added with ID: ' + docRef.id;
                //console.log(messages);
                detailSelongsong.id = docRef.id;
                detailSelongsong.success = true;
                detailSelongsong.messages = messages;
            } else {
                /*
                messages = 'Nomer IML ini sudah pernah diinput'
                detailSelongsong.id = listSelongsong[0].id;
                detailSelongsong.success = false;
                detailSelongsong.messages = messages;
                */
                console.log(listSelongsong)
                delete arraySelongsong.Posted;
                delete arraySelongsong.postedHeaderId;
                const docRef = await this.update(listSelongsong[0].id,arraySelongsong);
                stock.plus(listSelongsong[0].Qty,listSelongsong[0].Qty*actStock.convertion) //tambahkan data lama
                stock.minus(arraySelongsong.Qty,arraySelongsong.Qty*actStock.convertion) //kurangi dengan yang baru
                messages = 'Selongsong Updated with ID: ' + docRef.id;
                //console.log(messages);
                detailSelongsong.id = docRef.id;
                detailSelongsong.success = true;
                detailSelongsong.messages = messages;
                
            }
            
                

        } catch (error) {
            messages = 'Error Adding Selongsong: ' + error
            console.error(error)
            detailSelongsong.success = false
            detailSelongsong.messages = error
            throw Error(messages);
        }
        

        return detailSelongsong;
    }

    async get(id) {
        let detailSelongsong = {};
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
            if(listSelongsong.length > 0) 
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
            console.log('Selongsong updated with ID: ', docRef.id);
            detailSelongsong.id = docRef.id;

        } catch (error) {
            console.error('Error Update Selongsong: ', error)
        }

        return detailSelongsong;
    }

    async delete(id) {
        try {
            await this.collection.doc(id).delete();
            console.log('Selongsong is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting selongsong: ', error);
        }
    }

}

class stockSelongsong{
    constructor() {
        //db.collection("users").doc("frank");
        this.document = db.collection("livestock").doc("selongsong");
    }

    async getSelongsongStock() {
        let stockSelongsong;
        try {
            let doc = await this.document.get();
            if(doc.exists) 
                stockSelongsong = {...doc.data()}
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting user: ', error);
        }
        console.log(stockSelongsong)
        return stockSelongsong;
    }

    async plus(qtyPcs, qtyKg) {

        let detailStock
        let penambahanPcs
        let penambahanKg
        try {

            detailStock = await this.getSelongsongStock()
            let totalPcs = detailStock.pcs
            let totalKg = detailStock.kg
            let convertion = detailStock.convertion
            penambahanKg = totalKg + qtyKg
            penambahanPcs = totalPcs + qtyPcs 
            this.document.update({
                                    kg: penambahanKg,
                                    pcs: penambahanPcs,
                                })
            console.log(detailStock)
            detailStock = await this.getSelongsongStock()
            console.log(detailStock)

        } catch (error) {
            console.error('Error plus stock: ', error)
        }

        return detailStock;
    }

    async minus(qtyPcs, qtyKg) {

        let detailStock
        let penguranganPcs
        let penguranganKg
        try {

            detailStock = await this.getSelongsongStock()
            let totalPcs = detailStock.pcs
            let totalKg = detailStock.kg
            let convertion = detailStock.convertion
            penguranganKg = totalKg - qtyKg
            penguranganPcs = totalPcs - qtyPcs 
            this.document.update({
                                    kg: penguranganKg,
                                    pcs: penguranganPcs,
                                })
            console.log(detailStock)
            detailStock = await this.getSelongsongStock()
            console.log(detailStock)

        } catch (error) {
            console.error('Error minus stock: ', error)
        }

        return detailStock;
    }

}

class IncomingSelongsong{ 
     constructor(rawdata) {
        this.rawdata = rawdata;
        this.IncomingCollection = db.collection("incoming_selongsong");
    }
    async add(arrayIncoming) {
        let detailIncoming = {};
        let messages = ""
        let actStock
        let incomingID = arrayIncoming.id
        delete arrayIncoming.id
        try {
            
            let listIncoming = await this.get(incomingID);
            console.log(listIncoming)
            
            let stock = new stockSelongsong()
            actStock = await stock.getSelongsongStock()
            
            if(Object.keys(listIncoming).length === 0){
                const docRef = await this.IncomingCollection.add(arrayIncoming);
                //stock.plus(arrayIncoming.qty,arrayIncoming.qtyKg)
                console.log(arrayIncoming.Qty)
                console.log(arrayIncoming.QtyKg)
                messages = 'Incoming Added with ID: ' + docRef.id;
                detailIncoming.id = docRef.id;
                detailIncoming.success = true;
                detailIncoming.messages = messages;
            } else {
                console.log(listIncoming)
                const docRef = await this.update(incomingID,arrayIncoming);
                //stock.plus(arrayIncoming.Qty,arrayIncoming.QtyKg) //tambah data baru 
                //stock.minus(listIncoming.Qty,listIncoming.QtyKg) //kurangi data lama
                console.log("Data Baru")
                console.log(arrayIncoming.Qty)
                console.log(arrayIncoming.QtyKg)

                console.log("Data Lama")
                console.log(listIncoming.Qty)
                console.log(listIncoming.QtyKg)

                messages = 'Incoming Updated with ID: ' + docRef.id;
                //console.log(messages);
                detailIncoming.id = docRef.id;
                detailIncoming.success = true;
                detailIncoming.messages = messages;
                
            }
                
            
                

        } catch (error) {
            messages = 'Error Adding Incoming: ' + error
            console.error(error)
            throw Error(messages);
        }
        

        return detailIncoming;
    }

    async get(id) {
        let detailIncoming = {};
        try {
            let doc = await this.IncomingCollection.doc(id).get();
            
            if(doc.exists) 
                detailIncoming = {id: doc.id, ...doc.data()}
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting incoming: ', error);
        }
        console.log(detailIncoming)
        return detailIncoming;
    }

    async update(id, arrayIncoming) {

        let detailIncoming = {};
        try {
            const docRef = await this.IncomingCollection.doc(id);
            docRef.update(arrayIncoming)
            console.log('Incoming updated with ID: ', docRef.id);
            detailIncoming.id = docRef.id;

        } catch (error) {
            //console.error('Error Update Incoming: ', error)
            throw Error(error);
        }

        return detailIncoming;
    }

}

