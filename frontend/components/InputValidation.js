// hasAlphabet function checks whether string contains any alphabet characters or not
const hasAlphabet = (textInput) => {
  const textRegex = /[^\d\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+/; // regular expression to match some letters
  return textRegex.test(textInput);
};

/* InputValidation function validates the form values and returns any errors found
 * formValues : values or data from the form to be validated
 * return
 * - errors : Object that contains error of each field, if any
 */
const InputValidation = (formValues) => {
  const errors = {};

  // validation for image upload
  if (!formValues.image) {
    // if there is no selected image file
    errors.image = "กรุณาอัปโหลดภาพถ่ายของสัตว์";
  }

  // validation for post title
  if (!formValues.postTitle.trim()) {
    // if there is no input for post title
    errors.postTitle = "กรุณากรอกหัวข้อของประกาศ";
  } else {
    if (!hasAlphabet(formValues.postTitle.trim())) {
      // if there are no alphabetic characters in post title
      errors.postTitle = "กรุณากรอกหัวข้อประกาศด้วยตัวอักษร";
    } else if (formValues.postTitle.trim().length < 5) {
      // if the length of post title is less than 5 characters
      errors.postTitle = "กรุณากรอกหัวข้อประกาศมากกว่า 5 ตัวอักษร";
    }
  }

  // validation for each question in the question list
  formValues.questionList.forEach((singleQuestion, index) => {
    if (!singleQuestion.question.trim()) {
      // if there is no input for each question
      if (!errors.questions) {
        errors.questions = [];
      }
      errors.questions[index] = "กรุณากรอกคำถาม";
    } else {
      if (!hasAlphabet(singleQuestion.question.trim())) {
        // if there are no alphabetic characters in question
        if (!errors.questions) {
          errors.questions = [];
        }
        errors.questions[index] = "กรุณากรอกคำถามด้วยตัวอักษร";
      } else if (singleQuestion.question.trim().length < 5) {
        // if the length of question is less than 5 characters
        if (!errors.questions) {
          errors.questions = [];
        }
        errors.questions[index] = "กรุณากรอกคำถามมากกว่า 5 ตัวอักษร";
      }
    }
  });

  // validation for pet breed
  if (formValues.petBreed) {
    if (!hasAlphabet(formValues.petBreed.trim())) {
      // if there are no alphabetic characters in pet breed
      errors.petBreed = "กรุณากรอกสายพันธุ์สัตว์ด้วยตัวอักษร";
    }
  }

  // validation for pet's date of birth
  if (formValues.petDOB) {
    const currentDate = new Date(); // get the current date
    const inputDOB = new Date(formValues.petDOB); // change format of input date of birth
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 50); // get the minimum date (50 years ago)
    if (inputDOB > currentDate) {
      // if the input date of birth is in the future
      errors.petDOB =
        "กรุณาตรวจสอบวันเกิดอีกครั้ง (วันเกิดที่กรอกเป็นวันในอนาคต)";
    } else if (inputDOB < minDate) {
      // if the input date of birth is more than 50 years ago from the current date
      errors.petDOB = "กรุณากรอกวันเกิดที่ไม่เกิน 50 ปีที่แล้ว";
    }
  }
  return errors; // return if any validation errors founded
};
export default InputValidation;
