async function main() {
    const userObj = new User();
    console.log(await userObj.get("8OkGGpQzJUsX9NmOH13V"));
    //console.log(await userObj.getWhere("3"));
}


class User {
    usersRef = db.collection("users");

    async add(name, password, email) {
        const user = { name, password, email};

        try {
            const docRef = await this.usersRef.add(user);
            console.log('User Added with ID: ', docRef.id);
            user.id = docRef.id;

        } catch (error) {
            console.error('Error Adding User: ', error)
        }

        return user;
    }

    async update(name, password, email) {
        const user = { name, password, email};
        

        try {
            const docRef = await this.usersRef.doc("name");
            docRef.update({
            name: name
            })
            console.log('User Added with ID: ', docRef.id);
            user.id = docRef.id;

        } catch (error) {
            console.error('Error Adding User: ', error)
        }

        return user;
    }

    async getAll() {
        const users = [];

        try {
            const snapshot = await this.usersRef.get()
            snapshot.forEach(doc => users.push({id: doc.id, ...doc.data()}))
        } catch (err) {
            console.error('Error Getting Users: ', error);
        }

        return users;
    }

    async get(id) {
        let user;

        try {
            let doc = await this.usersRef.doc(id).get();
            
            if(doc.exists) 
                user = {id: doc.id, ...doc.data()};
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting user: ', error);
        }

        return user;
    }

    async getWhere(email) {
        let user;

        try {
            let doc = await this.usersRef.where("email", "==", email).get();
            
            if(doc.exists) 
                user = {id: doc.id, ...doc.data()};
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting user: ', error);
        }

        return user;


        /*
        this.usersRef.where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        */
    }

    async delete(id) {
        try {
            await this.usersRef.doc(id).delete();
            console.log('User is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting user: ', error);
        }
    }
}

main();