import Firebase from './firebaseConfig';

export const AddUser = async (name, university, email, image, uid) => {
    try {
        return await Firebase
            .database()
            .ref("users/" + uid)
            .set({
                name: name,
                email: email,
                image: image,
                uuid: uid,
                university: university
            });
    } catch (error) {
        return error;
    }
}



export const UpdateUserImage = async (image, uid) => {
    try {
        return await Firebase
            .database()
            .ref("users/" + uid)
            .update({
                image:image
            })
    } catch (error) {
        return error;
    }
}
