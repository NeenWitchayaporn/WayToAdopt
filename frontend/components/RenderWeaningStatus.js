/* RenderWeaningStatus function renders the weaning status based on provided input
 * weaningStatus : weaning status ('Y', 'N', 'NS')
 * return
 * - text rendered from weaning status
 */
const RenderWeaningStatus = (weaningStatus) => {
  switch (weaningStatus) {
    case "Y":
      return "หย่านมแล้ว"; // return for 'Y' status (Yes)
    case "N":
      return "ยังไม่หย่านม"; // return for 'N' status (No)
    case "NS":
      return "-"; // return for 'NS' status (Not Sure)
    default:
      return "ไม่ระบุ"; // return for other unspecified status
  }
};

export default RenderWeaningStatus;
