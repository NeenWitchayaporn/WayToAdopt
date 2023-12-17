/* this express app handles the submission of form data for the pet post
 * it updates the firestore database with information about the new pet post
 * it expects a POST request with the following data
 *
 * userID : the ID of the user that create this post
 * formValue : the input data from the form
 */
const express = require("express");
const admin = require("./firebase");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const db = admin.firestore();
const bucket = admin.storage().bucket();
const app = express();

const storage = multer.memoryStorage(); // set up in-memory storage for file upload
const upload = multer({ storage: storage }); // initialize multer for file upload

// submit form data to create new post
app.post("/createPost", upload.single("file"), async (req, res) => {
  try {
    const file = req.file; // get uploaded file from the request
    // destructure user ID and other form values from the request body
    const { userID, ...formValues } = req.body;

    // find the latest PostID from the Post collection
    const latestPostID = await db
      .collection("Post")
      .orderBy("PostID", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data().PostID;
        } else {
          return 0; // Return 0 if no data in the collection
        }
      })
      .catch((error) => {
        console.error("Error getting latest PostID: ", error);
        return 0;
      });

    // assign a new PostID
    const newPostID = latestPostID + 1;

    // define metadata for the uploaded file
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
      contentType: file.mimetype,
      cacheControl: "public, max-age=31536000",
    };

    let imageUrl = "";

    // create a reference to the file in cloud storage
    const blob = bucket.file(`PetPic/${formValues.fileName}`);
    const blobStream = blob.createWriteStream({
      metadata: metadata,
      gzip: true,
    });

    blobStream.on("finish", () => {
      // generate the URL for the uploaded image
      imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/PetPic%2F${formValues.fileName}?alt=media`;

      // convert the pet's date of birth to a firestore Timestamp
      const [year, month, day] = formValues.petDOB.split("-").map(Number);
      const dobTimestamp = formValues.petDOB
        ? admin.firestore.Timestamp.fromDate(new Date(year, month - 1, day))
        : null;

      // add the new post to the "Post" collection
      db.collection("Post").add({
        PostID: newPostID,
        PreviousOwnerID: parseInt(userID),
        PetID: parseInt(formValues.petType),
        PostTitle: formValues.postTitle,
        PetGender: formValues.petGender === "N" ? null : formValues.petGender,
        PetDOB: dobTimestamp,
        PetPic: imageUrl,
        PetBreed: formValues.petBreed,
        PetVaccinated: formValues.petVaccinated,
        PetSterilized: formValues.petSterilized,
        PetWean: formValues.petWean,
        PetHousebreaking: formValues.petHouseBreaking,
        PostStatus: 0,
        PetDetail: formValues.petDetail,
      });

      // find the latest PostQID in the PostQuestion collection
      const latestPostQID = db
        .collection("PostQuestion")
        .orderBy("PostQID", "desc")
        .limit(1)
        .get();

      latestPostQID
        .then((querySnapshot) => {
          let newPostQID = 0;
          if (!querySnapshot.empty) {
            newPostQID = querySnapshot.docs[0].data().PostQID + 1;
          } else {
            newPostQID = 1;
          }

          // add questions related to the post to the "PostQuestion" collection
          JSON.parse(formValues.questionList).forEach((question, index) => {
            db.collection("PostQuestion").add({
              PostQID: newPostQID + index,
              PostID: newPostID,
              QuestionTitle: question.question,
            });
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    // error handling for the file upload process
    blobStream.on("error", (err) => {
      console.error("Error uploading file:", err);
      res.status(500).json({ success: false, error: "Error uploading file" });
    });

    // write the file buffer to the cloud storage reference
    blobStream.end(file.buffer);

    res.status(200).json({ success: true }); // respond with success status
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, error: "Error creating post" });
  }
});

module.exports = app;
