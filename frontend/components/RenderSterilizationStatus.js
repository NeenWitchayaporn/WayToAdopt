/* RenderSterilizationStatus function renders the sterilization status based on provided input
 * sterilizationStatus : sterilization status ('Y', 'N', 'NS')
 * return
 * - text rendered from sterilization status
 */
const RenderSterilizationStatus = (sterilizationStatus) => {
  switch (sterilizationStatus) {
    case "Y":
      return "ได้รับการทำหมันเรียบร้อยแล้ว"; // return for 'Y' status (Yes)
    case "N":
      return "ยังไม่ได้รับการทำหมัน"; // return for 'N' status (No)
    case "NS":
      return "-"; // return for 'NS' status (Not Sure)
    default:
      return "ไม่ระบุ"; // return for other unspecified status
  }
};

export default RenderSterilizationStatus;
